// EditProfileScreen.tsx
import React, { useContext, useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Pressable, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { Picker } from "@react-native-picker/picker";

type Profile = {
  height: number;
  weight: number;
  obstacle: string;
  trainingMethod: string;
  goal: string;
  birthControl: string;
  energy: string;
  workoutFrequency: string | number;
  paidPlan: string;
};

const OBSTACLES = ["Insufficient knowledge", "Time management", "Inconsistent motivation"];
const WORKOUTFREQUENCY = ["2-3 times/week", "4-5 times/week", "6+ times/week"];
const METHODS = ["Gym-based", "Home workouts", "Hybrid"];
const GOALS = ["Lose weight", "Build muscle", "Boost Endurance", "General wellness"];
// const BIRTH_CONTROL = ["None", "Pill", "IUD", "Implant", "Other"];
const ENERGY = ["Low", "Moderate", "High"];
const PLANS = ["Standard", "Plus", "Annual", "Annual Plus"];

export default function EditProfileScreen() {
  const router = useRouter();
  const { darkMode } = useContext(ThemeContext);
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  // TODO: replace this with your actual user profile from store/API
  const initial: Profile = useMemo(
    () => ({
      height: 168,
      weight: 64,
      obstacle: "Insufficient knowledge",
      trainingMethod: "Home workouts",
      goal: "Performance",
      cycle: new Date().toISOString().slice(0, 10),
      birthControl: "None",
      energy: "Moderate",
      workoutFrequency: "2-3 times/week",
      paidPlan: "Standard",
    }),
    []
  );

  const [form, setForm] = useState<Profile>(initial);
  const [picker, setPicker] = useState<null | {
    key: keyof Profile;
    options: string[];
  }>(null);

  const openSelect = (key: keyof Profile, options: string[]) => setPicker({ key, options });
  const selectValue = (value: string) => {
    if (!picker) return;
    setForm((prev) => ({ ...prev, [picker.key]: value }) as Profile);
    setPicker(null);
  };

  const onSave = () => {
    let frequencyValue;
    switch (form.workoutFrequency) {
      case "2-3 times/week":
        frequencyValue = 3;
        break;
      case "4-5 times/week":
        frequencyValue = 5;
        break;
      case "6+ times/week":
        frequencyValue = 6;
        break;
    }

    console.log("Saving with frequency:", frequencyValue);
    // TODO: persist form to your backend/store
    router.push("./profile");
  };

  return (
    <View style={styles.safe}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Edit Profile</Text>
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          {/* Profile / Plan Card (tap to change plan) */}
          <Card colors={colors}>
            <SelectRow
              title="Plan"
              value={form.paidPlan}
              onPress={() => openSelect("paidPlan", PLANS)}
              colors={colors}
            />
          </Card>

          {/* Height & Weight Pickers */}
          <Card colors={colors}>
            <Text style={[{ fontSize: 18, fontWeight: "600", padding: 12 }, { color: colors.textPrimary }]}>
              Height (cm)
            </Text>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderRadius: 10,
                  overflow: Platform.OS === "ios" ? "hidden" : undefined,
                  borderColor: colors.cardBorder,
                  backgroundColor: colors.cardBg,
                  marginBottom: 16,
                },
              ]}
            >
              <Picker
                selectedValue={form.height}
                onValueChange={(v) => setForm((prev) => ({ ...prev, height: v }))}
                style={{ width: "100%", height: Platform.OS === "ios" ? 150 : 50 }}
                itemStyle={{ fontSize: 20, height: 150 }}
              >
                {Array.from({ length: 121 }, (_, i) => 100 + i).map((cm) => (
                  <Picker.Item key={cm} label={`${cm}`} value={cm} color={colors.textPrimary} />
                ))}
              </Picker>
            </View>
            <Text style={[{ fontSize: 18, fontWeight: "600", padding: 12 }, { color: colors.textPrimary }]}>
              Weight (kg)
            </Text>
            <View
              style={[
                {
                  borderWidth: 1,
                  borderRadius: 10,
                  overflow: Platform.OS === "ios" ? "hidden" : undefined,
                  borderColor: colors.cardBorder,
                  backgroundColor: colors.cardBg,
                  marginBottom: 16,
                },
              ]}
            >
              <Picker
                selectedValue={form.weight}
                onValueChange={(v) => setForm((prev) => ({ ...prev, weight: v }))}
                style={{ width: "100%", height: Platform.OS === "ios" ? 150 : 50 }}
                itemStyle={{ fontSize: 20, height: 150 }}
              >
                {Array.from({ length: 121 }, (_, i) => 30 + i).map((kg) => (
                  <Picker.Item key={kg} label={`${kg}`} value={kg} color={colors.textPrimary} />
                ))}
              </Picker>
            </View>
          </Card>

          {/* Select Lists */}
          <Card colors={colors}>
            <SelectRow
              title="Workout frequency"
              value={String(form.workoutFrequency)}
              onPress={() => openSelect("workoutFrequency", WORKOUTFREQUENCY)}
              colors={colors}
            />
            <Divider colors={colors} />
            <SelectRow
              title="Main obstacle"
              value={form.obstacle}
              onPress={() => openSelect("obstacle", OBSTACLES)}
              colors={colors}
            />
            <Divider colors={colors} />
            <SelectRow
              title="Training method"
              value={form.trainingMethod}
              onPress={() => openSelect("trainingMethod", METHODS)}
              colors={colors}
            />
            <Divider colors={colors} />
            <SelectRow title="Goal" value={form.goal} onPress={() => openSelect("goal", GOALS)} colors={colors} />
            <Divider colors={colors} />
            <SelectRow
              title="Energy"
              value={form.energy}
              onPress={() => openSelect("energy", ENERGY)}
              colors={colors}
            />
          </Card>

          {/* Save */}
          <TouchableOpacity
            onPress={onSave}
            style={[styles.saveBtn, { backgroundColor: colors.accent, borderColor: colors.accent }]}
          >
            <Text style={[styles.saveText, { color: colors.textPrimary }]}>Save Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>

        {/* Modal */}
        <Modal transparent visible={!!picker} animationType="fade" onRequestClose={() => setPicker(null)}>
          <View style={styles.modalOverlay}>
            <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Choose one</Text>
                <Pressable onPress={() => setPicker(null)}>
                  <Ionicons name="close" size={22} color={colors.textSecondary} />
                </Pressable>
              </View>
              {picker?.options.map((opt) => (
                <TouchableOpacity key={opt} onPress={() => selectValue(opt)} activeOpacity={0.8}>
                  <View style={styles.optionRow}>
                    <Text style={[styles.optionText, { color: colors.textPrimary }]}>{opt}</Text>
                    {String(form[picker.key]) === opt && (
                      <Ionicons name="checkmark-circle" size={18} color={colors.checks} />
                    )}
                  </View>
                  <Divider colors={colors} />
                </TouchableOpacity>
              ))}
            </LinearGradient>
          </View>
        </Modal>
      </LinearGradient>
    </View>
  );
}

