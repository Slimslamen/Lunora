// AskNameScreen.tsx
import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { ReturnButton } from '../../../components/Return'
import { UserContext } from '@/Context/User/UserContext'

export default function AskNameScreen() {
  const { darkMode } = useContext(ThemeContext)
  const { activeUser } = useContext(UserContext)
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const [email, setEmail] = useState('')
  const router = useRouter();

  const handleContinue = () => {
    if (activeUser) {
      activeUser.email = email;
    }
    router.push('./NameScreen')
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.safe}
      >
      <View>
        <ReturnButton />
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={20}
      >
        <View style={styles.container}>
          {/* Prompt */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            What’s your email?
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
              placeholder="Your email"
              placeholderTextColor={colors.textSecondary}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Continue Button */}
          
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: colors.accent },
              !email.trim() && styles.buttonDisabled,
            ]}
            onPress={handleContinue}
            disabled={!email.trim()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
