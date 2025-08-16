import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { IUser, IWeeklyUserWorkouts, IUserWorkoutLog } from "@/General-Interfaces/IUser";
import { IWorkout } from "@/General-Interfaces/IWorkout";
import { isSameDay, parseISO, getWeek } from "date-fns";
import { UserContext } from "@/Context/User/UserContext";

const client = generateClient<Schema>();

export default function ProgressOverviewScreen() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const UContext = useContext(UserContext);
  const { activeUser } = UContext;

  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const [appUser, setappUsers] = useState<IUser>();
  const [weeklyWorkouts, setWeeklyWorkouts] = useState<IWeeklyUserWorkouts[]>();
  const [userWorkoutLog, setUserWorkoutLog] = useState<IUserWorkoutLog[]>();
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [currentWeek, setCurrentWeek] = useState(getWeek(new Date()));
  const [allUserWorkoutLogs, setAllUserWorkoutLogs] = useState<IUserWorkoutLog[]>();

  const router = useRouter();

  // Function to get weekly stats for progress bar
  const getWeekStats = () => {
    const scheduledWorkouts = weeklyWorkouts?.filter((w) => w.week === currentWeek) || [];
    const completedWorkouts = userWorkoutLog?.filter((log) => log.completed === true) || [];

    const scheduledButNotCompleted = scheduledWorkouts.filter((scheduled) => {
      const hasCompletedLog = completedWorkouts.some(
        (log) => log.workout_id === scheduled.workout_id && log.date === scheduled.scheduledDate
      );
      return !hasCompletedLog;
    });

    const totalScheduled = scheduledWorkouts.length;
    const completed = completedWorkouts.length;
    const remaining = scheduledButNotCompleted.length;
    const percentage = totalScheduled > 0 ? Math.round((completed / totalScheduled) * 100) : 0;

    return { completed, remaining, totalScheduled, percentage };
  };

  const { completed, remaining, totalScheduled, percentage } = getWeekStats();

  // Calculate total completed workouts and days as member
  const totalCompletedWorkouts = allUserWorkoutLogs?.filter(log => log.completed === true).length || 0;
  const memberSince = appUser?.createdAt ? new Date(appUser.createdAt) : new Date();
  const daysAsMember = Math.floor((new Date().getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24));

  const metrics = [
    {
      key: "workouts",
      icon: <Ionicons name="bar-chart" size={24} />,
      value: totalCompletedWorkouts.toString(),
      label: "Workouts Completed",
    },
    {
      key: "days",
      icon: <Ionicons name="calendar-outline" size={24} />,
      value: daysAsMember.toString(),
      label: "Days As A Member",
    },
  ];

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const { data: Users, errors } = await client.models.Users.list({});
      if (errors) {
        console.error(errors);
        return;
      }
      if (Array.isArray(Users)) {
        const jimmyUser = Users.find((u) => u.name === "Jimmy");
        if (jimmyUser) {
          setappUsers(jimmyUser as IUser);
        }
      }
    };
    fetchUser();
  }, []);

  // Fetch weekly workouts for the user
  useEffect(() => {
    const fetchWeeklyWorkouts = async () => {
      if (!appUser) return;
      const { data, errors } = await client.models.WeeklyUserWorkouts.list({
        filter: {
          user_id: { eq: activeUser?.id || "user_1" },
        },
      });
      if (errors) {
        console.error(errors);
        return;
      }
      if (data) {
        setWeeklyWorkouts(data as IWeeklyUserWorkouts[]);
      }
    };
    fetchWeeklyWorkouts();
  }, [appUser, activeUser?.id]);

  // Fetch user workout log for the current week
  useEffect(() => {
    const fetchUserWorkoutLog = async () => {
      const { data: workoutlog, errors } = await client.models.UserWorkoutLog.list({
        filter: {
          user_id: { eq: activeUser?.id || "user_1" },
        },
      });
      if (errors) {
        console.error(errors);
        return;
      }
      if (workoutlog) {
        // Store all logs for metrics calculation
        setAllUserWorkoutLogs(workoutlog as IUserWorkoutLog[]);
        
        // Filter for current week
        let currentUserWeeklyLog = workoutlog.filter((workouts) => {
          if (workouts.date) {
            return getWeek(workouts.date) === currentWeek;
          }
          return false;
        });
        setUserWorkoutLog(currentUserWeeklyLog as IUserWorkoutLog[]);
      }
    };
    fetchUserWorkoutLog();
  }, [currentWeek, activeUser?.id]);

  // Fetch all workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      const { data, errors } = await client.models.Workouts.list({});
      if (errors) {
        console.error(errors);
        return;
      }
      if (data) {
        setWorkouts(data as unknown as IWorkout[]);
      }
    };
    fetchWorkouts();
  }, []);

  // Find today's workout for the user
