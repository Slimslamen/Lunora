// Fact3Screen.tsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  useColorScheme,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window')
const fact =
  '💧 Fun Fact: Your water needs rise ~300ml per day during your period — stay hydrated for peak performance!'

export default function Fact3Screen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  const router = useRouter();
      
    const handleContinue = () => {
    router.push('../ProgramDescription')
    }

  // Ripple animation circles
  const rippleAnim0 = useRef(new Animated.Value(0))
  const rippleAnim1 = useRef(new Animated.Value(0))
  const rippleAnim2 = useRef(new Animated.Value(0))
  const rippleAnim3 = useRef(new Animated.Value(0))
  const rippleAnims = [rippleAnim0.current, rippleAnim1.current, rippleAnim2.current, rippleAnim3.current]

  useEffect(() => {
    rippleAnims.forEach((anim, i) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 500),
          Animated.timing(anim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 2,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start()
    })
  }, [])

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.safe}
      >
        {rippleAnims.map((anim, i) => {
          const size = width * (0.3 + i * 0.1)
          return (
            <Animated.View
              key={i}
              style={[
                styles.ripple,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  borderColor: colors.accent,
                  opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0, 0.2] }),
                  transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }],
                },
              ]}
            />
          )
        })}

        <View style={styles.container}>
          <Text style={[styles.factText, { color: colors.textPrimary }]}>
            {fact}
          </Text>

          <TouchableOpacity activeOpacity={0.8}>
            <Animated.View style={[styles.button, { backgroundColor: colors.accent, borderColor: colors.accent }]}>
              <TouchableOpacity onPress={handleContinue}>
                <Text style={styles.buttonText}>Let’s Go!</Text>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ripple: { position: 'absolute', borderWidth: 2 },
  container: { paddingHorizontal: 24, zIndex: 1, alignItems: 'center' },
  factText: { fontSize: 20, lineHeight: 28, fontWeight: '500', textAlign: 'center', marginBottom: 40 },
  button: { width: '100%', marginTop: 24, borderRadius: 14, borderWidth: 1, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600', paddingHorizontal: 14 },
})
