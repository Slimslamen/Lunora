// PersonalInfoScreen.tsx
import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'

export default function PersonalInfoScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const handleSave = () => {
    // TODO: save updated info
  }

  const handleRestorePassword = () => {
    // TODO: trigger password reset flow
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.safe}
      >
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Personal Information</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Update your account details</Text>
          {/* Full Name */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              Full Name
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  color: colors.textPrimary, 
                  borderColor: colors.cardBorder, 
                  backgroundColor: colors.cardBg 
                }
              ]}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textSecondary}
              value={fullName}
              onChangeText={setFullName}
            />
          </View>

          {/* Username */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              Username
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  color: colors.textPrimary, 
                  borderColor: colors.cardBorder, 
                  backgroundColor: colors.cardBg 
                }
              ]}
              placeholder="Choose a username"
              placeholderTextColor={colors.textSecondary}
              value={username}
              onChangeText={setUsername}
            />
          </View>

          {/* Email */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              Email
            </Text>
            <TextInput
              style={[
                styles.input,
                { 
                  color: colors.textPrimary, 
                  borderColor: colors.cardBorder, 
                  backgroundColor: colors.cardBg 
                }
              ]}
              placeholder="you@example.com"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Save Changes */}
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.accent }]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>

          {/* Restore Password */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              Password
            </Text>
            <TouchableOpacity
              style={[styles.restoreButton, { borderColor: colors.accent }]}
              onPress={handleRestorePassword}
            >
              <Text style={[styles.restoreText, { color: colors.accent }]}>
                Restore Password
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    padding: 16,
    paddingTop: 60,
    paddingBottom: 80, // leave space for tab bar
  },
    title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
    subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  restoreButton: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  restoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
})
