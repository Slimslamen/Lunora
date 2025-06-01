
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api/server';
import type { Schema } from "../../../amplify/data/resource"

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');

  const scheduledWorkouts = [
    { name: "Upper Body Strength", duration: "45 min", time: "08:00", completed: false },
    { name: "Mobility Flow", duration: "25 min", time: "17:30", completed: true }
  ];

  const recommendedWorkouts = [
    { name: "HIIT Burn", intensity: "Medium", duration: "30 min", image: "https://via.placeholder.com/400x200" },
    { name: "Full Body Tone", intensity: "Low", duration: "45 min", image: "https://via.placeholder.com/400x200" },
    { name: "Core Power", intensity: "High", duration: "20 min", image: "https://via.placeholder.com/400x200" }
  ];

  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const workoutDays = [0, 2, 4];

  //Amplify.configure("output")

  // const client = generateClient<Schema>()
  
  // client.queries.sayHello({
  //   name: "Amplify",
  // })

  return (
    <View style={Platform.OS !== "ios" ? styles.container : styles.IOScontainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lunora</Text>
        <View style={styles.headerIcons}>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.main}>
        {activeTab === 'home' && (
          <>
            {/* Weekly Overview */}
            <View style={styles.weeklyOverview}>
              <Text style={styles.sectionTitle}>Weekly Overview</Text>
              <View style={styles.weekDaysContainer}>
                {weekDays.map((day, index) => (
                  <View key={index} style={styles.dayItem}>
                    <View style={[styles.dayCircle, workoutDays.includes(index) && styles.activeDayCircle]}>
                      <Text style={workoutDays.includes(index) ? styles.activeDayText : styles.dayText}>{day}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <View style={styles.statsContainer}>
                <View><Text style={styles.statValue}>3 Workouts</Text><Text style={styles.statLabel}>This week</Text></View>
                <View><Text style={styles.statValue}>110 min</Text><Text style={styles.statLabel}>Total time</Text></View>
                <View><Text style={styles.statValue}>Medium</Text><Text style={styles.statLabel}>Avg. intensity</Text></View>
              </View>
            </View>

            {/* Today's Schedule */}
            <View style={styles.schedule}>
              <Text style={styles.sectionTitle}>Todays Schedule</Text>
              {scheduledWorkouts.map((workout, index) => (
                <View key={index} style={styles.workoutCard}>
                  <View style={styles.workoutLeft}>
                    <View>
                      <Text style={styles.workoutTitle}>{workout.name}</Text>
                      <Text style={styles.workoutDuration}>{workout.duration}</Text>
                    </View>
                  </View>
                  <Text style={[styles.statusText, { color: workout.completed ? '#4ade80' : '#4b5563' }]}>
                    {workout.completed ? 'Completed' : workout.time}
                  </Text>
                </View>
              ))}
              <TouchableOpacity style={styles.addButton}><Text style={styles.addButtonText}>+ Add workout</Text></TouchableOpacity>
            </View>

            {/* AI Analysis */}
            <View style={styles.aiSection}>
              <View style={styles.aiCard}>
                <View style={styles.aiCardHeader}>
                  <Text style={styles.aiCardTitle}>AI Workout Analysis</Text>
                </View>
                <Text style={styles.aiDescription}>Based on your activities, we recommend focusing on upper body strength this week.</Text>
                <TouchableOpacity style={styles.aiButton}><Text style={styles.aiButtonText}>View Recommendations</Text></TouchableOpacity>
              </View>
            </View>

            {/* Recommended */}
            <View style={styles.recommendedSection}>
              <Text style={styles.sectionTitleDark}>Recommended For You</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recommendedWorkouts.map((workout, index) => (
                  <View key={index} style={styles.recommendedCard}>
                    <Image source={{ uri: workout.image }} style={styles.recommendedImage} />
                    <View style={styles.recommendedContent}>
                      <Text style={styles.recommendedTitle}>{workout.name}</Text>
                      <View style={styles.recommendedMeta}>
                        <Text style={styles.recommendedDuration}>{workout.duration}</Text>
                        <Text style={[styles.intensityText, {
                          color: workout.intensity === 'Low' ? 'green' : workout.intensity === 'Medium' ? 'orange' : 'red'
                        }]}>{workout.intensity}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          </>
        )}
      </ScrollView>
      </View>
  );
}



const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5E6E6' },
  IOScontainer: { flex: 1, backgroundColor: '#F5E6E6', marginBottom: 80 },
  header: { backgroundColor: '#BF7D7D', flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
  headerTitle: { fontSize: 24, color: '#fff', fontWeight: 'bold' },
  headerIcons: { flexDirection: 'row', gap: 15 },
  main: { flex: 1, marginBottom: 5},
  weeklyOverview: { backgroundColor: '#965F5F', padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  sectionTitleDark: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10, paddingLeft: 20 },
  weekDaysContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dayItem: { alignItems: 'center' },
  dayCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#965F5F', justifyContent: 'center', alignItems: 'center' },
  activeDayCircle: { backgroundColor: '#E6C8C8', borderWidth: 2, borderColor: '#fff' },
  dayText: { color: '#eee' },
  activeDayText: { color: '#333' },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  statValue: { color: '#fff', fontWeight: '600' },
  statLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12 },
  schedule: { backgroundColor: '#BF7D7D', padding: 20 },
  workoutCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D2A5A5', padding: 15, borderRadius: 12, marginBottom: 10 },
  workoutLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  workoutTitle: { color: '#333', fontWeight: '600' },
  workoutDuration: { color: '#666', fontSize: 12 },
  iconWrapper: { padding: 8, borderRadius: 20 },
  statusText: { fontWeight: '500' },
  addButton: { backgroundColor: '#fff', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  addButtonText: { color: '#965F5F', fontWeight: '600' },
  aiSection: { padding: 20, backgroundColor: '#D2A5A5' },
  aiCard: { backgroundColor: '#784B4B', borderRadius: 12, padding: 15 },
  aiCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  aiCardTitle: { color: '#fff', fontWeight: '600' },
  aiDescription: { color: '#eee', fontSize: 13, marginBottom: 10 },
  aiButton: { backgroundColor: '#fff', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  aiButtonText: { color: '#784B4B', fontWeight: '600' },
  recommendedSection: { paddingVertical: 10 },
  recommendedCard: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', width: 200, marginHorizontal: 10 },
  recommendedImage: { width: '100%', height: 100 },
  recommendedContent: { padding: 10 },
  recommendedTitle: { color: '#784B4B', fontWeight: '600' },
  recommendedMeta: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
  recommendedDuration: { color: '#BF7D7D' },
  intensityText: { fontWeight: '600' },
  navigation: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#784B4B', paddingVertical: 12 },
  navItem: { alignItems: 'center' },
  navText: { color: '#fff', fontSize: 12, marginTop: 4 }
});

