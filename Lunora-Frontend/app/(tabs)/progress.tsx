import React from 'react';
import { ScrollView, StyleSheet, FlatList, Platform } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const screenWidth = Dimensions.get('window').width;

export default function ProgressScreen() {
  const progressData = {
    labels: ['Strength', 'Mobility', 'Cardio'],
    data: [0.7, 0.5, 0.85], // Progress as percentage
  };

  const recentSessions = [
    { day: 'Saturday', type: 'Leg Day', duration: '48 min' },
    { day: 'Thursday', type: 'Core Blast', duration: '32 min' },
    { day: 'Tuesday', type: 'Mobility Flow', duration: '40 min' },
  ];

  return (
    <ScrollView style={Platform.OS !== "ios" ? styles.container : styles.IOScontainer}>
      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerTitle}>Your Progress</ThemedText>
      </ThemedView>

      {/* Chart Section */}
      <ThemedView style={styles.chartSection}>
        <ThemedText style={styles.sectionTitle}>Workout Focus</ThemedText>
        <ProgressChart
          data={progressData}
          width={screenWidth - 40}
          height={200}
          strokeWidth={20}
          radius={25}
          chartConfig={chartConfig}
          hideLegend={false}
        />
      </ThemedView>

      {/* Stats Summary */}
      <ThemedView style={styles.statsContainer}>
        <ThemedView style={styles.statBlock}>
          <ThemedText style={styles.statValue}>11</ThemedText>
          <ThemedText style={styles.statLabel}>Workouts this month</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statBlock}>
          <ThemedText style={styles.statValue}>430</ThemedText>
          <ThemedText style={styles.statLabel}>Total minutes</ThemedText>
        </ThemedView>
        <ThemedView style={styles.statBlock}>
          <ThemedText style={styles.statValue}>High</ThemedText>
          <ThemedText style={styles.statLabel}>Avg. Intensity</ThemedText>
        </ThemedView>
      </ThemedView>

      {/* Recent Workouts */}
      <ThemedView style={styles.recentSection}>
        <ThemedText style={styles.sectionTitleDark}>Recent Workouts</ThemedText>
        {recentSessions.map((item, index) => (
          <ThemedView key={index} style={styles.sessionCard}>
            <ThemedText style={styles.sessionText}>
              {item.day} • {item.type} • {item.duration}
            </ThemedText>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#F5E6E6',
  backgroundGradientTo: '#F5E6E6',
  color: (opacity = 1) => `rgba(139, 75, 75, ${opacity})`,
  labelColor: () => '#784B4B',
  propsForLabels: {
    fontWeight: 'bold',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6E6',
  },
  IOScontainer: {
    flex: 1,
    backgroundColor: '#F5E6E6',
    marginBottom: 80
  },
  header: {
    padding: 20,
    backgroundColor: '#BF7D7D',
    paddingTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  chartSection: {
    paddingHorizontal: 0,
    paddingVertical: 5,
    backgroundColor: '#f5e6e6'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#784B4B',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#BF7D7D',
    paddingVertical: 20,
  },
  statBlock: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#f3f3f3',
  },
  recentSection: {
    padding: 20,
  },
  sectionTitleDark: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#784B4B',
    marginBottom: 10,
  },
  sessionCard: {
    backgroundColor: '#FDECEC',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  sessionText: {
    color: '#784B4B',
    fontWeight: '500',
  },
});
