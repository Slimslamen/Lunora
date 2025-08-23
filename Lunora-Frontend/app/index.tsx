import { UserContext } from '@/Context/User/UserContext';
import { Link } from 'expo-router';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

export default function WelcomeScreen() {
    const UContext = useContext(UserContext);
    const { loadedUser } = UContext;
  
  return (
    <View  style={styles.container}>
      <ImageBackground
        source={require('../assets/images/Lunora_background.png')}
        style={styles.background}
        resizeMode="cover"

      >
        <View style={styles.overlay}>
          <View style={styles.buttonContainer}>
             <Link href={'./StarterScreens/UserFacts/NameScreen'} asChild>
              <TouchableOpacity style={styles.getStartedBtn}>
                <Text style={styles.getStartedText}>Get started</Text>
              </TouchableOpacity>
            </Link>

            <Link href={'./(tabs)/home'} asChild>
              <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginText}>I already have an account</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundSize: 'auto',
    backgroundRepeat: 'no-repeat',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginTop: 100,
    alignItems: 'center',
  },
  iconBox: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  icon: {
    fontSize: 28,
    color: 'white',
  },
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    marginTop: 6,
    opacity: 0.8,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
  },
  getStartedBtn: {
    backgroundColor: '#d67f5a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  getStartedText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  loginBtn: {
    borderColor: '#f5e6e6',
    borderWidth: 2,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
