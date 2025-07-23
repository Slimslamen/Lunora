// ProgressOverviewScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, StatusBar, useColorScheme, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { Link, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { IUser } from "@/General-Interfaces/IUser";

const client = generateClient<Schema>();

export default function ProgressOverviewScreen() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const scheme = useColorScheme();
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const [appUser, setappUsers] = useState<IUser>()
  const [loaded, setloaded] = useState(false)

  
  const router = useRouter();
  const navigateToWorkout = () => {
    router.push("./workouts");
  };
  const navigateToWorkouts = () => {
    router.push("./workouts");
  };


  useEffect(() => {
    const fetchUser = async () => {
      const { data: Users, errors } = await client.models.User.list({});
      if (errors) {
        console.error(errors);
        return;
      }
      if (Array.isArray(Users)) {
        const jimmyUser = Users.find(u => u.name === 'Jimmy');
        if (jimmyUser) {
          setappUsers(jimmyUser as IUser);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={scheme === "light" ? "light-content" : "dark-content"} />
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome {appUser?.name}!</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Push towards your goals</Text>

          {/* Weekly Progress */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Weekly Progress</Text>
              <Feather name="target" size={24} color={colors.textSecondary} />
            </View>

            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { backgroundColor: colors.textPrimary }]} />
            </View>

            <View style={styles.row}>
              <Text style={[styles.subtext, { color: colors.textSecondary }]}>3/5 workouts</Text>
              <Text style={[styles.subtext, { color: colors.textSecondary }]}>60%</Text>
            </View>
          </View>

          {/* Streak & This Month */}
          <View style={[styles.row, styles.metricRow]}>
            <View
              style={[
                styles.metricCard,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <Ionicons name="flame" size={18} color={colors.textSecondary} />
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>Streak</Text>
              <Text style={[styles.metricValue, { color: colors.textPrimary }]}>7</Text>
            </View>

            <View
              style={[
                styles.metricCard,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <Ionicons name="calendar" size={18} color={colors.textSecondary} />
              <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>This Month</Text>
              <Text style={[styles.metricValue, { color: colors.textPrimary }]}>12</Text>
            </View>
          </View>

          {/* Recent Activity */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Recent Activity</Text>
              <Ionicons name="bar-chart" size={20} color={colors.textSecondary} />
            </View>

            {[
              { name: "Upper Body Strength", when: "Today", dur: "45 min" },
              { name: "Cardio Blast", when: "Yesterday", dur: "30 min" },
              { name: "Core & Abs", when: "2 days ago", dur: "20 min" },
            ].map((item, i) => (
              <View key={i} style={styles.activityItem}>
                <View>
                  <Text style={[styles.activityName, { color: colors.textPrimary }]}>{item.name}</Text>
                  <Text style={[styles.activityWhen, { color: colors.textSecondary }]}>{item.when}</Text>
                </View>
                <Text style={[styles.activityDuration, { color: colors.textSecondary }]}>{item.dur}</Text>
              </View>
            ))}
          </View>

          {/* Quick Start */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>Quick Start</Text>
            <View>
              <View style={[styles.row, styles.quickRow, { paddingVertical: 10 }]}>
                <TouchableOpacity onPress={navigateToWorkout} style={styles.quickButton}>
                  <Text style={[styles.quickText, { color: colors.textPrimary }]}>Start Todays Workout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToWorkouts} style={styles.quickButton}>
                  <Text style={[styles.quickText, { color: colors.textPrimary }]}>Browse Workouts</Text>
                </TouchableOpacity>
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
  container: { padding: 16, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 20 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: "600" },

  progressBarBg: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: { height: "100%", width: "60%" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  subtext: { fontSize: 12 },
  metricRow: { marginBottom: 16 },
  metricCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  metricLabel: { fontSize: 13, marginTop: 4 },
  metricValue: { fontSize: 20, fontWeight: "700", marginTop: 2 },

  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderBottomWidth: 1,
  },
  activityName: { fontSize: 15, fontWeight: "600" },
  activityWhen: { fontSize: 12, marginTop: 2 },
  activityDuration: { fontSize: 13, fontWeight: "600" },
  quickRow: { marginTop: 12 },
  quickButton: {
    borderColor: "#f5e6e6",
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 14,
    alignItems: "center",
  },
  quickText: { fontSize: 14, fontWeight: "600" },
});
