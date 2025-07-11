// TermsOfServiceScreen.tsx
import React, { useContext } from 'react'
import { View, Text, ScrollView, StyleSheet, useColorScheme, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/ThemeContext'

export default function TermsOfServiceScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Terms of Service</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary, textAlign: 'center' }]}>Last updated: July 2025</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>1. Acceptance of Terms</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>By accessing or using this app, you agree to be bound by these Terms of Service and our Privacy Policy.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>2. User Accounts</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>Users must register for an account to use certain features. You are responsible for maintaining the security of your account credentials.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>3. App Usage</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>You agree to use the app only for lawful purposes and in accordance with these terms. Prohibited activities include:</Text>
          <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Unauthorized access or use of data</Text>
          <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Reverse engineering or modifying the app</Text>
          <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Violating applicable laws or regulations</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>4. Intellectual Property</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>All content, trademarks, and data provided in the app remain the property of their respective owners. You may not reproduce or distribute any part of the app without permission.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>5. Termination</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>We may suspend or terminate your access at any time for violations of these terms or for any other reason, without notice.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>6. Disclaimer of Warranties</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>The app is provided "as is" and "as available" without warranties of any kind. We disclaim all representations and warranties.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>7. Limitation of Liability</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>In no event shall we be liable for any indirect, incidental, or consequential damages arising from your use of the app.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>8. Changes to Terms</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>We reserve the right to modify these Terms at any time. Continued use after changes constitutes acceptance.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>9. Governing Law</Text>
          <Text style={[styles.paragraph, { color: colors.textSecondary }]}>These Terms are governed by the laws of your country of residence.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>10. Contact</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>For questions, please email support@yourappdomain.com</Text>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  gradient: { flex: 1 },
  container: { padding: 16, paddingTop: 60, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  paragraph: { fontSize: 14, marginBottom: 12, lineHeight: 20 },
  heading: { fontSize: 16, fontWeight: '600', marginTop: 16, marginBottom: 4 },
  listItem: { fontSize: 14, marginLeft: 12, marginBottom: 4 },
})
