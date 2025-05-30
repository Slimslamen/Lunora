
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { styles } from '../style';

export default function LunariaApp() {
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

  return (
    <View style={styles.container}>
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



