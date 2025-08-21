import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { Link } from "expo-router";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { IUserWorkoutLog, IWeeklyUserWorkouts } from "@/General-Interfaces/IUser";
import { getDate, getWeek, startOfWeek, addDays, getDay, parseISO } from "date-fns";
import { IWorkout } from "@/General-Interfaces/IWorkout";

const client = generateClient<Schema>();

export default function Progress() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const [weeklyWorkouts, setWeeklyWorkouts] = useState<IWeeklyUserWorkouts[]>();
  const [UserWorkoutLog, setUserWorkoutLog] = useState<IUserWorkoutLog[]>();
  const [currentWeek, setcurrentWeek] = useState(getWeek(new Date(), { weekStartsOn: 1 }));
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);

  const getWeekStats = () => {
    const scheduledWorkouts = weeklyWorkouts?.filter((w) => w.week === currentWeek) || [];

    const completedWorkouts = UserWorkoutLog?.filter((log) => log.completed === true) || [];

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

    return { completed, remaining, percentage };
  };

  const { completed, remaining, percentage } = getWeekStats();
  // Fetch all workouts once
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

  // Fetch weekly workouts for the user
  useEffect(() => {
    const fetchWeeklyWorkouts = async () => {
      const { data: weeklyWorkouts, errors } = await client.models.WeeklyUserWorkouts.list({
        filter: {
          user_id: { eq: "user_1" },
        },
      });
      if (errors) {
        console.error(errors);
        return;
      }
      if (weeklyWorkouts) {
        setWeeklyWorkouts(weeklyWorkouts as IWeeklyUserWorkouts[]);
      }
    };
    fetchWeeklyWorkouts();
  }, [currentWeek]);

  // Fetch user workout log for the current week
  useEffect(() => {
    const fetchUserWorkoutLog = async () => {
      const { data: workoutlog, errors } = await client.models.UserWorkoutLog.list({
        filter: {
          user_id: { eq: "user_1" },
        },
      });
      if (errors) {
        console.error(errors);
        return;
      }
      if (workoutlog) {
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
  }, [currentWeek]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>Progress</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Track your progress</Text>
          {/* Week Overview */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={styles.overviewHeader}>
              <TouchableOpacity onPress={() => setcurrentWeek((prev) => prev - 1)}>
                <Ionicons name="chevron-back" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              <Text style={[styles.overviewTitle, { color: colors.textPrimary }]}>
                {currentWeek === getWeek(new Date()) ? "This Week" : `Week ${currentWeek}`}
              </Text>
              <TouchableOpacity onPress={() => setcurrentWeek((prev) => prev + 1)}>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.overviewStats}>
              <View style={styles.overviewStat}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>{completed}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
              </View>
              <View style={styles.overviewStat}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>{remaining}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Remaining</Text>
              </View>
              <View style={styles.overviewStat}>
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>{percentage}%</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Progress</Text>
              </View>
            </View>
          </View>

          {/* Daily Plan */}
          {(() => {
            const daysOfWeek = [1, 2, 3, 4, 5, 6, 7]; // Monday = 1, Sunday = 7
            const dayNames = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

            // Calculate the start of the selected week
            const currentYear = new Date().getFullYear();
            const firstDayOfYear = new Date(currentYear, 0, 1);
            const daysToAdd = (currentWeek - 1) * 7;
            const weekStart = addDays(firstDayOfYear, daysToAdd);
            const mondayOfWeek = startOfWeek(weekStart, { weekStartsOn: 1 }); // Start on Monday

            return daysOfWeek.map((dayOfWeek, i) => {
              // Calculate the specific date for this day in the selected week
              const dayDate = addDays(mondayOfWeek, dayOfWeek - 1);
              const date = getDate(dayDate);
              const dayName = dayNames[dayOfWeek];

              // Find workout for this specific day using scheduledDate instead of dayOfWeek
              const weeklyWorkout = weeklyWorkouts?.find((item) => {
                if (!item.scheduledDate || item.week !== currentWeek) return false;

                // Get the day of week from the scheduled date
                const workoutDayOfWeek = getDay(parseISO(item.scheduledDate));
                const adjustedDay = workoutDayOfWeek === 0 ? 7 : workoutDayOfWeek; // Convert Sunday from 0 to 7

                return adjustedDay === dayOfWeek;
              });

              if (!weeklyWorkout) {
                // Rest day - no workout scheduled for this day
                return (
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
                      <Text style={[styles.dayName, { color: colors.textSecondary }]}>{dayName}</Text>
                      <Text style={[styles.dayDate, { color: colors.textPrimary }]}>{date}</Text>
                    </View>
                    <View style={styles.dayContent}>
                      <Text style={[styles.dayTitle, { color: colors.textPrimary }]}>Rest Day</Text>
                      <Text style={[styles.dayDuration, { color: colors.textSecondary }]}>Active recovery</Text>
                    </View>
                    {/* No icon for rest days */}
                    <View style={{ width: 24 }} />
                  </View>
                );
              }

              // There is a workout scheduled for this day
              const workoutDetails = workouts.find((w) => w.id === weeklyWorkout.workout_id);
              const workoutName = workoutDetails?.name || "Workout";
              const workoutDuration = workoutDetails?.duration ? `${workoutDetails.duration} min` : "Duration TBD";

              const workoutLog = UserWorkoutLog?.find(
                (log) => log.workout_id === weeklyWorkout.workout_id && log.date === weeklyWorkout.scheduledDate
              );

              const isCompleted = workoutLog?.completed || false;

              return (
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
                    <Text style={[styles.dayName, { color: colors.textSecondary }]}>{dayName}</Text>
                    <Text style={[styles.dayDate, { color: colors.textPrimary }]}>{date}</Text>
                  </View>
                  <View style={styles.dayContent}>
                    <Text style={[styles.dayTitle, { color: colors.textPrimary }]}>{workoutName}</Text>
                    <View style={styles.item}>
                      <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                      <Text style={[styles.dayDuration, { color: colors.textSecondary, marginLeft: 6 }]}>
                        {workoutDuration}
                      </Text>
                    </View>
                  </View>
                  {isCompleted ? (
                    <Ionicons name="checkmark-circle" size={24} color={colors.checks} />
                  ) : (
                    <Link
                      href={{
                        pathname: "./DetailedWorkout",
                        params: { viewWorkout: "True", specific_id: weeklyWorkout.workout_id },
                      }}
                      asChild
                    >
                      <TouchableOpacity>
                        <Ionicons name="play-circle-outline" size={24} color={colors.textSecondary} />
                      </TouchableOpacity>
                    </Link>
                  )}
                </View>
              );
            });
          })()}

          {/* This Week's Focus */}
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
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {weeklyWorkouts?.filter(
                    (w) =>
                      w.week === currentWeek &&
                      workouts.find(
                        (workout) =>
                          workout.id === w.workout_id && (workout.type === "Split" || workout.type === "Full Body")
                      )
                  ).length || 0}{" "}
                  days
                </Text>
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
                <Text style={[styles.statValue, { color: colors.textPrimary }]}>
                  {weeklyWorkouts?.filter(
                    (w) =>
                      w.week === currentWeek &&
                      workouts.find((workout) => workout.id === w.workout_id && workout.type === "Active Rest")
                  ).length || 0}{" "}
                  days
                </Text>
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
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  subtitle: { fontSize: 16, textAlign: "center", marginBottom: 20 },
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  overviewTitle: {
    fontSize: 22,
    fontWeight: "600",
  },
  overviewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  item: { flexDirection: "row", alignItems: "center" },
  overviewStat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 15,
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
    width: 40,
    alignItems: "center",
    marginRight: 12,
  },
  dayName: {
    fontSize: 15,
  },
  dayDate: {
    fontSize: 18,
    fontWeight: "600",
  },
  dayContent: { flex: 1 },
  dayTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  daySubtitle: {
    fontSize: 14,
  },
  dayDuration: {
    fontSize: 15,
  },
  cardTitleSmall: {
    fontSize: 18,
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
