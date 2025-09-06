import { UserContext } from "@/Context/User/UserContext";
import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Easing,
} from "react-native";
import { Link, router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import { ThemeContext } from "@/Context/Theme/ThemeContext";

const WINDOW_HEIGHT = Dimensions.get("window").height;

export default function WelcomeScreen() {
  const { darkMode } = useContext(ThemeContext);
  const UContext = useContext(UserContext);
  const { loadedUser } = UContext;

  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS;

  // Login modal state/animation
  const [loginVisible, setLoginVisible] = useState(false);
  const slideY = useRef(new Animated.Value(WINDOW_HEIGHT)).current;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const openLogin = () => {
    setLoginVisible(true);
    // start below the screen
    slideY.setValue(WINDOW_HEIGHT);
    Animated.timing(slideY, {
      toValue: 0,
      duration: 320,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeLogin = () => {
    Animated.timing(slideY, {
      toValue: WINDOW_HEIGHT,
      duration: 260,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) setLoginVisible(false);
    });
  };

  const handleLogin = () => {
    // TODO: replace with real auth
    console.log("Login with", { email, password });
    router.push('./(tabs)/home');
    closeLogin();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/Lunora_background.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>
            <Link href={"./StarterScreens/UserFacts/userEmail"} asChild>
              <TouchableOpacity style={styles.getStartedBtn}>
                <Text style={styles.getStartedText}>Get started</Text>
              </TouchableOpacity>
            </Link>

            {/* Open full-screen slide-up modal */}
            <TouchableOpacity style={styles.loginBtn} onPress={openLogin}>
              <Text style={styles.loginText}>I already have an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Full-screen modal that slides up */}
      <Modal visible={loginVisible} transparent animationType="none" onRequestClose={closeLogin}>
        <Animated.View style={[styles.fullScreenSheet, { transform: [{ translateY: slideY }] }]}>
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.fullScreenSheet}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
              <View style={styles.sheetBody}>
                <View style={styles.sheetHeader}>
                  <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>Sign in</Text>
                  <TouchableOpacity onPress={closeLogin} style={styles.closeBtn}>
                    <Text style={[styles.closeText, { color: colors.textPrimary }]}>Close</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.inputRow}>
                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                    placeholderTextColor="#999"
                  />
                </View>

                <View style={styles.inputRow}>
                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    secureTextEntry
                    style={styles.input}
                    placeholderTextColor="#999"
                  />
                </View>

                <TouchableOpacity
                  onPress={handleLogin}
                  style={[styles.primaryBtn, !email || !password ? styles.primaryBtnDisabled : null]}
                  disabled={!email || !password}
                >
                  <Text style={styles.primaryBtnText}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </LinearGradient>
        </Animated.View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1, backgroundSize: "auto", backgroundRepeat: "no-repeat", justifyContent: "center" },
  overlay: { flex: 1, justifyContent: "flex-end", alignItems: "center", paddingHorizontal: 24 },
  buttonContainer: { marginBottom: 20, width: "100%" },

  getStartedBtn: {
    backgroundColor: "#d67f5a",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  getStartedText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  loginBtn: { borderColor: "#f5e6e6", borderWidth: 2, paddingVertical: 14, borderRadius: 14, alignItems: "center" },
  loginText: { color: "#fff", fontWeight: "600", fontSize: 16 },

  // Full-screen sliding sheet
  fullScreenSheet: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 20,
  },
  sheetHeader: {
    paddingBottom: 30,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sheetTitle: { fontSize: 20, fontWeight: "700" },
  closeBtn: { backgroundColor: "#d67f5a", paddingVertical: 8, paddingHorizontal: 8, borderRadius: 12, alignItems: "center", marginTop: 8 },
  closeText: { color: "#333", fontWeight: "600" },

  sheetBody: { paddingHorizontal: 20, paddingTop: 150 },
  inputRow: { marginBottom: 12 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    color: "#111",
  },

  primaryBtn: {
    backgroundColor: "#d67f5a",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  primaryBtnDisabled: { opacity: 0.6 },
  primaryBtnText: { color: "#fff", fontWeight: "600" },
});
