// FeaturesScreen.tsx
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
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'

const features = [
  'Specialized weekly schemes based on your menstrual phase',
  'AI–powered chat coach for instant guidance',
  'Personalized workout library with favorites',
  'In-depth progress tracking (weekly & monthly)',
  'Challenges to keep you motivated',
]

export default function FeaturesScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

    const router = useRouter();
        
        const handleContinue = () => {
        router.push('./Preparing')
        }

  return (
    <View style={styles.safe}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.safe}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            What You’ll Get With Us
          </Text>
          <View
            style={[
              styles.card,
              { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
            ]}
          >
            {features.map((item, i) => (
              <View key={i} style={styles.listItem}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={20}
                  color={colors.checks}
                  style={styles.icon}
                />
                <Text style={[styles.listText, { color: colors.textPrimary }]}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
            <TouchableOpacity
                style={[
                styles.button,
                { backgroundColor: colors.accent },
                ]}
                onPress={handleContinue}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
   button: {
    marginTop: 24,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
   buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  icon: {
    marginTop: 2,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
})
