// ProfileDetailedScreen.tsx
import React, { useContext } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/ThemeContext'


const metrics = [
  {
    key: 'workouts',
    icon: <Ionicons name="bar-chart" size={24} />,
    value: '47',
    label: 'Workouts Completed',
  },
  {
    key: 'days',
    icon: <Ionicons name="calendar-outline" size={24} />,
    value: '23',
    label: 'Days Active',
  },
  {
    key: 'badges',
    icon: <Ionicons name="ribbon-outline" size={24} />,
    value: '8',
    label: 'Badges Earned',
  },
  {
    key: 'streak',
    icon: <FontAwesome5 name="fire" size={24} />,
    value: '7',
    label: 'Current Streak',
  },
]

const achievements = [
  {
    key: 'first',
    icon: <Ionicons name="walk" size={32} />,
    title: 'First Workout',
    unlocked: true,
  },
  {
    key: 'strength',
    icon: <MaterialCommunityIcons name="dumbbell" size={32} />,
    title: 'Strength Builder',
    unlocked: false,
  },
  {
    key: 'week',
    icon: <FontAwesome5 name="rocket" size={32} />,
    title: 'Week Warrior',
    unlocked: true,
  },
  {
    key: 'yoga',
    icon: <MaterialCommunityIcons name="yoga" size={32} />,
    title: 'Yoga Zen',
    unlocked: false,
  },
  {
    key: 'cardio',
    icon: <Ionicons name="heart" size={32} />,
    title: 'Cardio Master',
    unlocked: true,
  },
  {
    key: 'hiit',
    icon: <FontAwesome5 name="fire" size={32} />,
    title: 'HIIT Champion',
    unlocked: false,
  },
]

const records = [
  {
    key: 'longest',
    title: 'Longest Workout',
    subtitle: 'Last week',
    value: '1h 15min',
  },
  {
    key: 'calories',
    title: 'Most Calories Burned',
    subtitle: '2 weeks ago',
    value: '650 cal',
  },
  {
    key: 'bestStreak',
    title: 'Best Weekly Streak',
    subtitle: 'This week',
    value: '7 days',
  },
]

const daysOfWeek = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']

export default function ProfileDetailedScreen() {
  const TContext = useContext(ThemeContext)
  const { darkMode } = TContext
  
  const scheme = useColorScheme()
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS 

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === 'light' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView style={{marginBottom: 20 }} contentContainerStyle={styles.container}>
          {/* Header */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <View style={styles.center}>
              <View style={[styles.avatar, { backgroundColor: colors.cardBorder + '50' }]}>
                <Ionicons name="person" size={40} color={colors.textPrimary} />
                <TouchableOpacity style={styles.editIcon}>
                  <Ionicons name="pencil" size={16} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
              <Text style={[styles.name, { color: colors.textPrimary }]}>Alex Johnson</Text>
              <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                Fitness Enthusiast
              </Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.button, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { borderColor: colors.cardBorder }]}>
                  <Text style={[styles.buttonText, { color: colors.textPrimary }]}>Share Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Metrics */}
          <View style={[styles.metricsRow, styles.row]}>
            {metrics.map(m => (
              <View key={m.key} style={[styles.metricCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
                {React.cloneElement(m.icon, { color: colors.textPrimary })}
                <Text style={[styles.metricValue, { color: colors.textPrimary }]}>{m.value}</Text>
                <Text style={[styles.metricLabel, { color: colors.textSecondary }]}>{m.label}</Text>
              </View>
            ))}
          </View>

          {/* Achievements */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Achievements</Text>
            <View style={[styles.row, { flexWrap: 'wrap', justifyContent: 'center' }]}>
              {achievements.map(a => (
                <View key={a.key} style={styles.achCol}>
                  <View style={[
                      styles.achCircle,
                      { backgroundColor: a.unlocked ? colors.accent : colors.cardBorder }
                    ]}>
                    {React.cloneElement(a.icon, { color: a.unlocked ? '#fff' : colors.textSecondary })}
                  </View>
                  <Text
                    style={[
                      styles.achText,
                      { color: a.unlocked ? colors.textPrimary : colors.textSecondary }
                    ]}
                  >
                    {a.title}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Personal Records */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>Personal Records</Text>
            {records.map(r => (
              <View key={r.key} style={styles.recordRow}>
                <View>
                  <Text style={[styles.recordTitle, { color: colors.textPrimary }]}>{r.title}</Text>
                  <Text style={[styles.recordSubtitle, { color: colors.textSecondary }]}>{r.subtitle}</Text>
                </View>
                <Text style={[styles.recordValue, { color: colors.textPrimary }]}>{r.value}</Text>
              </View>
            ))}
          </View>

          {/* This Week's Activity */}
          <View style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              This Weeks Activity
            </Text>
            <Text style={[styles.keepGoing, { color: colors.textSecondary }]}>
              Keep up the great work! 🎉
            </Text>
            <View style={[styles.row, { justifyContent: 'space-between' }]}>
              {daysOfWeek.map(d => (
                <Text key={d} style={[styles.dayLabel, { color: colors.textSecondary }]}>
                  {d}
                </Text>
              ))}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  gradient: { flex: 1 },
  container: { padding: 16, paddingTop: 60, paddingBottom: 60 },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 30,
    marginBottom: 16,
  },
  center: { alignItems: 'center' },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 12,
  },
  editIcon: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 4,
    borderRadius: 12,
  },
  name: { fontSize: 20, fontWeight: '600' },
  subtitle: { fontSize: 14, marginBottom: 12 },
  buttonRow: { flexDirection: 'row', gap: 12 },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: { fontSize: 14, fontWeight: '500' },
  row: { flexDirection: 'row', alignItems: 'center' },
  metricsRow: { justifyContent: 'space-between', marginBottom: 16 },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 100,
    borderRadius: 12,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  metricValue: { fontSize: 20, fontWeight: '700', marginTop: 6 },
  metricLabel: { fontSize: 12, marginTop: 2, textAlign: 'center' },
  sectionHeader: { fontSize: 16, fontWeight: '600', marginBottom: 12 },
  achCol: { width: '33%', alignItems: 'center', marginBottom: 16 },
  achCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  achText: { fontSize: 12, textAlign: 'center' },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.3)',
  },
  recordTitle: { fontSize: 14, fontWeight: '600' },
  recordSubtitle: { fontSize: 12, marginTop: 2 },
  recordValue: { fontSize: 14, fontWeight: '600' },
  keepGoing: { textAlign: 'center', fontSize: 12, marginBottom: 12 },
  dayLabel: { fontSize: 14 },
})
