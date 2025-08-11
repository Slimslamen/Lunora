// LoadingScreen.tsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Animated,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/Theme/ThemeContext';
import { UserContext } from '@/Context/User/UserContext';
import { useRouter } from 'expo-router';

export default function LoadingScreen() {
  const TContext = useContext(ThemeContext);
  const { darkMode } = TContext;

  const UContext = useContext(UserContext);
  const { loadedUser } = UContext;

  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS;

  const router = useRouter();

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


  useEffect(() => {
    if(loadedUser){
      router.push('./(tabs)/home')
    }
  }, [loadedUser])
  
  return (
    <View style={styles.safe}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.safe}
      >
        <View style={styles.container}>
          <Text style={[styles.label, { color: colors.textPrimary }]}>
            Loading
          </Text>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 6,
    marginTop: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 8,
    marginHorizontal: 2,
  },
  label: {
    fontSize: 30,
    fontWeight: '500',
  },
})
