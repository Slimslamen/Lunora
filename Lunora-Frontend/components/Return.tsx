// components/BackHeader.tsx
import React, { useContext } from "react";
import { View, TouchableOpacity, StyleSheet, Text, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";

export function ReturnButton({ title }: { title?: string }) {
  const { darkMode } = useContext(ThemeContext);
  const scheme = useColorScheme();
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const router = useRouter();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={30} color={colors.textPrimary} />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  title: {
    marginLeft: 12,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
