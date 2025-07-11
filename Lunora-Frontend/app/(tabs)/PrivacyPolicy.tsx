// PrivacyPolicyScreen.tsx
import React from 'react'
import { View, Text, ScrollView, StyleSheet, useColorScheme, StatusBar } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { LIGHT_COLORS, DARK_COLORS } from '@/constants/Colors'

export default function PrivacyPolicyScreen() {
  const scheme = useColorScheme()
  const colors = scheme === 'dark' ? DARK_COLORS : LIGHT_COLORS

  return (
    <View style={styles.safe}>
      <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
              {/* Header */}
            <Text style={[styles.title, { color: colors.textPrimary }]}>
                Privacy Policy
            </Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Our way to handle your information
            </Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>1. Data Collection</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>We only collect data that is necessary for the functionality of the app. This may include:</Text>
          <View style={styles.list}>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• User account details (e.g., email, username)</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Device information (e.g., OS version, device type)</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• App usage analytics (anonymized)</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Optional: Location data (if you enable location-based features)</Text>
          </View>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>2. Data Usage</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>Collected data is used solely to:</Text>
          <View style={styles.list}>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Provide core functionality of the app</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Improve user experience</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Communicate with users (e.g., support, updates)</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Ensure security and prevent abuse</Text>
          </View>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>We do not sell or share your data with third parties unless required by law or for core service providers (e.g., Firebase, AWS).</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>3. Data Storage and Security</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>All user data is:</Text>
          <View style={styles.list}>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Encrypted in transit using TLS 1.2+</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Stored securely using industry-standard encryption (AES-256)</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Protected by access control and monitoring systems</Text>
          </View>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>We regularly review and update our security protocols.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>4. User Rights</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>You have the right to:</Text>
          <View style={styles.list}>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Access your data</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Request deletion of your data</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Withdraw consent at any time</Text>
          </View>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>To do so, contact: <Text style={{ color: colors.textPrimary }}>support@yourappdomain.com</Text></Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>5. Third-Party Services</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>We use trusted third-party services (e.g., Expo, AWS Amplify, Firebase) which follow their own privacy and security standards. Data shared with them is minimized and only used to support our app functionality.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>6. Cookies and Tracking</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>We may use cookies or local storage for:</Text>
          <View style={styles.list}>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Saving your login session</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• Improving app performance</Text>
          </View>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>No third-party advertising cookies are used unless explicitly stated.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>7. Children’s Privacy</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>Our app is not intended for children under the age of 13. We do not knowingly collect personal data from children without parental consent.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>8. Breach Notification</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>If we detect a data breach that affects your personal data:</Text>
          <View style={styles.list}>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• You will be notified within 72 hours</Text>
            <Text style={[styles.listItem, { color: colors.textSecondary }]}>• We'll explain the nature of the breach and what actions you should take</Text>
          </View>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>9. Data Retention</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>User data is retained only as long as necessary for the purposes mentioned or as required by law. Upon account deletion, all personal data is erased within 30 days.</Text>

          <Text style={[styles.heading, { color: colors.textPrimary }]}>10. Contact</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>For questions about this policy, contact:</Text>
          <Text style={[styles.paragraph, { color: colors.textPrimary }]}>📧 privacy@yourappdomain.com</Text>
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
    safe: { flex: 1 },
    gradient: { flex: 1 },
    container: { padding: 16, paddingTop: 60, paddingBottom: 100 },
    title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
    subtitle: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
    heading: { fontSize: 18, fontWeight: '600', marginTop: 16 },
    paragraph: { fontSize: 14, marginTop: 8, lineHeight: 20 },
    list: { marginLeft: 12, marginTop: 4 },
    listItem: { fontSize: 14, marginTop: 4 },
})
