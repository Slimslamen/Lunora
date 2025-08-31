// GoalBarrierScreen.tsx
import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ReturnButton } from '../../../components/Return'
import { UserContext } from "@/Context/User/UserContext";

const reasons = [
  {
    key: "insufficient_knowledge",
    label: "Insufficient knowledge",
    icon: (props: any) => <Ionicons name="book-outline" {...props} />,
  },
  {
    key: "time_managment",
    label: "Time management",
    icon: (props: any) => <Ionicons name="time-outline" {...props} />,
  },
  {
    key: "inconsistent_motivation",
    label: "Inconsistent motivation",
    icon: (props: any) => <Ionicons name="trending-down-outline" {...props} />,
  },
];

export default function GoalBarrierScreen() {
  const { darkMode } = useContext(ThemeContext);
  const { activeUser } = useContext(UserContext);
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [selected, setSelected] = useState<string>("");

  const router = useRouter();

  const handleContinue = () => {
    activeUser!.obstacle = selected;    
    router.push("../TrainingMethod");
  };

  return (
    <View style={styles.safe}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <View>
          <ReturnButton />
        </View>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>What’s been holding you back?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select the primary reason</Text>

          {reasons.map(({ key, label, icon: Icon }) => {
            const isSelected = selected === key;
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected ? colors.accent : colors.cardBg,
                    borderColor: isSelected ? colors.accent : colors.cardBorder,
                  },
                ]}
                onPress={() => setSelected(key)}
                activeOpacity={0.8}
              >
                <View style={styles.iconWrapper}>
                  <Icon size={24} color={isSelected ? colors.textPrimary : colors.textSecondary} />
                </View>
                <Text
                  style={[
                    styles.cardText,
                    {
                      color: isSelected ? colors.textPrimary : colors.textSecondary,
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
                backgroundColor: selected ? colors.accent : colors.cardBg,
                borderColor: selected ? colors.accent : colors.cardBorder,
              },
              !selected && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
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
