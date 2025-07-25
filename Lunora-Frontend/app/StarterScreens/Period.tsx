// LastPeriodScreen.tsx
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, StatusBar, Platform, TouchableOpacity, useColorScheme } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ReturnButton } from '../../components/Return'

export default function LastPeriodScreen() {
  const { darkMode } = useContext(ThemeContext);
  const scheme = useColorScheme();
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(Platform.OS === "ios");

  const onChange = (event: DateTimePickerEvent, selected?: Date) => {
    if (selected) setDate(selected);
    if (Platform.OS !== "ios") setShowPicker(false);
  };

  const router = useRouter();

  const handleContinue = () => {
    router.push("./Facts/Fact2");
  };

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === "dark" ? "light-content" : "dark-content"} />
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <View>
          <ReturnButton />
        </View>
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>When was your last period?</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Select the date of your last cycle</Text>

          {showPicker && (
            <View
              style={[
                styles.pickerCard,
                {
                  backgroundColor: colors.cardBg,
                  borderColor: colors.cardBorder,
                },
              ]}
            >
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
                style={styles.picker}
                textColor={colors.textPrimary}
                maximumDate={new Date()}
              />
            </View>
          )}

          {Platform.OS !== "ios" && !showPicker && (
            <TouchableOpacity
              style={[styles.showButton, { borderColor: colors.cardBorder }]}
              onPress={() => setShowPicker(true)}
            >
              <Text style={[styles.showText, { color: colors.accent }]}>Choose Date</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={handleContinue} style={[styles.button, { backgroundColor: colors.accent }]}>
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
  pickerCard: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 24,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },
  showButton: {
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  showText: {
    fontSize: 14,
    fontWeight: "600",
  },
  button: {
    width: "100%",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
