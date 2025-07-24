// MenstrualFactScreen.tsx
import React, { useEffect, useRef, useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Animated,
  useColorScheme,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { Link, useRouter } from 'expo-router'
import { ReturnButton } from '../../../components/Return'

const { width, height } = Dimensions.get('window')
const fact =
  '💡 Fun Fact: During your luteal phase, metabolism can jump 10%—think of it like a 🔥 furnace!'

export default function MenstrualFactScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

    const router = useRouter();
  
    const handleContinue = () => {
      router.push('../UserFacts/Obstacles')
    }

  const slideAnim = useRef(new Animated.Value(-width)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const buttonScale = useRef(new Animated.Value(1)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ]).start()
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
        <TouchableOpacity style={{top:-260, left:-150}}>
          <ReturnButton />
        </TouchableOpacity>
        {/* Animated background circles */}
        {[...Array(5)].map((_, i) => {
          const size = 60 + Math.random() * 100
          const left = Math.random() * (width - size)
          return (
            <Animated.View
              key={i}
              style={[
                styles.circle,
                {
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  left,
                  backgroundColor: colors.accent,
                  opacity: 0.1 + Math.random() * 0.1,
                  top: -size,
                  transform: [
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [-width, 0],
                        outputRange: [0, height + size],
                      }),
                    },
                  ],
                },
              ]}
            />
          )
        })}

        <View style={styles.container}>
          <Animated.Text
            style={[
              styles.factText,
              {
                color: colors.textPrimary,
                transform: [{ translateX: slideAnim }],
                opacity: fadeAnim,
              },
            ]}
          >
            {fact}
          </Animated.Text>

          <TouchableWithoutFeedback
            onPressIn={() =>
              Animated.spring(buttonScale, {
                toValue: 0.95,
                useNativeDriver: true,
              }).start()
            }
            onPressOut={() =>
              Animated.spring(buttonScale, {
                toValue: 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
              }).start()
            }
          >
              <TouchableOpacity
                    style={[styles.button,{ backgroundColor: colors.accent, borderColor: colors.accent }]}
                    onPress={handleContinue}
                >
                    <Text
                    style={[
                        styles.buttonText,
                        { color: colors.textPrimary },
                    ]}
                    >
                    Good to know! What’s next?
                    </Text>
                </TouchableOpacity>
          </TouchableWithoutFeedback>
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
  circle: {
    position: 'absolute',
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
    paddingHorizontal: 14,
    
  },
})
