// WorkoutDetailScreen.tsx
import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  StatusBar,
  useColorScheme,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { Schema } from "../../../amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "../../assets/amplify_outputs.json";
import { generateClient } from "aws-amplify/api";
import { IExercise, IWorkout, IWorkoutExercises } from "@/General-Interfaces/IWorkout";
import { UserContext } from "@/Context/User/UserContext";
import { useLocalSearchParams } from "expo-router";

const client = generateClient<Schema>();

Amplify.configure(outputs);

export default function WorkoutDetailScreen() {

   const { specific_id, viewWorkout } = useLocalSearchParams();
   const workoutId = Array.isArray(specific_id) ? specific_id[0] : specific_id;
  const TContext = useContext(UserContext);
  const { userProgress } = TContext;

  const scheme = useColorScheme();
  const { darkMode } = useContext(ThemeContext);
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [weight, setWeight] = useState<string>("");
  const [isEditingWeight, setIsEditingWeight] = useState<boolean>(false);
  const [selectedWorkout, setselectedWorkout] = useState<IWorkout>();

  const [performedExercises, setperformedExercises] = useState<IExercise[]>();
  const [exerciseDescription, setexerciseDescription] = useState<string>("")

  const [specificWorkoutExercise, setspecificWorkoutExercise] = useState<IWorkoutExercises | null>();
  const [selectedExercises, setselectedExercises] = useState<IWorkoutExercises[] | null>();

  const openModal = (ex: IWorkoutExercises) => {
    setspecificWorkoutExercise(ex);
    const exDesc = performedExercises?.find(e => e.exercise_id === ex.exercise_id)
    if(exDesc)
    setexerciseDescription(exDesc.description)
    
  };

  useEffect(() => {
    const fetchWorkout = async () => {
      const { data: fetchedWorkouts, errors } = await client.models.Workouts.get({ id: "workout_001" });
      if (errors) {
        console.error(errors);
        return;
      }
      if (fetchedWorkouts) {
        // Fetch the exercises for this workout
        const { data: workoutExercises } = await fetchedWorkouts.exercises();
        const { data: allExercises, errors } = await client.models.Exercises.list();
        if (errors) {
          console.error(errors);
          return;
        }
        // Map workout exercises with exercise details
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

        const workoutWithExercises = {
          ...fetchedWorkouts,
          exercises: exercisesWithDetails,
        };
        setselectedWorkout(workoutWithExercises as IWorkout);
      }
    };

    fetchWorkout();
  }, [workoutId]);

  useEffect(() => {
    if (!selectedWorkout) return;

    const fetchExercises = async () => {
      const { data: fetchedExercises, errors } = await client.models.Exercises.list();
      if (errors) {
        console.error(errors);
        return;
      }

      if (Array.isArray(fetchedExercises)) {
        const E = fetchedExercises.filter((exercise) =>
          selectedExercises?.some((workoutEx) => workoutEx?.exercise_id === exercise.exercise_id)
        );
        setperformedExercises(E as IExercise[]);
      }
    };

    fetchExercises();
  }, [selectedWorkout, specificWorkoutExercise]);

  useEffect(() => {
    if (!selectedWorkout) return;

    const fetchExercises = async () => {
      const { data: fetchedWorkoutExercises, errors } = await client.models.WorkoutExercises.list({});
      if (errors) {
        console.error(errors);
        return;
      }

      if (Array.isArray(fetchedWorkoutExercises)) {
        const { data: fetchedExercises } = await client.models.Exercises.list();

        const E = fetchedWorkoutExercises
          .filter((exercise) =>
            selectedWorkout.exercises?.some((workoutEx) => workoutEx?.exercise_id === exercise.exercise_id)
          )
          .map((exercise) => {
            const exerciseInfo = fetchedExercises?.find((ex) => ex.exercise_id === exercise.exercise_id);
            return {
              exercise_id: exercise.exercise_id,
              name: exerciseInfo?.name || "Unknown Exercise",
              sets: exercise.sets || 0,
              reps: exercise.reps || "N/A",
              phase: exercise.phase || "",
              time: exercise.time || "",
              workout_id: exercise.workout_id,
            };
          });
        setselectedExercises(E as IWorkoutExercises[]);
      }
    };

    fetchExercises();
  }, [selectedWorkout]);

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === "dark" ? "light-content" : "dark-content"} />
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        {/* Header */}

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerText}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>{selectedWorkout?.name}</Text>
            <Text style={[styles.category, { color: colors.textSecondary }]}>{selectedWorkout?.phase}</Text>
          </View>
          {/* Workout Info */}
          <View style={[styles.infoCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={styles.infoRow}>
              <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
                <Text style={[styles.infoText, { color: colors.textSecondary, width: 50 }]}>{selectedWorkout?.duration} min</Text>
              </View>
              <View style={styles.infoItem}>
                <Ionicons name="flash-outline" size={16} color={colors.textSecondary} />
                <Text style={[styles.infoText, { color: colors.textSecondary, width: 90 }]}>{selectedWorkout?.calories} cal</Text>
              </View>
              <Text
                style={[
                  styles.difficulty,
                  {
                    color:
                      selectedWorkout?.intensity === "Moderate"
                        ? "#1d993cff"
                        : selectedWorkout?.intensity === "Low"
                          ? "#ffb300ff"
                          : "#e03131ff",
                      width: 80,
                      textAlign:'center'
                  },
                ]}
              >
                {selectedWorkout?.intensity}
              </Text>
            </View>
          </View>

          {/* Exercises */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Exercises ({selectedWorkout?.exercises.length})
          </Text>
          {selectedWorkout &&
            selectedWorkout.exercises.map((ex, idx) => (
              <TouchableOpacity
                key={idx}
                style={[styles.exerciseCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}
                onPress={() => openModal(ex)}
                activeOpacity={0.8}
              >
                <View style={styles.exerciseRow}>
                  <View style={styles.indexCircle}>
                    <Text style={[styles.indexText, { color: colors.textPrimary }]}>{idx + 1}</Text>
                  </View>
                  <View style={styles.exerciseInfo}>
                    <Text style={[styles.exerciseName, { color: colors.textPrimary }]}>
                      {ex.name || "Unknown Exercise"}
                    </Text>
                    <View style={styles.metaRow}>
                      <Text style={[styles.metaText, { color: colors.textPrimary }]}> {ex.sets} sets</Text>
                      <Text style={[styles.metaText, { color: colors.textPrimary }]}>
                        {" "}
                        {ex.reps === "undefined" ? ex.time : ex.reps}
                      </Text>
                      <Text style={[styles.metaText, { color: colors.textPrimary }]}> {userProgress.weight} kg</Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </View>
              </TouchableOpacity>
            ))}

          {/* Spacer for button */}
          <View />
          {viewWorkout === "False" ? (
              <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={[styles.startBtn, { backgroundColor: colors.accent }]} activeOpacity={0.8}>
                <Ionicons name="play" size={20} color={colors.textPrimary} />
                <Text style={[styles.startText, { color: colors.textPrimary }]}>Add To Weekly Program</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity style={[styles.startBtn, { backgroundColor: colors.accent }]} activeOpacity={0.8}>
                <Ionicons name="play" size={20} color={colors.textPrimary} />
                <Text style={[styles.startText, { color: colors.textPrimary }]}>Start Workout</Text>
              </TouchableOpacity>
            </View>
          )
          }
        </ScrollView>

        {/* Exercise Detail Modal */}
        <Modal
          visible={!!specificWorkoutExercise}
          transparent
          animationType="fade"
          onRequestClose={() => setspecificWorkoutExercise(null)}
        >
          <View style={styles.modalOverlay}>
            <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>{specificWorkoutExercise?.name}</Text>
                <Pressable onPress={() => setspecificWorkoutExercise(null)}>
                  <Ionicons name="close" size={24} color={colors.textSecondary} />
                </Pressable>
              </View>
              <View style={styles.modalMeta}>
                <View style={styles.modalContainer}>
                  <View style={styles.exerciseDetail}>
                    <Text style={[styles.metaBadge, { color: colors.textPrimary }]}>
                      {specificWorkoutExercise?.sets} sets
                    </Text>
                    <Text style={[styles.metaBadge, { color: colors.textPrimary }]}>
                     {specificWorkoutExercise?.reps === "undefined" ? specificWorkoutExercise.time : specificWorkoutExercise?.reps}
                    </Text>
                  </View>
                  {userProgress?.weight != null && (
                    <View style={styles.weightDetail}>
                      <TouchableOpacity>
                        <Text style={[styles.metaBadge, { color: colors.textPrimary }]}>{userProgress?.weight} kg</Text>
                      </TouchableOpacity>
                      {isEditingWeight ? (
                        <View style={styles.weightRow}>
                          <TextInput
                            style={[styles.weightInput, { color: colors.textPrimary, borderColor: colors.textPrimary }]}
                            keyboardType="numeric"
                            placeholder="Enter kg"
                            placeholderTextColor={colors.textSecondary}
                            value={weight}
                            onChangeText={setWeight}
                            onBlur={() => setIsEditingWeight(false)}
                            autoFocus
                            onSubmitEditing={() => setIsEditingWeight(false)}
                          />
                          <TouchableOpacity onPress={() => setIsEditingWeight(false)} style={styles.closeBtn}>
                            <Text
                              style={[
                                styles.metaSubmit,
                                { color: colors.textPrimary, borderColor: colors.textPrimary },
                              ]}
                            >
                              Submit
                            </Text>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <Pressable onPress={() => setIsEditingWeight(true)}>
                          <Text
                            style={[styles.metaBadge, { color: colors.textPrimary, borderColor: colors.textPrimary }]}
                          >
                            Set Weight
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  )}
                </View>
                <Text style={[styles.modalText, { color: "black" }]}>Exercise Description:</Text>
                <Text style={[styles.modalText, { color: "black" }]}>{exerciseDescription}</Text>
              </View>
            </LinearGradient>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  weightRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  closeBtn: {
    marginLeft: 8,
  },
  backBtn: {
    padding: 8,
    borderRadius: 20,
  },
  exerciseDetail: {
    width: 100,
  },
  weightDetail: {
    width: 100,
  },
  modalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    width: 240,
    alignItems: "center",
    marginHorizontal: "auto",
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 20,
  },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center" },
  category: { fontSize: 14 },
  container: { padding: 16, paddingTop: 60 },
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: "auto",
  },
  infoItem: { flexDirection: "row", alignItems: "center" },
  infoText: { marginLeft: 4, fontSize: 14 },
  difficulty: { fontSize: 14, fontWeight: "600" },
  description: { fontSize: 14, lineHeight: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  exerciseCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  exerciseRow: { flexDirection: "row", alignItems: "center" },
  indexCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  indexText: { fontSize: 16, fontWeight: "600" },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  metaRow: { flexDirection: "row", justifyContent: "space-between" },
  metaText: { marginRight: 12, fontSize: 12 },
  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 14,
  },
  startText: { fontSize: 16, fontWeight: "600", marginLeft: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  modalMeta: {
    flexDirection: "column",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  weightInput: {
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 12,
    textAlign: "center",
  },
  metaBadge: {
    fontSize: 12,
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 10,
  },
  metaSubmit: {
    fontSize: 12,
    borderWidth: 0.2,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  modalText: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
});
