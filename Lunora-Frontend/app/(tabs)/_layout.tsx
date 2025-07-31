// AppNavigator.tsx
import React, { useContext, useEffect, useState } from "react";
import { Tabs, useRouter } from "expo-router";
import { Platform, View, StyleSheet, TouchableOpacity, Text, Pressable, Modal } from "react-native";
import { DARK_COLORS, LIGHT_COLORS } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BlurView } from "expo-blur";
import { ThemeContext } from "@/Context/Theme/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/api";
import { ICycleFact } from "@/General-Interfaces/ICycleFacts";

const client = generateClient<Schema>();

export default function TabLayout() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;
  const router = useRouter();

  const [showFactBox, setShowFactBox] = useState(false);
  const [cycleFacts, setcycleFacts] = useState<ICycleFact>()

  const ToSettings = () => {
    router.push("./settings");
  };
  const ToProfile = () => {
    router.push("./profile");
  };
  const showFacts = () => {
    setShowFactBox(true);
  };

  useEffect(() => {
    const fetchCycleFacts = async () => {
      const { data: fetchedCycleFacts, errors } = await client.models.PeriodFacts.list();
      if (errors) {
        console.error(errors);
        return;
      }

      if (Array.isArray(fetchedCycleFacts)) {
        const randomIndex = Math.floor(Math.random() * fetchedCycleFacts.length);
        const randomFact = fetchedCycleFacts[randomIndex];

        // Convert nullable properties to required strings for ICycleFact
        const cycleFact: ICycleFact = {
          ...randomFact,
          fact: randomFact.fact || '',
          phase: randomFact.phase || '',
          createdAt: randomFact.createdAt || '',
          updatedAt: randomFact.updatedAt || ''
        };

        setcycleFacts(cycleFact)
      }
    };

    fetchCycleFacts();
  }, [showFactBox]);

  return (
    <View style={{ flex: 1 }}>
      {/* Overlay button visible on all tab screens */}
      <View style={[styles.overlay, { backgroundColor: colors.textPrimary }]}>
        <TouchableOpacity
          onPress={ToSettings}
          style={[{ alignItems: "center", justifyContent: "center", display: "flex" }]}
        >
          <Ionicons name="settings-outline" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>
      <View style={[styles.Secondoverlay, { backgroundColor: colors.textPrimary }]}>
        <TouchableOpacity
          onPress={ToProfile}
          style={[{ alignItems: "center", justifyContent: "center", display: "flex" }]}
        >
          <AntDesign name="user" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <View style={[styles.Thirdoverlay, { backgroundColor: colors.textPrimary }]}>
        <TouchableOpacity
          onPress={showFacts}
          style={{ alignItems: "center", justifyContent: "center", display: "flex" }}
        >
          <FontAwesome6 name="lightbulb" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <Modal visible={!!showFactBox} transparent animationType="fade" onRequestClose={() => setShowFactBox(false)}>
        <View style={styles.modalOverlay}>
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setShowFactBox(false)}>
                <Ionicons name="close" size={24} color={colors.textSecondary} />
              </Pressable>
            </View>
            <View style={styles.modalMeta}>
              <View style={styles.modalContainer}>
                <Text style={[styles.modalTitle, { color: colors.textPrimary, textAlign: 'center', marginBottom: 5 }]}>{cycleFacts?.phase}</Text>
                <Text style={[styles.modalText, { color: colors.textPrimary, textAlign: 'center' }]}>{cycleFacts?.fact}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
      </Modal>

      {/* Tab navigator */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.textPrimary,
          tabBarInactiveTintColor: colors.accent,
          tabBarLabelStyle: { fontSize: 12, marginBottom: 0 },
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              height: 70,
              backgroundColor: "transparent",
              elevation: 0,
              shadowOpacity: 0,
            },
            default: {
              height: 64,
            },
          }),
          tabBarBackground: () => <BlurView intensity={10} style={{ flex: 1 }} />,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <Ionicons name="home-sharp" size={22} color={color} />,
          }}
        />

        <Tabs.Screen
          name="progress"
          options={{
            title: "Progress",
            tabBarIcon: ({ color }) => <FontAwesome5 name="calendar-alt" size={22} color={color} />,
          }}
        />

        <Tabs.Screen
          name="aiChat"
          options={{
            title: "LunorAI",
            tabBarIcon: ({ color }) => <Ionicons name="moon-sharp" size={22} color={color} />,
          }}
        />

        <Tabs.Screen
          name="workouts"
          options={{
            title: "Workouts",
            tabBarIcon: ({ color }) => <FontAwesome6 name="dumbbell" size={22} color={color} />,
          }}
        />

        <Tabs.Screen
          name="challenges"
          options={{
            title: "Challenges",
            tabBarIcon: ({ color }) => <FontAwesome6 name="trophy" size={22} color={color} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="PrivacyPolicy"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="Contact"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="FAQ"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="TermsOfService"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="PersonalInfo"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="FitnessGoals"
          options={{
            href: null,
          }}
        />

        <Tabs.Screen
          name="DetailedWorkout"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: "8%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    left: 0,
    zIndex: 100,
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
  },
  Secondoverlay: {
    position: "absolute",
    top: "8%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    right: 0,
    zIndex: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  Thirdoverlay: {
    position: "absolute",
    top: "40%",
    paddingVertical: 10,
    paddingHorizontal: 5,
    right: 0,
    zIndex: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  modalTitle: { fontSize: 18, fontWeight: "700", textAlign: "center" },
  modalMeta: {
    flexDirection: "column",
    marginBottom: 12,
    justifyContent: "space-between",
  },
  modalContainer: {
    marginTop: 20,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  modalText: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
});
