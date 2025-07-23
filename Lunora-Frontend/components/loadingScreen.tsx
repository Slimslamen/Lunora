// LoadingScreen.tsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/Theme/ThemeContext';

export default function LoadingScreen() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const scheme = useColorScheme();
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;


  // Create three animated values for the bouncing dots
  const dot1 = useRef(new Animated.Value(0))
  const dot2 = useRef(new Animated.Value(0))
  const dot3 = useRef(new Animated.Value(0))
  const dots = [dot1.current, dot2.current, dot3.current]

  useEffect(() => {
    // For each dot, start a looping up-down animation with staggered delay
    dots.forEach((anim, idx) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(idx * 200),
          Animated.timing(anim, {
            toValue: -12,           // move up by 12px
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,             // back to baseline
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.delay((dots.length - idx) * 100),
        ])
      ).start()
    })
  }, [])

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
          <View style={styles.dotsRow}>
            {dots.map((anim, i) => (
              <Animated.View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: colors.accent,
                    transform: [{ translateY: anim }],
                  },
                ]}
              />
            ))}
          </View>
          <Text style={[styles.label, { color: colors.textSecondary }]}>
            Loading…
          </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 24,
    marginBottom: 16,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
})
