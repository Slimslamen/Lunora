// SettingsDetailedScreen.tsx
import React, { useContext, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { DARK_COLORS, LIGHT_COLORS } from '@/constants/Colors'
import { ThemeContext } from '@/Context/Theme/ThemeContext'
import { Link, useRouter } from 'expo-router'
import { UserContext } from '@/Context/User/UserContext'


export default function SettingsDetailedScreen() {
  const TContext = useContext(ThemeContext)
  const { darkMode, toggleTheme } = TContext

   const UContext = useContext(UserContext);
    const { activeUser } = UContext;
  
  const colors = darkMode === true ? DARK_COLORS : LIGHT_COLORS 

  const [notifications, setNotifications] = useState(true)

  const router = useRouter();
    
  const Logout = () => {
    router.replace('/')
  }

  return (
    <View style={styles.safe}>
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
            <Text style={[styles.title, { color: colors.textPrimary }]}>
              Settings
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Control your settings
            </Text>
          {/* Profile Header */}
          <TouchableOpacity
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
            activeOpacity={0.8}
          >
            <View style={styles.profileRow}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: colors.cardBorder + '40' },
                ]}
              >
                <Ionicons name="person" size={24} color={colors.textSecondary} />
              </View>
              <View style={styles.profileText}>
                <Text style={[styles.profileName, { color: colors.textPrimary }]}>
                  {activeUser?.name}
                </Text>
                <Text
                  style={[styles.profileSubtitle, { color: colors.textSecondary }]}
                >
                  {activeUser?.paidPlan}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Account Section */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              Account
            </Text>
            {[
              { icon: 'person-outline', label: 'Personal Information' },
              { icon: 'card-outline', label: 'Paid Plan' },
            ].map((item, i) => (
              <Link href={i === 0 ? './PersonalInfo' : './EditProfile'} key={i} asChild>
              <TouchableOpacity style={styles.rowItem} activeOpacity={0.7}>
                <View style={styles.iconWrapper}>
                <Ionicons
                  name={item.icon as any}
                  size={18}
                  color={colors.textSecondary}
                />
                </View>
                <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                {item.label}
                </Text>
                <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
              </TouchableOpacity>
              </Link>
            ))}
          </View>

          {/* Preferences Section */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              Preferences
            </Text>
            <View style={styles.rowItem}>
              <Ionicons
                name="notifications-outline"
                size={18}
                color={colors.textSecondary}
              />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                Notifications
              </Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{
                  false: colors.textSecondary + '50',
                  true: colors.textSecondary + '80',
                }}
                thumbColor={darkMode ? colors.accent : colors.textPrimary}
              />
            </View>
            <View style={styles.rowItem}>
              <Ionicons name="moon-outline" size={18} color={colors.textSecondary} />
              <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                Dark Mode
              </Text>
              <Switch
                value={darkMode}
                onValueChange={toggleTheme}
                trackColor={{
                  false: colors.textSecondary + '50',
                  true: colors.textSecondary + '80',
                }}
                thumbColor={darkMode ? colors.accent : colors.textPrimary}
              />
            </View>
          </View>

          {/* Support Section */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              Support
            </Text>
            {[
              { icon: 'help-circle-outline', label: 'Help & FAQ' },
              { icon: 'document-text-outline', label: 'Privacy Policy' },
              { icon: 'chatbubble-ellipses-outline', label: 'Contact Support' },
            ].map((item, i) => (
              <Link href={i === 1 ? './PrivacyPolicy' : i === 2 ? './Contact' : i === 0 ? './FAQ' : './home'} key={i} asChild>
                <TouchableOpacity  style={styles.rowItem} activeOpacity={0.7}>
                  <Ionicons name={item.icon as any} size={18} color={colors.textSecondary} />
                  <Text style={[styles.rowLabel, { color: colors.textPrimary }]}>
                    {item.label}
                  </Text>
                  <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </Link>
            ))}
          </View>

          {/* About Section */}
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
          >
            <Text style={[styles.sectionHeader, { color: colors.textPrimary }]}>
              About
            </Text>
            <View style={styles.aboutBlock}>
              <Text style={[styles.aboutTitle, { color: colors.textPrimary }]}>
                Training App
              </Text>
              <Text style={[styles.aboutVersion, { color: colors.textSecondary }]}>
                Version 1.0.0
              </Text>
              <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
                Your personal fitness companion designed to help you achieve your
                goals and stay motivated on your fitness journey.
              </Text>
            </View>
          </View>

          {/* Sign Out */}
          <TouchableOpacity
            onPress={Logout}
            style={[
              styles.card,
              {
                backgroundColor: colors.cardBg,
                borderColor: colors.cardBorder,
              },
            ]}
            activeOpacity={0.7}
          >
            <View style={styles.rowItem}>
              <Ionicons name="exit-outline" size={18} color={colors.accent} />
              <Text style={[styles.rowLabel, { color: colors.accent }]}>
                Sign Out
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  gradient: { flex: 1 },
  container: { padding: 16, paddingTop: 60, paddingBottom: 80 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
  card: {
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: { flex: 1, marginLeft: 12 },
  profileName: { fontSize: 20, fontWeight: '600' },
  profileSubtitle: { fontSize: 14, marginTop: 2 },
  sectionHeader: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconWrapper: { width: 24, alignItems: 'center' },
  rowLabel: { flex: 1, marginLeft: 12, fontSize: 17 },
  aboutBlock: { alignItems: 'center', marginVertical: 12 },
  aboutTitle: { fontSize: 20, fontWeight: '600' },
  aboutVersion: { fontSize: 14, marginVertical: 4 },
  aboutText: { fontSize: 14, textAlign: 'center', lineHeight: 18 },
})
