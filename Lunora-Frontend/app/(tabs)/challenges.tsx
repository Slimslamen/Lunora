// ChallengesScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, useColorScheme, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { generateClient } from "aws-amplify/data";
import { Schema } from "../../../amplify/data/resource"; // Adjust the relative path as needed
import { IChallenge } from "@/General-Interfaces/IChallenge";

const client = generateClient<Schema>();

const activeChallenges = [
  {
    id: "streak",
    icon: <FontAwesome5 name="fire" size={18} />,
    title: "7-Day Streak Master",
    subtitle: "Complete 7 workouts in a row",
    progress: 3 / 10,
    progressText: "3/7 completed",
    daysLeft: "4d left",
    reward: "Streak Badge",
    rewardIcon: <Ionicons name="star" size={16} />,
  },
  {
    id: "cardio",
    icon: <Ionicons name="heart" size={18} />,
    title: "Cardio Champion",
    subtitle: "Complete 10 cardio workouts this month",
    progress: 6 / 10,
    progressText: "6/10 completed",
    daysLeft: "12d left",
    reward: "Cardio Badge + 500 XP",
    rewardIcon: <Ionicons name="star" size={16} />,
  },
  {
    id: "early",
    icon: <Feather name="sunrise" size={18} />,
    title: "Early Bird",
    subtitle: "Complete 5 morning workouts",
    progress: 2 / 10,
    progressText: "2/5 completed",
    daysLeft: "10d left",
    reward: "Morning Badge",
    rewardIcon: <Ionicons name="star" size={16} />,
  },
];

const completed = [
  {
    id: "first",
    icon: <Ionicons name="walk" size={18} />,
    title: "First Steps",
    subtitle: "Complete your first workout",
    timeAgo: "2 days ago",
    trophy: <Ionicons name="trophy" size={16} />,
  },
  {
    id: "consistency",
    icon: <FontAwesome5 name="crown" size={18} />,
    title: "Consistency King",
    subtitle: "Complete 3 workouts in one week",
    timeAgo: "1 week ago",
    trophy: <Ionicons name="trophy" size={16} />,
  },
];

