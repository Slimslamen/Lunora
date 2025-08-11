// WorkoutsScreen.tsx
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LIGHT_COLORS, DARK_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { IWorkout } from "@/General-Interfaces/IWorkout";
import { Link } from "expo-router";

const client = generateClient<Schema>();

const TAGS = ["All", "Menstrual", "Follicular", "Ovulatory", "Luteal"];

const PHASE_DESCRIPTIONS: Record<string, string> = {
  Menstrual: "The Menstrual phase is when your period starts. Focus on gentle movement and recovery.",
  Luteal: "The Luteal phase is after ovulation. Energy may decrease, so listen to your body.",
  Ovulatory: "The Ovulatory phase is when energy peaks. Great time for intense workouts.",
  Follicular: "The Follicular phase is after your period. Energy rises, ideal for building strength.",
};

export default function WorkoutsScreen() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const [workouts, setworkouts] = useState<IWorkout[]>();
  
  useEffect(() => {
    const fetchWorkout = async () => {
      const { data: fetchedWorkout, errors } = await client.models.Workouts.list({});
      if (errors) {
        console.error(errors);
        return;
      }
      if (Array.isArray(fetchedWorkout)) {
        const { data: allExercises } = await client.models.Exercises.list();

        const workoutsWithExercises = await Promise.all(
          fetchedWorkout.map(async (workout) => {
            const { data: workoutExercises } = await workout.exercises();
            
            const exercisesWithDetails = (workoutExercises || []).map((workoutEx) => {
              const exerciseDetail = allExercises?.find((ex) => ex.exercise_id === workoutEx.exercise_id);
              return {
                exercise_id: workoutEx.exercise_id,
                name: exerciseDetail?.name || "Unknown Exercise",
                sets: workoutEx.sets || 0,
                reps: workoutEx.reps || "undefined",
                phase: workoutEx.phase || "",
                time: workoutEx.time,
                workout_id: workoutEx.workout_id,
                createdAt: workoutEx.createdAt || "",
                updatedAt: workoutEx.updatedAt || "",
              };
            });

            return {
              ...workout,
              exercises: exercisesWithDetails,
            };
          })
        );

        setworkouts(workoutsWithExercises as IWorkout[]);
      }
    };
    fetchWorkout();
  }, []);

  const filtered = workouts && workouts.filter(
    (w) => (activeTag === "All" || w.intensity === activeTag || w.phase === activeTag|| w.type === activeTag) && w.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredWorkouts = activeTag === "All" ? workouts : filtered
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Workouts</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Choose your perfect workout</Text>

          {/* Search */}
          {/* <View style={[styles.searchBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Feather name="search" size={18} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.textPrimary }]}
              placeholder="Search workouts..."
              placeholderTextColor={colors.textSecondary}
              value={search}
              onChangeText={setSearch}
            />
          </View> */}

          {/* Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
            {TAGS.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.tagButton,
                  {
                    backgroundColor: activeTag === tag ? colors.accent : "transparent",
                    borderColor: colors.cardBorder,
                  },
                ]}
                onPress={() => setActiveTag(tag)}
              >
                <Text style={[styles.tagText, { color: activeTag === tag ? "#fff" : colors.textPrimary }]}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

            {/* Phase Description Box */}
          {activeTag !== "All" && PHASE_DESCRIPTIONS[activeTag] && (
            <View style={[styles.phaseBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <Text style={[styles.phaseText, { color: colors.textPrimary }]}>
                {PHASE_DESCRIPTIONS[activeTag]}
              </Text>
            </View>
          )}

          {/* Workout List */}
          <ScrollView style={styles.list}>
            {filteredWorkouts &&
              filteredWorkouts.map((w, idx) => {
                let levelColor = colors.textSecondary;
                if (w.intensity === "Low") levelColor = "#ffb300ff";
                if (w.intensity === "Moderate") levelColor = "#1d993cff";
                if (w.intensity === "High") levelColor = "#e03131ff";

                return (
                  <View
                    key={idx}
                    style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
                  >
                    <View style={styles.itemRow}>
                      {w.type === "ActiveRest" ? (
                        <MaterialCommunityIcons name="yoga" size={35} color={colors.textPrimary} />
                      ) : (
                      <MaterialCommunityIcons name="dumbbell" size={35} color={colors.textPrimary} />
                      )}
                      <View style={{ flex: 1, marginLeft: 12 }}>
                        <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{w.name}</Text>
                        <View style={styles.itemMeta}>
                          <View style={styles.item}>
                            <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                            <Text style={[styles.metaText, { color: colors.textSecondary, width: 60 }]}>{w.duration} min</Text>
                          </View>
                          <View style={styles.item}>
                            <MaterialIcons name="bolt" size={20} color={colors.accent} />
                            <Text style={[styles.metaText, { color: colors.textSecondary, width: 90 }]}>{w.calories} cal</Text>
                          </View>
                          <View style={styles.item}>
                            <Text style={[styles.levelText, { color: levelColor, width: 80, textAlign:'center' }]}>{w.intensity}</Text>
                          </View>
                        </View>
                        <View style={styles.tagContainer}>
                          <View
                            style={[
                              styles.tagLabel,
                              { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
                            ]}
                          >
                            <Text style={[styles.tagLabelText, { color: colors.textPrimary }]}>{w.phase}</Text>
                          </View>
                          <Link href={{ pathname: "./DetailedWorkout", params: { specific_id: w.id, viewWorkout: "False" }}} asChild>
                            <TouchableOpacity style={styles.startButton}>
                              <Text style={styles.startText}><View></View>View Workout</Text>
                            </TouchableOpacity>
                          </Link>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
          </ScrollView>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, paddingBottom: 20 },
  gradient: { flex: 1 },
  headerTitle: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  headerSubtitle: { fontSize: 16, textAlign: "center", marginBottom: 16 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 12,
  },
  searchInput: { flex: 1, marginLeft: 8 },
  tagsContainer: { flexGrow: 0, marginBottom: 16 },
  tagButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  tagText: { fontSize: 16 },
  phaseBox: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    marginTop: 4,
  },
  phaseText: {
    fontSize: 18,
    textAlign: "center",
  },
  list: { flex: 1, marginBottom: 60 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  itemTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  itemMeta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 30 }, 
  item: { flexDirection:'row', alignItems: 'center' },
  metaText: { fontSize: 15, marginHorizontal: 4 },
  levelText: { fontSize: 15, fontWeight: "600", marginLeft: 4, textAlign:'center' },
  tagLabel: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 6,
  },
  tagContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  tagLabelText: { fontSize: 14 },
  startButton: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
    alignItems: "center",
  },
  startText: { color: "#000", fontWeight: "600" },
  favorite: { marginLeft: 8 },
});
