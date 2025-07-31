// FitnessGoalsScreen.tsx
import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import Feather from '@expo/vector-icons/Feather';
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/Theme/ThemeContext'

// Define goals (could be fetched from API in real app)
const goals = [
  { id: 'streak', icon: <FontAwesome5 name="fire" size={20} />, title: '7-Day Streak Master', achieved: false },
  { id: 'cardio', icon: <Ionicons name="heart" size={20} />, title: 'Cardio Champion', achieved: false },
  { id: 'early', icon: <Feather name="sunrise" size={18} />, title: 'Early Bird', achieved: true },
  { id: 'first', icon: <Ionicons name="walk" size={20} />, title: 'First Workout', achieved: true },
]

export default function FitnessGoalsScreen() {
  const { darkMode } = useContext(ThemeContext)
  const scheme = useColorScheme()
  const colors = darkMode ? DARK_COLORS : LIGHT_COLORS

  // Separate into pending and completed
  const pending = goals.filter(g => !g.achieved)
  const completed = goals.filter(g => g.achieved)

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={[styles.title, { color: colors.textPrimary }]}>Your Fitness Goals</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                      Push your limits and earn rewards
            </Text>

          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Pending Goals</Text>
          {pending.map(goal => (
            <View key={goal.id} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
              <View style={styles.rowItem}>
                <View style={styles.iconWrapper}>
                  {React.cloneElement(goal.icon, { color: colors.accent })}
                </View>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>{goal.title}</Text>
              </View>
            </View>
          ))}

          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Completed Goals</Text>
          {completed.map(goal => (
            <View key={goal.id} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
              <View style={styles.rowItem}>
                <View style={styles.iconWrapper}>
                  {React.cloneElement(goal.icon, { color: colors.accent })}
                </View>
                <Text style={[styles.rowLabel, { color: colors.textSecondary, textDecorationLine: 'line-through' }]}>{goal.title}</Text>
                <Ionicons name="checkmark-circle" size={20} color={colors.checks} />
              </View>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  gradient: { flex: 1 },
  container: { padding: 16, paddingTop: 60, paddingBottom: 80 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 12 },

  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
  },
  rowItem: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: { width: 30, alignItems: 'center', marginRight: 12 },
  rowLabel: { flex: 1, fontSize: 16 },
})
