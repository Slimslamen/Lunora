// WorkoutsScreen.tsx
import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { IconSymbol } from '@/components/ui/IconSymbol'
import { LIGHT_COLORS, DARK_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/ThemeContext'

const TAGS = ['All', 'Strength', 'Cardio', 'Yoga', 'HIIT', 'Recovery']
const WORKOUTS = [
  { id: '1', emoji: '💪', name: 'Upper Body Blast', tag: 'Strength', duration: '45 min', calories: '350–400 cal', level: 'Intermediate' },
  { id: '2', emoji: '🔥', name: 'HIIT Cardio Burn', tag: 'HIIT', duration: '20 min', calories: '250–300 cal', level: 'Advanced' },
  { id: '3', emoji: '🧘‍♀️', name: 'Morning Yoga Flow', tag: 'Yoga', duration: '30 min', calories: '100–150 cal', level: 'Beginner' },
  { id: '4', emoji: '🦵', name: 'Leg Day Power', tag: 'Strength', duration: '50 min', calories: '400–500 cal', level: 'Advanced' },
  { id: '5', emoji: '⚡', name: 'Core Crusher', tag: 'Strength', duration: '25 min', calories: '200–250 cal', level: 'Intermediate' },
  { id: '6', emoji: '🌱', name: 'Recovery Stretch', tag: 'Recovery', duration: '15 min', calories: '50–80 cal', level: 'Beginner' },
]

export default function WorkoutsScreen() {
  const TContext = useContext(ThemeContext)
  const { darkMode } = TContext
  
  const scheme = useColorScheme()
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS 

  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('All')

  const filtered = WORKOUTS.filter(w =>
    (activeTag === 'All' || w.tag === activeTag) &&
    w.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle={scheme === 'light' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Workouts</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>Choose your perfect workout</Text>

        {/* Search */}
        <View style={[styles.searchBox, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
          <IconSymbol name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: colors.textPrimary }]}
            placeholder="Search workouts..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Tags */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsContainer}>
          {TAGS.map(tag => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagButton,
                {
                  backgroundColor: activeTag === tag ? colors.accent : 'transparent',
                  borderColor: colors.cardBorder,
                }
              ]}
              onPress={() => setActiveTag(tag)}
            >
              <Text style={[styles.tagText, { color: activeTag === tag ? '#fff' : colors.textPrimary }]}>
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Workout List */}
        <ScrollView style={styles.list}>
          {filtered.map(w => {
            let levelColor = colors.textSecondary
            if (w.level === 'Beginner') levelColor = '#06D6A0'
            if (w.level === 'Intermediate') levelColor = '#FFD166'
            if (w.level === 'Advanced') levelColor = '#EF476F'

            return (
              <View key={w.id} style={[styles.card, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
                <View style={styles.itemRow}>
                  <Text style={styles.emoji}>{w.emoji}</Text>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={[styles.itemTitle, { color: colors.textPrimary }]}>{w.name}</Text>
                    <View style={styles.itemMeta}>
                      <IconSymbol name="time" size={14} color={colors.textSecondary} />
                      <Text style={[styles.metaText, { color: colors.textSecondary }]}>{w.duration}</Text>
                      <IconSymbol name="bolt" size={14} color={colors.textSecondary} />
                      <Text style={[styles.metaText, { color: colors.textSecondary }]}>{w.calories}</Text>
                      <Text style={[styles.levelText, { color: levelColor }]}>{w.level}</Text>
                    </View>
                    <View style={styles.tagContainer}>
                      <View style={[styles.tagLabel, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>  
                        <Text style={[styles.tagLabelText, { color: colors.textSecondary }]}>{w.tag}</Text>
                      </View>
                      <TouchableOpacity style={styles.startButton}>
                        <Text style={styles.startText}>Start Workout</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </ScrollView>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 16, paddingBottom: 20 },
  gradient: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  headerSubtitle: { fontSize: 14, textAlign: 'center', marginBottom: 16 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 12,
  },
  searchInput: { flex: 1, marginLeft: 8 },
  tagsContainer: { flexGrow: 0, marginBottom: 16 },
  tagButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 8,
  },
  tagText: { fontSize: 12 },

  list: { flex: 1, marginBottom: 60 },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  itemRow: { flexDirection: 'row', alignItems: 'center' },
  emoji: { fontSize: 24 },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  metaText: { fontSize: 12, marginHorizontal: 4 },
  levelText: { fontSize: 12, fontWeight: '600', marginLeft: 4 },
  tagLabel: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 6,
  },
  tagContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  tagLabelText: { fontSize: 12 },
  startButton: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginLeft: 8,
    alignItems: 'center',
  },
  startText: { color: '#000', fontWeight: '600' },
  favorite: { marginLeft: 8 },
})
