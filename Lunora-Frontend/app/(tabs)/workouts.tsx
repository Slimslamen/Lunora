import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';

const workouts = [
  {
    name: 'Upper Body Strength',
    category: 'Strength',
    duration: '45 min',
    intensity: 'High',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    name: 'Mobility Flow',
    category: 'Flexibility',
    duration: '25 min',
    intensity: 'Low',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    name: 'HIIT Blast',
    category: 'Cardio',
    duration: '30 min',
    intensity: 'Medium',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    name: 'Core Power',
    category: 'Strength',
    duration: '20 min',
    intensity: 'Medium',
    image: 'https://via.placeholder.com/400x200',
  },
];

export default function WorkoutLibraryScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Workout Library</Text>
      </View>

      {/* Workout Cards */}
      <View style={Platform.OS !== "ios" ? styles.content : styles.IOScontent}>
        {workouts.map((workout, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Image source={{ uri: workout.image }} style={styles.image} />
            <View style={styles.cardContent}>
              <Text style={styles.workoutTitle}>{workout.name}</Text>
              <Text style={styles.workoutCategory}>{workout.category}</Text>
              <View style={styles.meta}>
                <Text style={styles.metaText}>{workout.duration}</Text>
                <Text style={[styles.metaText, {
                  color: workout.intensity === 'Low' ? 'green' :
                         workout.intensity === 'Medium' ? 'orange' : 'red',
                }]}>
                  {workout.intensity}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5E6E6',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#BF7D7D',
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  IOScontent: {
    padding: 20,
    marginBottom: 80
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
  },
  cardContent: {
    padding: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#784B4B',
    marginBottom: 4,
  },
  workoutCategory: {
    fontSize: 14,
    color: '#A47C7C',
    marginBottom: 8,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metaText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#784B4B',
  },
});
