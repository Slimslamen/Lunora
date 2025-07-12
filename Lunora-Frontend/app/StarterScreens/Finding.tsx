// DiscoverySourceScreen.tsx
import React, { useState, useContext } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, useRouter } from 'expo-router'
import { ThemeContext } from '@/Context/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const sources = [
  {
    key: 'instagram',
    label: 'Instagram',
    icon: (props: any) => <FontAwesome name="instagram" {...props} />,
  },
  {
    key: 'facebook',
    label: 'Facebook',
    icon: (props: any) => <FontAwesome name="facebook" {...props} />,
  },
  {
    key: 'app_store',
    label: 'App Store',
    icon: (props: any) => <Ionicons name="logo-apple" {...props} />,
  },
  {
    key: 'other',
    label: 'Other',
    icon: (props: any) => <Ionicons name="ellipsis-horizontal" {...props} />,
  },
]

export default function DiscoverySourceScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const [selected, setSelected] = useState<string | null>(null)

  const router = useRouter();

    const handleContinue = () => {
        
        router.push('./Facts/Fact3')
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
        <View style={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Where did you find us?
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Help us understand how you discovered our app
          </Text>

          {sources.map(({ key, label, icon: Icon }) => {
            const isActive = selected === key
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.card,
                  {
                    backgroundColor: isActive
                      ? colors.accent
                      : colors.cardBg,
                    borderColor: isActive
                      ? colors.accent
                      : colors.cardBorder,
                  },
                ]}
                onPress={() => setSelected(key)}
                activeOpacity={0.8}
              >
                <View style={styles.iconWrapper}>
                  <Icon
                    size={24}
                    color={
                      isActive
                        ? colors.textPrimary
                        : colors.textSecondary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.cardText,
                    {
                      color: isActive
                        ? colors.textPrimary
                        : colors.textSecondary,
                    },
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            )
          })}

            <TouchableOpacity
              onPress={handleContinue}
              style={[
                styles.button,
                {
                  backgroundColor: selected
                    ? colors.accent
                    : colors.cardBg,
                  borderColor: selected
                    ? colors.accent
                    : colors.cardBorder,
                },
                !selected && styles.buttonDisabled,
              ]}
              disabled={!selected}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color: selected
                      ? colors.textPrimary
                      : colors.textSecondary,
                  },
                ]}
              >
                Continue
              </Text>
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
    width: '100%',
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
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
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  iconWrapper: {
    width: 32,
    alignItems: 'center',
    marginRight: 12,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    marginTop: 24,
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
})
