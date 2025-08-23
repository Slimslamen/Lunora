import React, { useContext, useEffect, useState, useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource"; // Adjust the relative path as needed
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
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const UContext = useContext(UserContext);
  const { activeUser } = UContext;

  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const [fetchedChallenge, setfetchedChallenge] = useState<IChallenge[]>();
  const [showChallenges, setshowChallenges] = useState(false);
  const [showCompleted, setshowCompleted] = useState(false);
  const [specificChallenge, setspecificChallenge] = useState<IChallenge | undefined>(undefined);

  // user-specific challenges records (from UserChallenges model)
  const [userChallenges, setUserChallenges] = useState<IUserChallenges[] | undefined>(undefined);

  const activeChallenges = fetchedChallenge?.filter((f) => f.active);
  const comingChallenges = fetchedChallenge?.filter((f) => f.coming);

  const ChallengeIcon = ({
    iconSet,
    icon,
    ...props
  }: {
    iconSet: keyof typeof iconMap;
    icon?: string;
    [key: string]: any;
  }) => {
    const IconComponent = iconMap[iconSet];
    if (!IconComponent || !icon) return null;
    return (
      <IconComponent name={icon} size={icon === "star" || icon === "trophy" || icon === "crown" ? 18 : 30} {...props} />
    );
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

  // fetch UserChallenges for the active user
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
          console.log("Test: " + sanitized)
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

  const showActiveChallenges = () => {
    setshowChallenges(!showChallenges);
  };
  const showCompletedChallenges = () => {
    setshowCompleted(!showCompleted);
    console.log("Test: " + userChallenges)
  };

  const getChallengeLongDesc = (ch?: IChallenge) =>
    ch?.longDescription ?? ch?.longDescription ?? ch?.description ?? ch?.description ?? "No additional details available.";

  // derive set of challenge ids the user has completed
  // Memoized set of completed challenge ids for the active user
  const completedIds = useMemo(() => {
    if (!userChallenges || !Array.isArray(userChallenges)) return new Set<string>();
    return new Set(
      userChallenges
        .filter((uc) => uc.completed === true && !!uc.challenge_id)
        .map((uc) => String(uc.challenge_id))
    );
  }, [userChallenges]);

  // Challenges the active user has completed (by matching IDs)
  const userCompletedChallenges = useMemo(
    () =>
      (fetchedChallenge || []).filter(
        (ch) => !!ch?.id && completedIds.has(String(ch.id))
      ),
    [fetchedChallenge, completedIds]
  );


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

          {/* Active Challenges */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Active Challenges</Text>
          {activeChallenges != null &&
            activeChallenges.slice(0, showChallenges ? activeChallenges.length : 3).map((ch) => (
              <TouchableOpacity
                key={ch.id}
                onPress={() => setspecificChallenge(ch)}
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  },
                ]}
              >
                <View style={styles.row}>
                  <View style={styles.iconWrapper}>
                    <ChallengeIcon iconSet={ch.iconSet as IconSet} icon={ch.icon} color={colors.textSecondary} />
                  </View>
                  <View style={styles.challengeContent}>
                    <Text style={[styles.challengeTitle, { color: colors.textPrimary }]}>{ch.name}</Text>
                    <Text style={[styles.challengeSubtitle, { color: colors.textPrimary }]} numberOfLines={2}>
                      {ch.description}
                    </Text>
                  </View>
                </View>
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${(ch.progress / 20) * 100}%`,
                        backgroundColor: colors.textPrimary,
                      },
                    ]}
                  />
                </View>
                <View style={styles.rowFooter}>
                  <Text style={[styles.progressText, { color: colors.textPrimary }]}>
                    {(ch.progress / 20) * 100}% completed
                  </Text>
                  <Text style={[styles.reward, { color: colors.textPrimary, textAlign: "center" }]}>
                    + {ch.exp} exp
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity onPress={showActiveChallenges} style={[styles.quickButton]}>
            <Text style={[styles.quickText, { color: colors.textPrimary }]}>
              {showChallenges ? "View Fewer Challenges" : "View all Challenges"}
            </Text>
          </TouchableOpacity>

          {/* Completed */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Completed</Text>
            {userCompletedChallenges &&
            userCompletedChallenges.slice(0, 1).map((ch) => (
              <TouchableOpacity
              key={ch.id}
              onPress={() => setspecificChallenge(ch)}
              style={[
                styles.completedCard,
                {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
                },
              ]}
              >
              <View style={styles.iconWrapper}>
                <ChallengeIcon iconSet={ch.iconSet as IconSet} icon={ch.icon} color={colors.textSecondary} />
              </View>
              <View style={styles.column}>
                <View style={styles.challengeContent}>
                <Text style={[styles.challengeTitle, { color: colors.textPrimary, textAlign: "center" }]}>
                  {ch.name}
                </Text>
                <Text
                  style={[styles.challengeSubtitle, { color: colors.textPrimary, textAlign: "center" }]}
                  numberOfLines={2}
                >
                  {ch.description}
                </Text>
                </View>
                <Text
                style={[
                  styles.progressText,
                  {
                  color: colors.textPrimary,
                  textAlign: "center",
                  fontWeight: "bold",
                  marginTop: 10,
                  marginLeft: -20,
                  },
                ]}
                >
                {(ch.progress / 20) * 100}% completed
                </Text>
              </View>
              <View style={styles.rowFooter}>
                <View style={styles.reward}>
                <ChallengeIcon iconSet={ch.rewardSet as IconSet} icon={ch.rewardIcon} color={colors.accent} />
                </View>
              </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity onPress={showCompletedChallenges} style={[styles.quickButton]}>
            <Text style={[styles.quickText, { color: colors.textPrimary }]}>
              {showCompleted ? "View Fewer Completed Challenges" : "View All Completed Challenges"}
            </Text>
          </TouchableOpacity>

          {/* Coming Soon */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Coming Soon</Text>
          {comingChallenges?.map((ch) => (
            <TouchableOpacity
              key={ch.id}
              onPress={() => setspecificChallenge(ch)}
              style={[
                styles.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  <ChallengeIcon iconSet={ch.iconSet as IconSet} icon={ch.icon} color={colors.textSecondary} />
                </View>
                <View style={styles.challengeContent}>
                  <Text style={[styles.challengeTitle, { color: colors.textPrimary, opacity: 0.8 }]}>{ch.name}</Text>
                  <Text style={[styles.challengeSubtitle, { color: colors.textPrimary, opacity: 0.8 }]}>
                    {ch.description}
                  </Text>
                </View>
                <View style={styles.reward}>
                  <ChallengeIcon iconSet={ch.rewardSet as IconSet} icon={ch.rewardIcon} color={colors.accent} />
                </View>
              </View>
            </TouchableOpacity>
          ))}

          {/* Challenge Detail Modal */}
          <Modal
            visible={!!specificChallenge}
            transparent
            animationType="fade"
            onRequestClose={() => setspecificChallenge(undefined)}
          >
            <View style={styles.modalOverlay}>
              <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.iconWrapper}>
                      <ChallengeIcon
                        iconSet={specificChallenge?.iconSet as IconSet}
                        icon={specificChallenge?.icon}
                        color={colors.textSecondary}
                      />
                    </View>
                    <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{specificChallenge?.name}</Text>
                  </View>
                  <Pressable onPress={() => setspecificChallenge(undefined)}>
                    <Ionicons name="close" size={24} color={colors.textSecondary} />
                  </Pressable>
                </View>
                <View style={styles.modalMeta}>
                  <View style={[styles.modalContainer, { borderWidth: 1, borderColor: colors.textPrimary, borderRadius: 10 }]}>
                    <ScrollView style={{ maxHeight: 360 }}>
                      <Text style={[styles.modalText, { color: colors.textSecondary }]}>
                        {getChallengeLongDesc(specificChallenge)}
                      </Text>
                    </ScrollView>
                  </View>
                </View>
              </LinearGradient>
            </View>
          </Modal>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  quickButton: {
    borderColor: "#f5e6e6",
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  quickText: { fontSize: 16, fontWeight: "600" },
  container: { padding: 16, paddingTop: 60, paddingBottom: 90 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 24 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  completedCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  statsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  statItem: { alignItems: "center", flex: 1, textAlign: "center", fontSize: 18, fontWeight: "600" },
  statNumber: { fontSize: 22, fontWeight: "700" },
  statLabel: { fontSize: 15 },
  sectionHeader: { fontSize: 18, fontWeight: "600", marginVertical: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  column: { flexDirection: "column", alignItems: "center" },
  iconWrapper: { width: 30, alignItems: "center", marginRight: 12, marginLeft: 8 },
  challengeContent: { flex: 1 },
  challengeTitle: { fontSize: 18, fontWeight: "600" },
  challengeSubtitle: { fontSize: 15, marginTop: 2, opacity: 0.8, width: 240 },
  daysLeft: { fontSize: 14, marginLeft: 8 },
  progressBarBg: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressFill: { height: "100%" },
  rowFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressText: { fontSize: 15 },
  reward: { flexDirection: "row", alignItems: "center" },
  rewardText: { fontSize: 14, marginLeft: 4 },

  /* Modal styles */
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