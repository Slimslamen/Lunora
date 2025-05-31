import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Platform } from 'react-native';

export default function ProfileScreen() {
  const [remindersEnabled, setRemindersEnabled] = React.useState(true);

  return (
    <ScrollView style={Platform.OS !== "ios" ? styles.container : styles.IOScontainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Profile</Text>
      </View>

      {/* Profile Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Luna Rivera</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>27</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Height</Text>
          <Text style={styles.value}>172 cm</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Weight</Text>
          <Text style={styles.value}>63 kg</Text>
        </View>
      </View>

      {/* Goals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fitness Goal</Text>
        <View style={styles.goalBox}>
          <Text style={styles.goalText}>🌟 Build Lean Muscle</Text>
        </View>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.prefRow}>
          <Text style={styles.label}>Daily Reminders</Text>
          <Switch
            value={remindersEnabled}
            onValueChange={setRemindersEnabled}
            trackColor={{ false: '#ddd', true: '#D2A5A5' }}
            thumbColor={remindersEnabled ? '#784B4B' : '#aaa'}
          />
        </View>
        <View style={styles.prefRow}>
          <Text style={styles.label}>Preferred Intensity</Text>
          <Text style={styles.value}>Medium</Text>
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
    borderBottomColor: '#EED6D6',
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#784B4B',
    marginBottom: 10,
  },
  infoBlock: {
    marginBottom: 10,
  },
  label: {
    color: '#A47C7C',
    fontSize: 13,
  },
  value: {
    fontSize: 16,
    color: '#784B4B',
    fontWeight: '500',
  },
  goalBox: {
    backgroundColor: '#FDECEC',
    padding: 12,
    borderRadius: 12,
    marginTop: 5,
  },
  goalText: {
    color: '#784B4B',
    fontWeight: '600',
  },
  prefRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  logoutButton: {
    backgroundColor: '#784B4B',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
