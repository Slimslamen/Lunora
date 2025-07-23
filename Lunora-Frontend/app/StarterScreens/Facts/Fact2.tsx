// Fact2Screen.tsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  Easing,
  useColorScheme,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')
const fact =
  '📊 Fun Fact: Estrogen peaks pre-ovulation and can boost strength by ~5%—perfect time for a power session!'
const ICON_COUNT = 6
const ORBIT_SIZE = width * 0.7
const ORBIT_RADIUS = ORBIT_SIZE / 2 - 20  // leave room for icon

export default function Fact2Screen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const router = useRouter();
    
    const handleContinue = () => {
    router.push('../WorkoutFrequency')
    }

  // Text pop-in animation
  const scaleAnim = useRef(new Animated.Value(0.5)).current
  // Orbit rotation animation
  const rotateAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // scale the text into view
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 50,
      useNativeDriver: true,
    }).start()

    // continuous rotation
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  // interpolate to degrees
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })
   const Minusrotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-0deg', '-360deg'],
  })

  // precalc icon angles
  const angles = Array.from({ length: ICON_COUNT }, (_, i) => (2 * Math.PI * i) / ICON_COUNT)

  return (
    <View style={styles.safe}>
      <StatusBar
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.safe}
      >
        {/* Orbiting dumbbells */}
        <Animated.View
          style={[
            styles.firstOrbit,
            {
              width: ORBIT_SIZE * 1.2,
              height: ORBIT_SIZE * 1.2,
              transform: [{ rotate: rotation }],
            },
          ]}
        >
          {angles.map((angle, i) => {
            const x = ORBIT_RADIUS + ORBIT_RADIUS * Math.cos(angle)
            const y = ORBIT_RADIUS + ORBIT_RADIUS * Math.sin(angle)
            return (
              <View
                key={i}
                style={[styles.icon, { top: y, left: x }]}
              >
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={24}
                  color={colors.accent}
                />
              </View>
            )
          })}
        </Animated.View>
         <Animated.View
          style={[
            styles.secondOrbit,
            {
              width: ORBIT_SIZE * 1.2,
              height: ORBIT_SIZE * 1.2,
              transform: [{ rotate: Minusrotation }],
            },
          ]}
        >
          {angles.map((angle, i) => {
            const x = ORBIT_RADIUS + ORBIT_RADIUS * Math.cos(angle)
            const y = ORBIT_RADIUS + ORBIT_RADIUS * Math.sin(angle)
            return (
              <View
                key={i}
                style={[styles.icon, { top: y, left: x }]}
              >
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={24}
                  color={colors.accent}
                />
              </View>
            )
          })}
        </Animated.View>
        {/* Content */}
        <View style={styles.container}>
          <Animated.Text
            style={[
              styles.factText,
              {
                color: colors.textPrimary,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {fact}
          </Animated.Text>

          <TouchableOpacity activeOpacity={0.8}>
            <View
              style={[
                styles.button,
                {
                  backgroundColor: colors.accent,
                  borderColor: colors.accent,
                },
              ]}
            >
              <TouchableOpacity onPress={handleContinue}>
                <Text style={styles.buttonText}>Let’s keep going!</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  firstOrbit: {
    position: 'absolute',
    top: (height - ORBIT_SIZE) / 2,
    left: (width - ORBIT_SIZE) / 2,
  },
  secondOrbit: {
    position: 'absolute',
    top: (height - ORBIT_SIZE) / 3,
    left: (width - ORBIT_SIZE) / 3,
  },
  icon: {
    position: 'absolute',
    marginLeft: -12,  // center the icon (half its width)
    marginTop: -12,   // center the icon (half its height)
  },
  container: {
    paddingHorizontal: 24,
    zIndex: 1,
    alignItems: 'center',
  },
  factText: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 40,
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
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingHorizontal: 14
  },
})
