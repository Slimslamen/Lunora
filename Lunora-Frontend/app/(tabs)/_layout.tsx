// AppNavigator.tsx
import React, { useContext } from 'react'
import { Link, Tabs, useRouter } from 'expo-router'
import { Platform, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { BlurView } from 'expo-blur'
import { ThemeContext } from '@/Context/Theme/ThemeContext'

export default function TabLayout() {
  const TContext = useContext(ThemeContext)
  const { darkMode } = TContext
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS 
  const router = useRouter();
  
  const ToSettings = () => {
    router.push('./settings')
  }
  const ToProfile = () => {
    router.push('./profile')
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Overlay button visible on all tab screens */}
      <View style={[styles.overlay, {backgroundColor: colors.textPrimary}]}>
          <TouchableOpacity onPress={ToSettings} style={[{alignItems: 'center', justifyContent: 'center', display: 'flex',}]}>
            <Ionicons name="settings-outline" size={24} color={colors.accent} />
          </TouchableOpacity>
      </View>
       <View style={[styles.Secondoverlay, {backgroundColor: colors.textPrimary}]}>
          <TouchableOpacity onPress={ToProfile} style={[{alignItems: 'center', justifyContent: 'center', display: 'flex',}]}>
            <AntDesign name="user" size={24} color={colors.accent} />
          </TouchableOpacity>
      </View>

      {/* Tab navigator */}
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.textPrimary,
          tabBarInactiveTintColor: colors.accent,
          tabBarLabelStyle: { fontSize: 12, marginBottom: 0 },
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
              height: 70,
              backgroundColor: 'transparent',
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
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />

        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
          }}
        />

        <Tabs.Screen
          name="workouts"
          options={{
            title: 'Workouts',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="dumbbell" color={color} />,
          }}
        />

        <Tabs.Screen
          name="challenges"
          options={{
            title: 'Challenges',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="trophy" color={color} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            href: null
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            href: null
          }}
        />

        <Tabs.Screen
          name="PrivacyPolicy"
          options={{
            href: null
          }}
        />

        <Tabs.Screen
          name="Contact"
          options={{
            href: null
          }}
        />

        <Tabs.Screen
          name="FAQ"
          options={{
            href: null
          }}
        />

        <Tabs.Screen
          name="TermsOfService"
          options={{
            href: null
          }}
        />

        <Tabs.Screen
          name="PersonalInfo"
          options={{
            href: null
          }}
        />

        <Tabs.Screen
          name="FitnessGoals"
          options={{
            href: null
          }}
        />
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '8%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    left: 0,
    zIndex: 100,
    borderTopEndRadius: 10,
    borderBottomRightRadius: 10,
  },
  Secondoverlay: {
    position: 'absolute',
    top: '8%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    right: 0,
    zIndex: 100,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  }
})
