// AskBodyMetricsScreen.tsx
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { ReturnButton } from '../../../components/Return'

export default function AskBodyMetricsScreen() {
  const { darkMode } = useContext(ThemeContext);

  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const router = useRouter();

  // Height in cm (100–220)
  const [height, setHeight] = useState<number>(170);
  // Weight in kg (30–150)
  const [weight, setWeight] = useState<number>(70);

  const handleContinue = () => {
    router.push("../Facts/Fact1");
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <View>
          <ReturnButton />
        </View>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Tell us about you</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select your height and weight</Text>

          {/* Height Picker */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Height (cm)</Text>
            <Picker
              selectedValue={height}
              onValueChange={(v) => setHeight(v)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: 121 }, (_, i) => 100 + i).map((cm) => (
                <Picker.Item key={cm} label={`${cm}`} value={cm} color={colors.textPrimary} />
              ))}
            </Picker>
          </View>

          {/* Weight Picker */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Weight (kg)</Text>
            <Picker
              selectedValue={weight}
              onValueChange={(v) => setWeight(v)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              {Array.from({ length: 121 }, (_, i) => 30 + i).map((kg) => (
                <Picker.Item key={kg} label={`${kg}`} value={kg} color={colors.textPrimary} />
              ))}
            </Picker>
          </View>

          {/* Continue Button */}
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.accent }]} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 80, // space for tab bar
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  card: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    overflow: Platform.OS === "ios" ? "hidden" : undefined,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    padding: 12,
  },
  picker: {
    width: "100%",
    height: Platform.OS === "ios" ? 150 : 50,
  },
  pickerItem: {
    fontSize: 16,
    height: 150,
  },
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
