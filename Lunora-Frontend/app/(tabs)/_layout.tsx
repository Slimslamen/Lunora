// AppNavigator.tsx
import React from 'react'
import { Tabs } from 'expo-router'
import { Platform } from 'react-native'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { useColorScheme } from '@/hooks/useColorScheme'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { BlurView } from 'expo-blur'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const colors = colorScheme === 'dark' ? DARK_COLORS : LIGHT_COLORS

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 0 },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 70,
          },
          default: {
            height: 64,
          },
        }),
           tabBarBackground: () => (
        <BlurView
          intensity={0}
          style={{ flex: 1 }}
        />
      ),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="bar-chart" color={color} />,
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
          title: 'Profile',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person" color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="settings" color={color} />,
        }}
      />
    </Tabs>
  )
}
