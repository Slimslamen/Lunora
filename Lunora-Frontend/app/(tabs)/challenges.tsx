// ChallengesScreen.tsx
import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  useColorScheme,
  Platform,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'


const activeChallenges = [
  {
    id: 'streak',
    icon: <FontAwesome5 name="fire" size={18} />,
    title: '7-Day Streak Master',
    subtitle: 'Complete 7 workouts in a row',
    progress: 3 / 7,
    progressText: '3/7 completed',
    daysLeft: '4d left',
    reward: 'Streak Badge',
    rewardIcon: <Ionicons name="star" size={16} />,
  },
  {
    id: 'cardio',
    icon: <Ionicons name="heart" size={18} />,
    title: 'Cardio Champion',
    subtitle: 'Complete 10 cardio workouts this month',
    progress: 6 / 10,
    progressText: '6/10 completed',
    daysLeft: '12d left',
    reward: 'Cardio Badge + 500 XP',
    rewardIcon: <Ionicons name="star" size={16} />,
  },
  {
    id: 'early',
    icon: <MaterialCommunityIcons name="sunrise" size={18} />,
    title: 'Early Bird',
    subtitle: 'Complete 5 morning workouts',
    progress: 2 / 5,
    progressText: '2/5 completed',
    daysLeft: '10d left',
    reward: 'Morning Badge',
    rewardIcon: <Ionicons name="star" size={16} />,
  },
]

const completed = [
  {
    id: 'first',
    icon: <Ionicons name="walk" size={18} />,
    title: 'First Steps',
    subtitle: 'Complete your first workout',
    timeAgo: '2 days ago',
    trophy: <Ionicons name="trophy" size={16} />,
  },
  {
    id: 'consistency',
    icon: <FontAwesome5 name="crown" size={18} />,
    title: 'Consistency King',
    subtitle: 'Complete 3 workouts in one week',
    timeAgo: '1 week ago',
    trophy: <Ionicons name="trophy" size={16} />,
  },
]

const comingSoon = [
  {
    id: 'monthly',
    icon: <MaterialCommunityIcons name="calendar-star" size={18} />,
    title: 'Monthly Warrior',
    subtitle: 'Complete 20 workouts in one month',
    startsIn: 'Starts in 3 days',
    crown: <FontAwesome5 name="crown" size={16} />,
  },
  {
    id: 'strength',
    icon: <MaterialCommunityIcons name="dumbbell" size={18} />,
    title: 'Strength Builder',
    subtitle: 'Complete 15 strength workouts',
    startsIn: 'Starts in 1 week',
    crown: <FontAwesome5 name="crown" size={16} />,
  },
]

export default function ChallengesScreen() {
  const scheme = useColorScheme()
  const colors = scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={scheme === 'light' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Title */}
          <Text style={[styles.title, { color: colors.textPrimary }]}>
            Challenges
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Push your limits and earn rewards
          </Text>

          {/* Your Progress */}
          <View style={[styles.card, {
            backgroundColor: colors.cardBg,
            borderColor: colors.cardBorder
          }]}>
            <Text style={[styles.statItem, { color: colors.textPrimary }]}>
              Your Progress
            </Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>3</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Active</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>5</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Completed</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statNumber, { color: colors.textPrimary }]}>1,200</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Total XP</Text>
              </View>
              <Ionicons name="trophy" size={20} color={colors.accent} />
            </View>
          </View>

          {/* Active Challenges */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
            Active Challenges
          </Text>
          {activeChallenges.map(ch => (
            <View key={ch.id} style={[styles.card, {
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder
            }]}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  {React.cloneElement(ch.icon, { color: colors.accent })}
                </View>
                <View style={styles.challengeContent}>
                  <Text style={[styles.challengeTitle, { color: colors.textPrimary }]}>
                    {ch.title}
                  </Text>
                  <Text style={[styles.challengeSubtitle, { color: colors.textSecondary }]}>
                    {ch.subtitle}
                  </Text>
                </View>
                <Text style={[styles.daysLeft, { color: colors.textSecondary }]}>
                  {ch.daysLeft}
                </Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressFill, {
                  width: `${ch.progress * 100}%`,
                  backgroundColor: colors.accent
                }]} />
              </View>
              <View style={styles.rowFooter}>
                <Text style={[styles.progressText, { color: colors.textSecondary }]}>
                  {ch.progressText}
                </Text>
                <View style={styles.reward}>
                  {React.cloneElement(ch.rewardIcon, { color: colors.accent })}
                  <Text style={[styles.rewardText, { color: colors.accent }]}>
                    {ch.reward}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {/* Completed */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
            Completed
          </Text>
          {completed.map(c => (
            <View key={c.id} style={[styles.card, {
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder
            }]}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  {React.cloneElement(c.icon, { color: colors.textSecondary })}
                </View>
                <View style={styles.challengeContent}>
                  <Text style={[styles.challengeTitle, { color: colors.textSecondary }]}>
                    {c.title}
                  </Text>
                  <Text style={[styles.challengeSubtitle, { color: colors.textSecondary, opacity: 0.8 }]}>
                    {c.subtitle}
                  </Text>
                </View>
                <Text style={[styles.daysLeft, { color: colors.textSecondary }]}>
                  {c.timeAgo}
                </Text>
                <View style={styles.iconWrapper}>
                  {React.cloneElement(c.trophy, { color: colors.accent })}
                </View>
              </View>
            </View>
          ))}

          {/* Coming Soon */}
          <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
            Coming Soon
          </Text>
          {comingSoon.map(c => (
            <View key={c.id} style={[styles.card, {
              backgroundColor: colors.cardBg,
              borderColor: colors.cardBorder
            }]}>
              <View style={styles.row}>
                <View style={styles.iconWrapper}>
                  {React.cloneElement(c.icon, { color: colors.textSecondary })}
                </View>
                <View style={styles.challengeContent}>
                  <Text style={[styles.challengeTitle, { color: colors.textSecondary }]}>
                    {c.title}
                  </Text>
                  <Text style={[styles.challengeSubtitle, { color: colors.textSecondary, opacity:0.8 }]}>
                    {c.subtitle}
                  </Text>
                </View>
                <Text style={[styles.daysLeft, { color: colors.textSecondary }]}>
                  {c.startsIn}
                </Text>
                <View style={styles.iconWrapper}>
                  {React.cloneElement(c.crown, { color: colors.accent })}
                </View>
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

  container: { padding: 16, paddingTop: 60, paddingBottom: 90 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 24 },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
  },
  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  statItem: { alignItems: 'center', flex: 1 },
  statNumber: { fontSize: 20, fontWeight: '700' },
  statLabel: { fontSize: 12 },
  sectionHeader: { fontSize: 16, fontWeight: '600', marginVertical: 8 },
  row: { flexDirection: 'row', alignItems: 'center' },
  iconWrapper: { width: 24, alignItems: 'center', marginRight: 12 },
  challengeContent: { flex: 1 },
  challengeTitle: { fontSize: 15, fontWeight: '600' },
  challengeSubtitle: { fontSize: 12, marginTop: 2 },
  daysLeft: { fontSize: 12, marginLeft: 8 },
  progressBarBg: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 8,
  },
  progressFill: { height: '100%' },
  rowFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontSize: 12 },
  reward: { flexDirection: 'row', alignItems: 'center' },
  rewardText: { fontSize: 12, marginLeft: 4 },
})
