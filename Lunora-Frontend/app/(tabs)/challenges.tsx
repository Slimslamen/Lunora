import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';

const challenges = [
  {
    title: '🔥 7-Day Core Challenge',
    description: 'Complete a core workout each day for 7 days.',
    progress: '4/7',
    badge: 'https://via.placeholder.com/100x100',
    isActive: true,
  },
  {
    title: '💧 Hydration Streak',
    description: 'Track water intake every day for 5 days.',
    progress: 'Completed',
    badge: 'https://via.placeholder.com/100x100',
    isActive: false,
  },
  {
    title: '🏃‍♂️ Steps Booster',
    description: 'Walk 10,000 steps daily for a full week.',
    progress: '1/7',
    badge: 'https://via.placeholder.com/100x100',
    isActive: true,
  },
];

export default function ChallengesScreen() {
  return (
    <ScrollView style={Platform.OS !== "ios" ? styles.container : styles.IOScontainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Challenges</Text>
      </View>

      {/* Challenges List */}
      <View style={styles.content}>
        {challenges.map((challenge, index) => (
          <View key={index} style={[styles.card, !challenge.isActive && styles.cardInactive]}>
            <Image source={{ uri: challenge.badge }} style={styles.badge} />
            <View style={styles.cardContent}>
              <Text style={styles.title}>{challenge.title}</Text>
              <Text style={styles.description}>{challenge.description}</Text>
              <View style={styles.footer}>
                <Text style={styles.progress}>
                  {challenge.progress}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.joinButton,
                    !challenge.isActive && styles.joinButtonInactive,
                  ]}
                  disabled={!challenge.isActive}
                >
                  <Text style={styles.joinButtonText}>
                    {challenge.isActive ? 'View' : 'Locked'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5E6E6',
    flex: 1,
  },
    IOScontainer: {
    flex: 1,
    backgroundColor: '#F5E6E6',
    marginBottom: 80
  },
  header: {
    backgroundColor: '#BF7D7D',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  cardInactive: {
    backgroundColor: '#EED6D6',
    opacity: 0.8,
  },
  badge: {
    width: 100,
    height: 100,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#784B4B',
  },
  description: {
    fontSize: 13,
    color: '#A47C7C',
    marginVertical: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progress: {
    fontSize: 13,
    color: '#784B4B',
    fontWeight: '600',
  },
  joinButton: {
    backgroundColor: '#784B4B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  joinButtonInactive: {
    backgroundColor: '#aaa',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
