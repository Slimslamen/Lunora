import React, { useContext, useEffect, useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource";
import { IChallenge } from "@/General-Interfaces/IChallenge";
import { UserContext } from "@/Context/User/UserContext";
import { IUserChallenges } from "@/General-Interfaces/IUser";

const client = generateClient<Schema>();

const iconMap = {
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  Feather,
};

type IconSet = keyof typeof iconMap;

export default function ChallengesScreen() {
  const router = useRouter();
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const UContext = useContext(UserContext);
  const { activeUser } = UContext;

  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const [fetchedChallenge, setfetchedChallenge] = useState<IChallenge[]>();
  const [specificChallenge, setspecificChallenge] = useState<IChallenge | undefined>(undefined);
  const [userChallenges, setUserChallenges] = useState<IUserChallenges[] | undefined>(undefined);

  const activeChallenges = fetchedChallenge?.filter((f) => f.active);

  const ChallengeIcon = ({
    iconSet,
    icon,
    size = 30,
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

  useEffect(() => {
    const fetchChallenges = async () => {
      const { data: challenges, errors } = await client.models.Challenges.list({});
      if (errors) {
        console.error(errors);
        return;
      }
      if (Array.isArray(challenges)) {
        setfetchedChallenge(challenges as IChallenge[]);
      }
    };
    fetchChallenges();
  }, []);

  useEffect(() => {
    const fetchUserChallenges = async () => {
      if (!activeUser?.id) {
        setUserChallenges(undefined);
        return;
      }
      try {
        const { data, errors } = await client.models.UserChallenges.list({
          filter: {
            user_id: { eq: activeUser?.id || "user_1" },
          },
        });
        if (errors) {
          console.error("Error fetching UserChallenges:", errors);
          setUserChallenges(undefined);
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
          }));
          setUserChallenges(sanitized);
        } else {
          setUserChallenges([]);
        }
      } catch (err) {
        console.error("Failed to fetch user challenges:", err);
        setUserChallenges(undefined);
      }
    };

    fetchUserChallenges();
  }, []);

  const completedIds = useMemo(() => {
    if (!userChallenges || !Array.isArray(userChallenges)) return new Set<string>();
    return new Set(
      userChallenges
        .filter((uc) => uc.completed === true && !!uc.challenge_id)
        .map((uc) => String(uc.challenge_id))
    );
  }, [userChallenges]);

  const userCompletedChallenges = useMemo(
    () =>
      (fetchedChallenge || []).filter(
        (ch) => !!ch?.id && completedIds.has(String(ch.id))
      ),
    [fetchedChallenge, completedIds]
  );

  // Get the most recent completed challenge to feature
  const featuredCompletedChallenge = userCompletedChallenges?.[0];

  const navigateToChallengesGallery = () => {
    router.push("/(tabs)/ChallengesGallery");
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Title */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>Challenges</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Push your limits and earn rewards</Text>

          {/* Your Progress */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.statItem, { color: colors.textPrimary }]}>Your Progress</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>{activeChallenges?.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>{userCompletedChallenges?.length}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>1,200</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total XP</Text>
              </View>
              <Ionicons name="trophy" size={20} color={colors.accent} />
            </View>
          </View>

          {/* Featured Challenge */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Featured Challenge</Text>
          {featuredCompletedChallenge ? (
            <View
              style={[
                styles.featuredCard,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <View style={styles.featuredMedalWrap}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={[styles.featuredMedalOuter, { borderColor: colors.cardBg }]}
                >
                  <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 0.9, y: 1 }}
                    style={styles.featuredMedalInner}
                  >
                    <View style={styles.featuredIconBox}>
                      <ChallengeIcon 
                        iconSet={featuredCompletedChallenge.iconSet as IconSet} 
                        icon={featuredCompletedChallenge.icon} 
                        size={40}
                      />
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </View>
              
              <View style={styles.featuredContent}>
                <Text style={[styles.featuredTitle, { color: colors.textPrimary }]}>
                  {featuredCompletedChallenge.name}
                </Text>
                <Text style={[styles.featuredSubtitle, { color: colors.textSecondary }]} numberOfLines={2}>
                  {featuredCompletedChallenge.description}
                </Text>
                <View style={styles.featuredCompletedChip}>
                  <Ionicons name="checkmark" size={16} color={colors.textPrimary} />
                  <Text style={styles.featuredCompletedText}>Completed</Text>
                </View>
              </View>
            </View>
          ) : (
            <View
              style={[
                styles.featuredCard,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                  opacity: 0.6,
                },
              ]}
            >
              <View style={[styles.featuredMedalWrap, { opacity: 0.5 }]}>
                <LinearGradient
                  colors={[colors.gradientStart, colors.gradientEnd]}
                  start={{ x: 0.2, y: 0 }}
                  end={{ x: 0.9, y: 1 }}
                  style={[styles.featuredMedalOuter, { borderColor: colors.cardBorder }]}
                >
                  <LinearGradient
                    colors={[colors.gradientStart, colors.gradientEnd]}
                    start={{ x: 0.2, y: 0 }}
                    end={{ x: 0.9, y: 1 }}
                    style={styles.featuredMedalInner}
                  >
                    <View style={styles.featuredIconBox}>
                      <Ionicons name="trophy" size={40} color={colors.textPrimary} />
                    </View>
                  </LinearGradient>
                </LinearGradient>
              </View>
              
              <View style={styles.featuredContent}>
                <Text style={[styles.featuredTitle, { color: colors.textPrimary }]}>
                  Complete Your First Challenge
                </Text>
                <Text style={[styles.featuredSubtitle, { color: colors.textSecondary }]}>
                  Start your journey by completing any challenge to see it featured here!
                </Text>
              </View>
            </View>
          )}

          {/* View All Challenges Button */}
          <TouchableOpacity onPress={navigateToChallengesGallery} style={[styles.viewAllButton, { color: "#FFFF"}]}>
            <Text style={[styles.viewAllText, { color: "#FFFF" }]}>
              View All Challenges
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { padding: 16, paddingTop: 60, paddingBottom: 200 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 24 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  statsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  statItem: { alignItems: "center", flex: 1, textAlign: "center", fontSize: 18, fontWeight: "600" },
  statNumber: { fontSize: 22, fontWeight: "700" },
  statLabel: { fontSize: 15 },
  sectionHeader: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
  
  // Featured Challenge Styles
  featuredCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    alignItems: "center",
    minHeight: 200,
  },
  featuredMedalWrap: { 
    alignItems: "center", 
    justifyContent: "center",
    marginBottom: 16,
  },
  featuredMedalOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
  },
  featuredMedalInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  featuredIconBox: { 
    transform: [{ translateY: 1 }] 
  },
  featuredContent: {
    alignItems: "center",
    width: "100%",
  },
  featuredTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  featuredSubtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 12,
    opacity: 0.8,
  },
  featuredCompletedChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    gap: 4,
  },
  featuredCompletedText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // View All Button
  viewAllButton: {
    borderColor: "#f5e6e6",
    borderWidth: 2,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  viewAllText: { 
    fontSize: 16, 
    fontWeight: "600",
  },

  // Existing modal and icon styles
  iconWrapper: { width: 30, alignItems: "center", marginRight: 12, marginLeft: 8 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 },
  modalContent: { borderRadius: 12, padding: 18 },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    textAlign: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "700" },
  modalMeta: { marginTop: 6 },
  modalContainer: { padding: 8 },
  modalText: { fontSize: 15, lineHeight: 22 },
});