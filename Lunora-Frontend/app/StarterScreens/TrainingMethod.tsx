// EnergyLevelScreen.tsx
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ReturnButton } from '../../components/Return'
import { UserContext } from "@/Context/User/UserContext";

const levels = [
    {
        key: "Home",
        label: "Home Workout",
        icon: (props: any) => <Ionicons name="home-outline" {...props} />,
    },
    {
        key: "Gym",
        label: "Gym-based",
        icon: (props: any) => <Ionicons name="barbell-outline" {...props} />,
    },
    {
        key: "Hybrid",
        label: "I train both at home and at the gym",
        icon: (props: any) => <Ionicons name="swap-horizontal-outline" {...props} />,
    },
];

export default function TrainingMethodScreen() {
  const { darkMode } = useContext(ThemeContext);
  const { activeUser } = useContext(UserContext);
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [selected, setSelected] = useState<string>("");

  const router = useRouter();

  const handleContinue = () => {
    if (activeUser) {
      activeUser.trainingMethod = selected;
    }
    router.push("./UserFacts/Goal");
  };
  return (
    <View style={styles.safe}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <View>
          <ReturnButton />
        </View>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>How do you like to train?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select the training method that fits you best</Text>

          {levels.map(({ key, label, icon: Icon }) => {
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
                <View style={styles.iconWrapper}>
                  <Icon size={24} color={isActive ? colors.textPrimary : colors.textSecondary} />
                </View>
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
            <Text style={[styles.buttonText, { color: selected ? colors.textPrimary : colors.textSecondary }]}>
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
  iconWrapper: {
    width: 32,
    alignItems: "center",
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