const getTodaysWorkoutId = () => {
  if (!weeklyWorkouts) return null;
  const today = new Date();
  
  // Find workout that matches today's date
  const todayWorkout = weeklyWorkouts.find((w) => {
    // Assuming your workout has a 'date' field
    const workoutDate = typeof w.scheduledDate === 'string' ? parseISO(w.scheduledDate) : new Date(w.scheduledDate);
    return isSameDay(workoutDate, today);
  });
  
  return todayWorkout?.workout_id || null;
};

  const navigateToWorkout = () => {
    const workoutId = getTodaysWorkoutId();
    if (workoutId) {
      router.push({
        pathname: "./DetailedWorkout",
        params: { viewWorkout: "True", specific_id: workoutId },
      });
    } else {
      Alert.alert("No workout scheduled for today!");
    }
  };

  const navigateToWorkouts = () => {
    router.push("./workouts");
  };

  return (
    <View style={{ flex: 1 }}>
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
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    backgroundColor: colors.textPrimary,
                    width: `${percentage}%`
                  }
                ]} 
              />
            </View>

            <View style={styles.row}>
              <Text style={[styles.subtext, { color: colors.textSecondary }]}>
                {completed}/{totalScheduled} workouts
              </Text>
              <Text style={[styles.subtext, { color: colors.textSecondary }]}>
                {percentage}%
              </Text>
            </View>
          </View>

          <View style={[styles.metricsRow, styles.row]}>
            {metrics.map((m) => (
              <View
                key={m.key}
                style={[styles.metricCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
              >
                {React.cloneElement(m.icon, { color: colors.textPrimary })}
                <Text style={[styles.metricValue, { color: colors.textPrimary }]}>{m.value}</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{m.label}</Text>
              </View>
            ))}
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
              <View style={[styles.row, styles.quickRow]}>
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
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
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
  cardTitle: { fontSize: 20, fontWeight: "600" },

  progressBarBg: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: { 
    height: "100%", 
    minWidth: "2%", // Minimum width to show some progress
    borderRadius: 4 
  },
  metricsRow: { justifyContent: "space-between", marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between" },
  subtext: { fontSize: 14 },
  metricRow: { marginBottom: 16 },
  metricCard: {
    flex: 1,
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  metricLabel: { fontSize: 15, marginTop: 4 },
  metricValue: { fontSize: 20, fontWeight: "700", marginTop: 2 },

  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderBottomWidth: 1,
  },
  activityName: { fontSize: 16, fontWeight: "600" },
  activityWhen: { fontSize: 14, marginTop: 2 },
  activityDuration: { fontSize: 14, fontWeight: "600" },
  quickRow: { marginTop: 12 },
  quickButton: {
    borderColor: "#f5e6e6",
    borderWidth: 2,
    paddingVertical: 14,
    paddingHorizontal: 5,
    borderRadius: 14,
    alignItems: "center",
  },
  quickText: { fontSize: 15, fontWeight: "600" },
});
