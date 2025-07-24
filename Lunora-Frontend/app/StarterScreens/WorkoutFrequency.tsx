// WorkoutFrequencyScreen.tsx
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, useColorScheme } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ReturnButton } from '../../components/Return'

const options = [
  {
    key: "2_3",
    label: "2–3 times/week",
    iconName: "2-circle-outline",
  },
  {
    key: "4_5",
    label: "4–5 times/week",
    iconName: "5-circle-outline",
  },
  {
    key: "more",
    label: "6+ times/week",
    iconName: "infinite-outline",
  },
];

export default function WorkoutFrequencyScreen() {
  const { darkMode } = useContext(ThemeContext);
  const scheme = useColorScheme();
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [selected, setSelected] = useState<string | null>(null);

  const router = useRouter();

  const handleContinue = () => {
    router.push("./Referral");
  };

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === "dark" ? "light-content" : "dark-content"} />
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <View>
          <ReturnButton />
        </View>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>How often do you work out?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Choose your typical weekly frequency</Text>

          {options.map(({ key, label, iconName }) => {
            const isActive = selected === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.card,
                  {
                    backgroundColor: isActive ? colors.accent : colors.cardBg,
                    borderColor: isActive ? colors.accent : colors.cardBorder,
                  },
                ]}
                onPress={() => setSelected(key)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.cardText,
                    {
                      color: isActive ? colors.textPrimary : colors.textSecondary,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            onPress={handleContinue}
            style={[
              styles.button,
              {
                backgroundColor: selected ? colors.accent : colors.cardBg,
                borderColor: selected ? colors.accent : colors.cardBorder,
              },
              !selected && styles.buttonDisabled,
            ]}
            disabled={!selected}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: selected ? colors.textPrimary : colors.textSecondary,
                },
              ]}
            >
              Continue
            </Text>
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
    width: "100%",
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  icon: {
    width: 32,
    textAlign: "center",
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    marginTop: 24,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
});
