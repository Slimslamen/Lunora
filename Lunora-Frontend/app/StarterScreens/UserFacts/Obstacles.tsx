// GoalBarrierScreen.tsx
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
import { ThemeContext } from '@/Context/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const reasons = [
  {
    key: 'insufficient_knowledge',
    label: 'Insufficient knowledge',
    icon: (props: any) => <Ionicons name="book-outline" {...props} />,
  },
  {
    key: 'lack_of_time',
    label: 'Lack of time',
    icon: (props: any) => <Ionicons name="time-outline" {...props} />,
  },
  {
    key: 'inconsistent_motivation',
    label: 'Inconsistent motivation',
    icon: (props: any) => <Ionicons name="trending-down-outline" {...props} />,
  },
  {
    key: 'physical_constraints',
    label: 'Physical constraints',
    icon: (props: any) => <Ionicons name="bandage-outline" {...props} />,
  },
]

export default function GoalBarrierScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const [selected, setSelected] = useState<string | null>(null)

  const router = useRouter();

  const handleContinue = () => {
    router.push('../Facts/Fact1')
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
            What’s been holding you back?
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Select the primary reason
          </Text>

          {reasons.map(({ key, label, icon: Icon }) => {
            const isSelected = selected === key
            return (
              <TouchableOpacity
                key={key}
                style={[
                  styles.card,
                  {
                    backgroundColor: isSelected
                      ? colors.accent
                      : colors.cardBg,
                    borderColor: isSelected
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
                      isSelected
                        ? colors.textPrimary
                        : colors.textSecondary
                    }
                  />
                </View>
                <Text
                  style={[
                    styles.cardText,
                    {
                      color: isSelected
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
            onPress={handleContinue}
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
  safe: { flex: 1 },
  container: {
    flex: 1,
    width: '100%',
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
