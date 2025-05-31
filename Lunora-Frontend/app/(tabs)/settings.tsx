import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);

  const confirmReset = () => {
    Alert.alert(
      'Reset App',
      'Are you sure you want to reset all data?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', onPress: () => console.log('Reset triggered') },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={Platform.OS !== "ios" ? styles.container : styles.IOScontainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingRow}>
          <Text style={styles.label}>Enable Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#ddd', true: '#D2A5A5' }}
            thumbColor={notifications ? '#784B4B' : '#aaa'}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.label}>Auto-Play Workouts</Text>
          <Switch
            value={autoPlay}
            onValueChange={setAutoPlay}
            trackColor={{ false: '#ddd', true: '#D2A5A5' }}
            thumbColor={autoPlay ? '#784B4B' : '#aaa'}
          />
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.label}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: '#ddd', true: '#D2A5A5' }}
            thumbColor={darkMode ? '#784B4B' : '#aaa'}
          />
        </View>
      </View>

      {/* Account */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>Manage Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={confirmReset}>
          <Text style={[styles.actionText, { color: '#bf2626' }]}>Reset App</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Lunora v1.0.0</Text>
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
    marginBottom: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  label: {
    fontSize: 15,
    color: '#784B4B',
  },
  actionButton: {
    paddingVertical: 12,
  },
  actionText: {
    color: '#784B4B',
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#A47C7C',
  },
});
