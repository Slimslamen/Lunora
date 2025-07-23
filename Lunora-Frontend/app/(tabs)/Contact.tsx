// ContactSupportScreen.tsx
import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  useColorScheme,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { Link } from 'expo-router'

export default function ContactSupportScreen() {
  const TContext = useContext(ThemeContext)
  const { darkMode } = TContext

  const scheme = useColorScheme()
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>Contact & Support</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>We are here to help</Text>

          {/* Contact Options */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
            <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
              <Ionicons name="mail-outline" size={24} color={colors.accent} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>support@yourappdomain.com</Text>
            </TouchableOpacity>
          </View>

          {/* FAQ Link */}
          <View style={[styles.card, styles.listCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Frequently Asked Questions</Text>
            <Link href={"./FAQ"} asChild>
              <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
                <Ionicons name="help-circle-outline" size={20} color={colors.textSecondary} />
                <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Visit our FAQ</Text>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Privacy Policy & Terms */}
          <View style={[styles.card, styles.listCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Legal</Text>
            <Link href={"./PrivacyPolicy"} asChild>
              <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
                <Ionicons name="document-text-outline" size={20} color={colors.textSecondary} />
                <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Privacy Policy</Text>
              </TouchableOpacity>
            </Link>
            <Link href={"./TermsOfService"} asChild>
              <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
                <Ionicons name="reader-outline" size={20} color={colors.textSecondary} />
                <Text style={[styles.rowLabel, { color: colors.textSecondary }]}>Terms of Service</Text>
              </TouchableOpacity>
            </Link>
          </View>
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
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  listCard: {
    paddingVertical: 12,
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  rowLabel: { marginLeft: 12, fontSize: 16 },
  sectionHeader: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
})
