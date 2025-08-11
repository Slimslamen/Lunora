// FaqScreen.tsx
import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { Ionicons } from '@expo/vector-icons'

const FAQS = [
  {
    id: 'q1',
    question: 'How do I reset my password?',
    answer: 'Go to Settings → Account → Reset Password and follow the instructions emailed to you.',
  },
  {
    id: 'q2',
    question: 'Can I use the app offline?',
    answer: 'Yes! Most core workout features are available offline once you have synced at least once.',
  },
  {
    id: 'q3',
    question: 'How do I delete my account?',
    answer: 'To delete your account, navigate to Settings → Account → Delete Account. This will remove all personal data.',
  },
  {
    id: 'q4',
    question: 'Who do I contact for support?',
    answer: 'Email us anytime at support@yourappdomain.com or use the contact form in the Support screen.',
  },
]

export default function FaqScreen() {
  const { darkMode } = useContext(ThemeContext)

  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <View style={styles.safe}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Frequently Asked Questions</Text>
          {FAQS.map(item => (
            <View key={item.id} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
              <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.rowItem} activeOpacity={0.7}>
                <Text style={[styles.question, { color: colors.textPrimary }]}>{item.question}</Text>
                <Ionicons
                  name={openId === item.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
              {openId === item.id && (
                <Text style={[styles.answer, { color: colors.textSecondary }]}>{item.answer}</Text>
              )}
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  gradient: { flex: 1 },
  container: { padding: 16, paddingTop: 130, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 20 },

  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 16,
  },
  rowItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12 },
  question: { fontSize: 16, fontWeight: '600', flex: 1 },
  answer: { fontSize: 14, marginTop: 8, lineHeight: 20 },
})
