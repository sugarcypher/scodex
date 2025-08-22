import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));

  useEffect(() => {
    const initializeApp = async () => {
      // Start animations
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      // Check if user has seen onboarding
      try {
        const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
        
        setTimeout(() => {
          if (hasSeenOnboarding === 'true') {
            router.replace('/(tabs)');
          } else {
            router.replace('/onboarding');
          }
        }, 2500);
      } catch (error) {
        console.log('Error checking onboarding status:', error);
        setTimeout(() => {
          router.replace('/onboarding');
        }, 2500);
      }
    };

    initializeApp();
  }, [fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63', '#0f0c29']}
        style={styles.gradient}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.logoContainer}>
            <GraduationCap color="#FF6B6B" size={64} />
          </View>
          <Text style={styles.title}>Sugar Codex</Text>
          <Text style={styles.subtitle}>Decoding sugar & its impact</Text>
          <View style={styles.loadingContainer}>
            <View style={styles.loadingDot} />
            <View style={[styles.loadingDot, { animationDelay: '0.2s' }]} />
            <View style={[styles.loadingDot, { animationDelay: '0.4s' }]} />
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD93D',
    textAlign: 'center',
    marginBottom: 40,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginHorizontal: 4,
    opacity: 0.3,
  },
});