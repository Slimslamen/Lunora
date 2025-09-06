// ...existing code...
import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { generateClient } from "aws-amplify/api";

import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { UserContext } from "@/Context/User/UserContext";
import { Schema } from "../../../amplify/data/resource";
import { IChallenge } from "@/General-Interfaces/IChallenge";
import { IUserChallenges } from "@/General-Interfaces/IUser";

const client = generateClient<Schema>();

const iconMap = {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  Feather,
};

type IconSet = keyof typeof iconMap;

export default function ChallengesGalleryScreen() {
  const { darkMode } = useContext(ThemeContext);
  const { activeUser } = useContext(UserContext);
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [challenges, setChallenges] = useState<IChallenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<IUserChallenges[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<IChallenge | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const ChallengeIcon = ({
    iconSet,
    icon,
    size = 28,
    color = "#fff",
    ...props
  }: {
    iconSet: keyof typeof iconMap;
    icon?: string;
    size?: number;
    color?: string;
    [key: string]: any;
  }) => {
    const IconComponent = iconMap[iconSet];
    if (!IconComponent || !icon) return null;
    return <IconComponent name={icon} size={size} color={color} {...props} />;
  };

  // Fetch all challenges
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const { data, errors } = await client.models.Challenges.list({});
        if (errors) {
          console.error("Error fetching challenges:", errors);
          return;
        }
        if (Array.isArray(data)) {
          setChallenges(data as IChallenge[]);
        }
      } catch (err) {
        console.error("Failed to fetch challenges:", err);
      }
    };

    fetchChallenges();
  }, []);

  // Fetch user's completed challenges
  useEffect(() => {
    const fetchUserChallenges = async () => {
      if (!activeUser?.id) {
        setUserChallenges([]);
        return;
      }

      try {
        const { data, errors } = await client.models.UserChallenges.list({
          filter: {
            user_id: { eq: activeUser.id },
          },
        });
        if (errors) {
          console.error("Error fetching UserChallenges:", errors);
          return;
        }
        if (Array.isArray(data)) {
          const sanitized: IUserChallenges[] = data.map((d: any) => ({
            user_id: d.user_id,
            challenge_id: d.challenge_id,
            completed: !!d.completed,
            completedAt: d.completedAt ?? "",
            createdAt: d.createdAt,
            updatedAt: d.updatedAt,
            // keep optional progress if present
            ...(d.progress !== undefined ? { progress: d.progress } : {}),
          }));
          setUserChallenges(sanitized);
        }
      } catch (err) {
        console.error("Failed to fetch user challenges:", err);
      }
    };

    fetchUserChallenges();
  }, [activeUser?.id]);

  // Get completed challenge IDs
  const completedChallengeIds = useMemo(() => {
    return new Set(userChallenges.filter((uc) => uc.completed).map((uc) => uc.challenge_id));
  }, [userChallenges]);

  // Sort challenges to show completed ones first
  const sortedChallenges = useMemo(() => {
    return [...challenges].sort((a, b) => {
      const aCompleted = completedChallengeIds.has(a.id);
      const bCompleted = completedChallengeIds.has(b.id);

      // Completed challenges come first
      if (aCompleted && !bCompleted) return -1;
      if (!aCompleted && bCompleted) return 1;

      // If both have same completion status, maintain original order
      return 0;
    });
  }, [challenges, completedChallengeIds]);

  const handleChallengePress = (challenge: IChallenge) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedChallenge(null);
  };

  // Compute progress percent for the selected challenge (0-100)
  const selectedProgress = useMemo(() => {
    if (!selectedChallenge) return 0;
    const uc = userChallenges.find((u) => u.challenge_id === selectedChallenge.id);
    if (!uc) return 0;
    // If progress property exists, support 0-1 or 0-100 ranges
    const p: any = (uc as any).progress;
    if (typeof p === "number") {
      if (p <= 1) return Math.round(p * 100);
      return Math.min(100, Math.round(p));
    }
    // fallback to completed boolean
    return uc.completed ? 100 : 0;
  }, [selectedChallenge, userChallenges]);

  const renderChallenge = ({ item }: { item: IChallenge }) => {
    const isCompleted = completedChallengeIds.has(item.id);
    const dim = !isCompleted;

    return (
      <TouchableOpacity style={styles.cell} onPress={() => handleChallengePress(item)}>
        <View style={[styles.medalWrap, dim && { opacity: 0.28 }]}>
          {/* Outer ring */}
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.9, y: 1 }}
            style={[styles.medalOuter, { borderColor: colors.cardBg }]}
          >
            {/* Inner disc */}
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientEnd]}
              start={{ x: 0.2, y: 0 }}
              end={{ x: 0.9, y: 1 }}
              style={styles.medalInner}
            >
              <View style={styles.iconBox}>
                <ChallengeIcon iconSet={item.iconSet as IconSet} icon={item.icon} />
              </View>
            </LinearGradient>
          </LinearGradient>
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Status */}
        <View style={styles.captionRow}>
          {isCompleted ? (
            <View style={styles.completedChip}>
              <Ionicons name="checkmark" size={12} color="#fff" />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          ) : (
            <Text style={[styles.caption, { color: colors.textSecondary }]}>+{item.exp} XP</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>All Challenges</Text>
    </View>
  );

  return (
    <View style={styles.safe}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        {/* Use FlatList with ListHeaderComponent instead of ScrollView */}
        <FlatList
          data={sortedChallenges}
          keyExtractor={(item) => item.id}
          renderItem={renderChallenge}
          numColumns={3}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />

        {/* Challenge Detail Modal */}
        <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={closeModal}>
          <View style={styles.modalOverlay}>
            <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <View style={styles.modalTitleRow}>
                  <View style={styles.modalIconWrapper}>
                    <ChallengeIcon
                      iconSet={selectedChallenge?.iconSet as IconSet}
                      icon={selectedChallenge?.icon}
                      size={32}
                      color={colors.textSecondary}
                    />
                  </View>
                  <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{selectedChallenge?.name}</Text>
                </View>
                <Pressable onPress={closeModal} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color={colors.textSecondary} />
                </Pressable>
              </View>

              <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>

                {/* Progress section (added) */}
                <View style={[styles.modalSection, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.modalSectionTitle, { color: colors.textPrimary }]}>Progress</Text>
                  <View style={styles.progressRow}>
                    <View style={[styles.progressBarContainer, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                      <View
                        style={[
                          styles.progressBarFill,
                          { width: `${selectedProgress}%`, backgroundColor: colors.textPrimary },
                        ]}
                      />
                    </View>
                    <Text style={[styles.progressPercent, { color: colors.textSecondary }]}>{selectedProgress}%</Text>
                  </View>
                </View>

                <View style={[styles.modalSection, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.modalSectionTitle, { color: colors.textPrimary }]}>Description</Text>
                  <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                    {selectedChallenge?.description}
                  </Text>
                </View>

                {selectedChallenge?.longDescription && (
                  <View style={[styles.modalSection, { borderColor: colors.cardBorder }]}>
                    <Text style={[styles.modalSectionTitle, { color: colors.textPrimary }]}>Details</Text>
                    <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                      {selectedChallenge.longDescription}
                    </Text>
                  </View>
                )}

                <View style={[styles.modalSection, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.modalSectionTitle, { color: colors.textPrimary }]}>Reward</Text>
                  <View style={styles.rewardRow}>
                    <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                      +{selectedChallenge?.exp} XP
                    </Text>
                    {selectedChallenge?.rewardIcon && (
                      <ChallengeIcon
                        iconSet={selectedChallenge?.rewardSet as IconSet}
                        icon={selectedChallenge?.rewardIcon}
                        size={20}
                        color={colors.accent}
                      />
                    )}
                  </View>
                </View>

                <View style={[styles.modalSection, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.modalSectionTitle, { color: colors.textPrimary }]}>Status</Text>
                  <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                    {completedChallengeIds.has(selectedChallenge?.id || "")
                      ? "Completed"
                      : selectedChallenge?.coming
                        ? "Coming Soon"
                        : selectedChallenge?.active
                          ? "Active"
                          : "Coming Soon"}
                  </Text>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { 
    padding: 10, 
    paddingTop: 60, 
    paddingBottom: 90 
  },
  header: {
    paddingTop: 28,
    paddingBottom: 20,
    alignItems: "center",
  },
  backBtn: { padding: 6, borderRadius: 20 },
  headerTitle: { fontSize: 18, fontWeight: "700" },

  cell: {
    flex: 1,
    maxWidth: '33.33%',
    alignItems: "center",
    marginBottom: 18,
    paddingHorizontal: 5,
  },

  medalWrap: { alignItems: "center", justifyContent: "center" },
  medalOuter: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 10,
  },
  medalInner: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  iconBox: { transform: [{ translateY: 1 }] },

  title: {
    fontSize: 13,
    marginTop: 8,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 6,
    minHeight: 32,
  },
  captionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
    gap: 6,
    minHeight: 20,
  },
  caption: { fontSize: 12, opacity: 0.85 },
  completedChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    gap: 2,
  },
  completedText: { color: "#fff", fontSize: 10, fontWeight: "600" },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    maxHeight: "80%",
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    paddingBottom: 12,
  },
  modalTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  modalIconWrapper: {
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalSection: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 15,
    lineHeight: 22,
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Progress bar styles (added)
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  progressBarContainer: {
    flex: 1,
    height: 12,
    borderRadius: 8,
    borderWidth: 1,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 8,
  },
  progressPercent: {
    minWidth: 36,
  }
});