import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, useColorScheme, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { Link } from "expo-router";
import { WorkoutContext } from "@/Context/Workout/WorkoutContext";

const days = [
  { day: "Mon", date: 8, title: "Upper Body Strength", duration: "45 min", done: true },
  { day: "Tue", date: 9, title: "Cardio & HIIT", duration: "30 min", done: true },
  { day: "Wed", date: 10, title: "Lower Body Power", duration: "50 min", done: true },
  { day: "Thu", date: 11, title: "Rest Day", subtitle: "Active recovery", done: false },
  { day: "Fri", date: 12, title: "Full Body Circuit", duration: "40 min", done: false },
  { day: "Sat", date: 13, title: "Yoga & Mobility", duration: "30 min", done: false },
  { day: "Sun", date: 14, title: "Outdoor Activity", duration: "60 min", done: false },
];

export default function Progress() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const scheme = useColorScheme();
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={scheme === "dark" ? "light-content" : "dark-content"} />
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>Progress</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Track your progress</Text>
          {/* Week Overview */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={styles.overviewHeader}>
              <Text style={[styles.overviewTitle, { color: colors.textPrimary, textAlign: "center" }]}>This Week</Text>
            </View>
            <View style={styles.overviewStats}>
              <View style={styles.overviewStat}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>3</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
              </View>
              <View style={styles.overviewStat}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>4</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Remaining</Text>
              </View>
              <View style={styles.overviewStat}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>43%</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Progress</Text>
              </View>
            </View>
          </View>

          {/* Daily Plan */}
          {days.map((item, i) => (
            <View
              key={i}
              style={[
                styles.dayRow,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
                styles.shadow,
              ]}
            >
              <View style={styles.dayLabel}>
                <Text style={[styles.dayName, { color: colors.textSecondary }]}>{item.day}</Text>
                <Text style={[styles.dayDate, { color: colors.textPrimary }]}>{item.date}</Text>
              </View>
              <View style={styles.dayContent}>
                <Text style={[styles.dayTitle, { color: colors.textPrimary }]}>{item.title}</Text>
                {item.subtitle ? (
                  <Text style={[styles.daySubtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
                ) : (
                  <Text style={[styles.dayDuration, { color: colors.textSecondary }]}>{item.duration}</Text>
                )}
              </View>
              <Link href={{ pathname: "./DetailedWorkout", params: { viewWorkout: "True" } }} asChild>
                <TouchableOpacity>
                  <Ionicons
                    name={item.done ? "checkmark-circle" : "play-circle-outline"}
                    size={24}
                    color={item.done ? colors.checks : colors.textSecondary}
                  />
                </TouchableOpacity>
              </Link>
            </View>
          ))}

          {/* This Week’s Focus */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.cardTitleSmall, { color: colors.textPrimary }]}>This Weeks Focus</Text>
            <View style={styles.row}>
              <View
                style={[
                  styles.focusCard,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  },
                  styles.shadow,
                ]}
              >
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Resistance Training</Text>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>2 days</Text>
              </View>
              <View
                style={[
                  styles.focusCard,
                  {
                    backgroundColor: colors.cardBg,
                    borderColor: colors.cardBorder,
                  },
                  styles.shadow,
                ]}
              >
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active Rest</Text>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>2 days</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: { paddingHorizontal: 16, paddingTop: 60, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 20 },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  overviewHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  overviewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overviewStat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
  },
  dayRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  dayLabel: {
    width: 50,
    alignItems: "center",
    marginRight: 12,
  },
  dayName: {
    fontSize: 12,
  },
  dayDate: {
    fontSize: 16,
    fontWeight: "600",
  },
  dayContent: { flex: 1 },
  dayTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  daySubtitle: {
    fontSize: 12,
  },
  dayDuration: {
    fontSize: 12,
  },
  cardTitleSmall: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  focusCard: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
  },
});
