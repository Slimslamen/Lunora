// PreparingScreen.tsx
import React, { useState, useEffect, useContext, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const preparingItems = [
  'Generating your personalized plan',
  'Syncing workout library',
  'Configuring AI coach',
  'Applying your preferences',
]

// thresholds at which each icon starts spinning
const thresholds = [11, 32, 56, 82]
const ICON_SIZE = 18

export default function PreparingScreen() {
  const { darkMode } = useContext(ThemeContext)
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const [percent, setPercent] = useState(0)

    const router = useRouter();

    const handleContinue = () => {
    router.push('../(tabs)/home')
    }

  // one spin Animated.Value per item
  const spinAnims = useRef(
    preparingItems.map(() => new Animated.Value(0))
  ).current
  const started = useRef(preparingItems.map(() => false)).current

  // start spinning each icon when threshold met
  useEffect(() => {
    preparingItems.forEach((_, i) => {
      if (percent >= thresholds[i] && !started[i]) {
        started[i] = true
        Animated.loop(
          Animated.timing(spinAnims[i], {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          })
        ).start()
      }
    })
  }, [percent])

  // simulate loading steps
  useEffect(() => {
    let mounted = true
    const step = () => {
      if (!mounted) return
      const remaining = 100 - percent
      if (remaining <= 0) return setPercent(100)
      const inc = Math.min(remaining, Math.floor(Math.random() * 11) + 5)
      const delay = Math.random() * 700 + 300
      setTimeout(() => {
        if (!mounted) return
        setPercent(p => p + inc)
      }, delay)
    }
    step()
    return () => {
      mounted = false
    }
  }, [percent])

  return (
    <View style={styles.safe}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.safe}
      >
        <View style={styles.container}>
          <Text style={[styles.percent, { color: colors.textPrimary }]}>
            {percent}%
          </Text>
          <Text style={[styles.message, { color: colors.textSecondary }]}>
            We’re setting everything up for you in this moment
          </Text>

          <View style={[styles.barBackground, { backgroundColor: colors.cardBg }]}>
            <View
              style={[
                styles.barFill,
                { width: `${percent}%`, backgroundColor: colors.accent },
              ]}
            />
          </View>

          <View
            style={[
              styles.card,
              { backgroundColor: colors.cardBg, borderColor: colors.cardBorder },
            ]}
          >
            {preparingItems.map((item, i) => {
              const spin = spinAnims[i].interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              })
              const done = percent >= thresholds[i]
              return (
                <View key={i} style={styles.pointRow}>
                  <Animated.View
                    style={[
                      styles.syncIconContainer,
                      { transform: [{ rotate: spin }] },
                    ]}
                  >
                    <Ionicons
                      name="sync-outline"
                      size={ICON_SIZE}
                      color={done ? colors.checks : colors.textSecondary}
                    />
                  </Animated.View>
                  <Text style={[styles.pointText, { color: colors.textSecondary }]}>
                    {item}
                  </Text>
                </View>
              )
            })}
          </View>

            <TouchableOpacity
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={percent < 100}
              style={[
                styles.button,
                {
                  backgroundColor:
                    percent === 100 ? colors.accent : colors.cardBg,
                  borderColor:
                    percent === 100 ? colors.accent : colors.cardBorder,
                },
                percent < 100 && styles.buttonDisabled,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  {
                    color:
                      percent === 100
                        ? colors.textPrimary
                        : colors.textSecondary,
                  },
                ]}
              >
                Get Started
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
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percent: {
    fontSize: 48,
    fontWeight: '700',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  barBackground: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 24,
  },
  barFill: { height: '100%' },
  card: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 32,
  },
  pointRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  syncIconContainer: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  pointText: {
    fontSize: 14,
    lineHeight: 20,
    flexShrink: 1,
  },
  button: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, fontWeight: '600' },
  buttonDisabled: { opacity: 0.6 },
})