/* ---------- Small presentational helpers ---------- */
function Card({ children, colors }: { children: React.ReactNode; colors: typeof LIGHT_COLORS }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>{children}</View>
  );
}

function SelectRow({
  title,
  value,
  onPress,
  colors,
}: {
  title: string;
  value: string;
  onPress: () => void;
  colors: typeof LIGHT_COLORS;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.row}>
      <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{title}</Text>
      <View style={styles.rowValueWrap}>
        <Text style={[styles.rowValue, { color: colors.textSecondary }]} numberOfLines={1}>
          {value}
        </Text>
        <Ionicons name="chevron-forward" size={18} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );
}

function Divider({ colors }: { colors: typeof LIGHT_COLORS }) {
  return <View style={[styles.divider, { borderBottomColor: colors.accent }]} />;
}

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: {
    paddingTop: 70,
    paddingHorizontal: 16,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: { padding: 6, borderRadius: 20 },
  headerTitle: { fontSize: 24, fontWeight: "700" },
  modalContent: {
    borderRadius: 12,
    padding: 20,
  },
  container: { padding: 16, paddingBottom: 40 },

  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
    marginBottom: 16,
  },
  label: { fontSize: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 18,
  },
  pickerWrap: {
    borderWidth: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  dateBtn: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  rowLabel: { flex: 1, fontSize: 17, fontWeight: "600" },
  rowValueWrap: { flexDirection: "row", alignItems: "center" },
  rowValue: { fontSize: 16, marginRight: 6, maxWidth: 180 },
  divider: { borderBottomWidth: 1, marginVertical: 8 },
  saveBtn: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  saveText: { fontSize: 16, fontWeight: "700" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", padding: 24 },
  modalHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  modalTitle: { fontSize: 16, fontWeight: "700" },
  optionRow: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionText: { fontSize: 14 },

  spacer: { height: 12 },
});
