// AskNameScreen.tsx
import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '@/Context/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'

export default function AskNameScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const [name, setName] = useState('')
  const router = useRouter();

  const handleContinue = () => {
    router.push('./Born')
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
        <View style={styles.container}>
          {/* Prompt */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            What’s your name?
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Tell us how to address you
          </Text>

          {/* Input Card */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <TextInput
              style={[
                styles.input,
                {
                  color: colors.textPrimary,
                  borderColor: colors.cardBorder,
                },
              ]}
              placeholder="Your name"
              placeholderTextColor={colors.textSecondary}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Continue Button */}
          
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.accent },
              !name.trim() && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!name.trim()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  input: {
    fontSize: 16,
    height: 40,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
