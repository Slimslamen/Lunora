// GoalSelectionScreen.tsx
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ReturnButton } from '../../../components/Return'

const goals = [
  {
    key: "lose_weight",
    label: "Lose Weight",
    icon: (props: any) => <FontAwesome5 name="running" {...props} />,
  },
  {
    key: "build_muscle",
    label: "Build Muscle",
    icon: (props: any) => <MaterialCommunityIcons name="dumbbell" {...props} />,
  },
  {
    key: "boost_endurance",
    label: "Boost Endurance",
    icon: (props: any) => <Ionicons name="pulse" {...props} />,
  },
  {
    key: "improve_flexibility",
    label: "Improve Flexibility",
    icon: (props: any) => <MaterialCommunityIcons name="yoga" {...props} />,
  },
];

export default function GoalSelectionScreen() {
  const { darkMode } = useContext(ThemeContext);
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const router = useRouter();

  const handleContinue = () => {
    router.push("../Energy");
  };

  return (
    <View style={styles.safe}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <View>
          <ReturnButton />
        </View>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>What’s your main goal?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Choose one to personalize your plan</Text>

          {goals.map(({ key, label, icon: Icon }) => {
            const isActive = selectedGoal === key;
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
                onPress={() => setSelectedGoal(key)}
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
            style={[
              styles.button,
              {
                backgroundColor: selectedGoal ? colors.accent : colors.cardBg,
                borderColor: selectedGoal ? colors.accent : colors.cardBorder,
              },
              !selectedGoal && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!selectedGoal}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: selectedGoal ? colors.textPrimary : colors.textSecondary,
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
  safe: {
    flex: 1,
  },
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