const comingSoon = [
  {
    id: "monthly",
    icon: <MaterialCommunityIcons name="calendar-star" size={18} />,
    title: "Monthly Warrior",
    subtitle: "Complete 20 workouts in one month",
    startsIn: "Starts in 3 days",
    crown: <FontAwesome5 name="crown" size={16} />,
  },
  {
    id: "strength",
    icon: <MaterialCommunityIcons name="dumbbell" size={18} />,
    title: "Strength Builder",
    subtitle: "Complete 15 strength workouts",
    startsIn: "Starts in 1 week",
    crown: <FontAwesome5 name="crown" size={16} />,
  },
];

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

  const scheme = useColorScheme();
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const [fetchedChallenge, setfetchedChallenge] = useState<IChallenge[]>();
  const [showChallenges, setshowChallenges] = useState(false);
  const [showCompleted, setshowCompleted] = useState(false);

  const activeChallenges = fetchedChallenge?.filter((f) => f.active);
  const completedChallenges = fetchedChallenge?.filter((f) => f.completed);
  const comingChallenges = fetchedChallenge?.filter((f) => f.coming);

  const ChallengeIcon = ({
    iconSet,
    icon,
    ...props
  }: {
    iconSet: keyof typeof iconMap;
    icon: string;
    [key: string]: any;
  }) => {
    const IconComponent = iconMap[iconSet];
    if (!IconComponent) return null;
    return <IconComponent name={icon} size={icon === "star" || icon === "trophy" || icon === "crown" ? 18 : 30} {...props} />;
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

  const showActiveChallenges = () => {
    setshowChallenges(!showChallenges);
  };
  const showCompletedChallenges = () => {
    setshowCompleted(!showCompleted);
  };
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={scheme === "light" ? "light-content" : "dark-content"} />
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
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>{completedChallenges?.length}</Text>
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
              <View
                key={ch.id}
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
                    <Text style={[styles.challengeSubtitle, { color: colors.textPrimary }]}>{ch.description}</Text>
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
                  <View style={styles.reward}>
                    <ChallengeIcon
                      iconSet={ch.rewardSet as IconSet}
                      icon={ch.rewardIcon}
                      color={colors.textSecondary}
                    />
                  </View>
                </View>
              </View>
            ))}
          <TouchableOpacity onPress={showActiveChallenges} style={[styles.quickButton]}>
            <Text style={[styles.quickText, { color: colors.textPrimary }]}>
              {showChallenges ? "View Fewer Challenges" : "View all Challenges"}
            </Text>
          </TouchableOpacity>

          {/* Completed */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Completed</Text>
          {completedChallenges &&
            completedChallenges.slice(0, showChallenges ? completedChallenges.length : 3).map((ch) => (
              <View
                key={ch.id}
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
                    <Text style={[styles.challengeSubtitle, { color: colors.textPrimary, textAlign: "center" }]}>
                      {ch.description}
                    </Text>
                  </View>
                  <Text style={[styles.progressText, { color: colors.textPrimary, textAlign:'center', fontWeight: 'bold', marginTop: 10, marginLeft: -20 }]}>
                    {(ch.progress / 20) * 100}% completed
                  </Text>
                </View>
                <View style={styles.rowFooter}>
                  <View style={styles.reward}>
                    <ChallengeIcon iconSet={ch.rewardSet as IconSet} icon={ch.rewardIcon} color={colors.accent} />
                  </View>
                </View>
              </View>
            ))}
          <TouchableOpacity onPress={showCompletedChallenges} style={[styles.quickButton]}>
            <Text style={[styles.quickText, { color: colors.textPrimary }]}>
              {showCompleted ? "View Fewer Completed Challenges" : "View All Completed Challenges"}
            </Text>
          </TouchableOpacity>

          {/* Coming Soon */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Coming Soon</Text>
          {comingSoon.map((c) => (
            <View
              key={c.id}
              style={[
                styles.card,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <View style={styles.row}>
                <View style={styles.iconWrapper}>{React.cloneElement(c.icon, { color: colors.textSecondary })}</View>
                <View style={styles.challengeContent}>
                  <Text style={[styles.challengeTitle, { color: colors.textSecondary }]}>{c.title}</Text>
                  <Text style={[styles.challengeSubtitle, { color: colors.textSecondary, opacity: 0.8 }]}>
                    {c.subtitle}
                  </Text>
                </View>
                <Text style={[styles.daysLeft, { color: colors.textSecondary }]}>{c.startsIn}</Text>
                <View style={styles.iconWrapper}>{React.cloneElement(c.crown, { color: colors.accent })}</View>
              </View>
            </View>
          ))}
           {comingChallenges?.map((ch) => (
              <View
                key={ch.id}
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
                    <Text style={[styles.challengeTitle, { color: colors.textPrimary, opacity: 0.8 }]}>
                      {ch.name}
                    </Text>
                    <Text style={[styles.challengeSubtitle, { color: colors.textPrimary, opacity: 0.8 }]}>
                      {ch.description}
                    </Text>
                  </View>
                  <View style={styles.reward}>
                    <ChallengeIcon iconSet={ch.rewardSet as IconSet} icon={ch.rewardIcon} color={colors.accent} />
                  </View>
                </View>
              </View>
            ))}
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
  quickText: { fontSize: 14, fontWeight: "600" },
  container: { padding: 16, paddingTop: 60, paddingBottom: 90 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 24 },
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
    flexDirection: 'row',
    alignItems: 'center'
  },
  statsRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 10 },
  statItem: { alignItems: "center", flex: 1, textAlign: 'center' },
  statNumber: { fontSize: 20, fontWeight: "700" },
  statLabel: { fontSize: 12 },
  sectionHeader: { fontSize: 16, fontWeight: "600", marginVertical: 8 },
  row: { flexDirection: "row", alignItems: "center" },
  column: { flexDirection: "column", alignItems: "center" },
  iconWrapper: { width: 30, alignItems: "center", marginRight: 12, marginLeft: 8 },
  challengeContent: { flex: 1, paddingRight: 20 },
  challengeTitle: { fontSize: 15, fontWeight: "600" },
  challengeSubtitle: { fontSize: 12, marginTop: 2 },
  daysLeft: { fontSize: 12, marginLeft: 8 },
  progressBarBg: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressFill: { height: "100%" },
  rowFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  progressText: { fontSize: 12 },
  reward: { flexDirection: "row", alignItems: "center" },
  rewardText: { fontSize: 12, marginLeft: 4 },
});
