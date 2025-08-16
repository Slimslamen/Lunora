// ProfileDetailedScreen.tsx
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { UserContext } from "@/Context/User/UserContext";
import { router } from "expo-router";


const achievements = [
  {
    key: "first",
    icon: <Ionicons name="walk" size={32} />,
    title: "First Workout",
    unlocked: true,
  },
  {
    key: "strength",
    icon: <MaterialCommunityIcons name="dumbbell" size={32} />,
    title: "Strength Builder",
    unlocked: false,
  },
  {
    key: "week",
    icon: <FontAwesome5 name="rocket" size={32} />,
    title: "Week Warrior",
    unlocked: true,
  },
  {
    key: "yoga",
    icon: <MaterialCommunityIcons name="yoga" size={32} />,
    title: "Yoga Zen",
    unlocked: false,
  },
  {
    key: "cardio",
    icon: <Ionicons name="heart" size={32} />,
    title: "Cardio Master",
    unlocked: true,
  },
  {
    key: "hiit",
    icon: <FontAwesome5 name="fire" size={32} />,
    title: "HIIT Champion",
    unlocked: false,
  },
];

const records = [
  {
    key: "longest",
    title: "Longest Workout",
    subtitle: "Last week",
    value: "1h 15min",
  },
  {
    key: "calories",
    title: "Most Calories Burned",
    subtitle: "2 weeks ago",
    value: "650 cal",
  },
  {
    key: "bestStreak",
    title: "Best Weekly Streak",
    subtitle: "This week",
    value: "7 days",
  },
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ProfileDetailedScreen() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const UContext = useContext(UserContext);
  const { activeUser } = UContext;

  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const navToEditProfile = () => {
    router.push("./EditProfile")
  }

  return (
    <View style={styles.safe}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradient}>
        <ScrollView style={{ marginBottom: 20 }} contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>Profile</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Edit your profile</Text>
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={styles.center}>
              <View style={[styles.avatar, { backgroundColor: colors.cardBorder + "50" }]}>
                <Ionicons name="person" size={40} color={colors.textPrimary} />
              </View>
              <Text style={[styles.name, { color: colors.textPrimary }]}>{activeUser?.name}</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Fitness Enthusiast</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity onPress={navToEditProfile} style={[styles.button, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Share Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Achievements */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Achievements</Text>
            <View style={[styles.row, { flexWrap: "wrap", justifyContent: "center" }]}>
              {achievements.map((a) => (
                <View key={a.key} style={styles.achCol}>
                  <View
                    style={[styles.achCircle, { backgroundColor: a.unlocked ? colors.accent : colors.textSecondary }]}
                  >
                    {React.cloneElement(a.icon, { color: a.unlocked ? "#fff" : colors.textPrimary })}
                  </View>
                  <Text style={[styles.achText, { color: a.unlocked ? colors.textPrimary : colors.textSecondary }]}>
                    {a.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Personal Records */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Personal Records</Text>
            {records.map((r) => (
              <View key={r.key} style={styles.recordRow}>
                <View>
                  <Text style={[styles.recordTitle, { color: colors.textPrimary }]}>{r.title}</Text>
                  <Text style={[styles.recordSubtitle, { color: colors.textSecondary }]}>{r.subtitle}</Text>
                </View>
                <Text style={[styles.recordValue, { color: colors.textPrimary }]}>{r.value}</Text>
              </View>
            ))}
          </View>

          {/* This Week's Activity */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary, textAlign: 'center' }]}>This Weeks Activity</Text>
            <Text style={[styles.keepGoing, { color: colors.textSecondary }]}>Keep up the great work! 🎉</Text>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
              {daysOfWeek.map((d) => (
                <Text key={d} style={[styles.dayLabel, { color: colors.textSecondary }]}>
                  {d}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  gradient: { flex: 1 },
  container: { padding: 16, paddingTop: 60, paddingBottom: 60 },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  headerSubtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 15,
    marginBottom: 16,
  },
  center: { alignItems: "center" },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    marginBottom: 12,
  },
  editIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 4,
    borderRadius: 12,
  },
  name: { fontSize: 24, fontWeight: "600" },
  subtitle: { fontSize: 16, marginBottom: 12 },
  buttonRow: { flexDirection: "row", gap: 12 },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: { fontSize: 16, fontWeight: "500" },
  row: { flexDirection: "row", alignItems: "center" },  
  metricCard: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 100,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  sectionHeader: { fontSize: 20, fontWeight: "600", marginBottom: 12 },
  achCol: { width: "33%", alignItems: "center", marginBottom: 16 },
  achCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  achText: { fontSize: 14, textAlign: "center" },
  recordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
  },
  recordTitle: { fontSize: 16, fontWeight: "600" },
  recordSubtitle: { fontSize: 14, marginTop: 2 },
  recordValue: { fontSize: 16, fontWeight: "600" },
  keepGoing: { textAlign: "center", fontSize: 14, marginBottom: 12 },
  dayLabel: { fontSize: 16 },
});
