// ReferralScreen.tsx
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ReturnButton } from '../../components/Return'
import { UserContext } from "@/Context/User/UserContext";

export default function ReferralScreen() {
  const { darkMode } = useContext(ThemeContext);
  const { activeUser } = useContext(UserContext);

  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  const [referrerEmail, setReferrerEmail] = useState("");

  const router = useRouter();

  const handleContinue = (ref : string) => {
    if(ref === "no-referral")
      activeUser!.referral = "";
    else
      activeUser!.referral = referrerEmail;
    router.push("./Finding");
  };

  return (
    <View style={styles.safe}>
      <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.safe}>
        <View>
          <ReturnButton />
        </View>
        <View style={{ flex: 1 }}>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={80}
          >
            <View style={styles.container}>
              <Text style={[styles.title, { color: colors.textPrimary }]}>Referred by a friend?</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Enter their email to apply your discount
              </Text>

              <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                <TextInput
                  style={[styles.input, { color: colors.textPrimary, borderColor: colors.cardBorder }]}
                  placeholder="friend@example.com"
                  placeholderTextColor={colors.textSecondary}
                  value={referrerEmail}
                  onChangeText={setReferrerEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity
                onPress={() => handleContinue("")}
                style={[
                  styles.button,
                  {
                    backgroundColor: referrerEmail.trim() ? colors.accent : colors.cardBg,
                    borderColor: referrerEmail.trim() ? colors.accent : colors.cardBorder,
                  },
                  !referrerEmail.trim() && styles.buttonDisabled,
                ]}
                disabled={!referrerEmail.trim()}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: referrerEmail.trim() ? colors.textPrimary : colors.textSecondary,
                    },
                  ]}
                >
                  Apply Referral
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handleContinue("no-referral")}>
                <Text style={[styles.skipText, { color: colors.textSecondary }]}>I wasn’t referred</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 80,
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
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 40,
  },
  button: {
    width: "100%",
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  skipText: {
    fontSize: 14,
    textDecorationLine: "underline",
    marginTop: 8,
  },
});
