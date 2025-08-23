import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image } from 'react-native';
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
        }, 3500); // Increased time to read the new messaging
      } catch (error) {
        console.log('Error checking onboarding status:', error);
        setTimeout(() => {
          router.replace('/onboarding');
        }, 3500);
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
          {/* Sugar Codex Logo */}
          <View style={styles.logoContainer}>
            <Image 
              source={require('../assets/images/icon.png')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          
          {/* Main Title */}
          <Text style={styles.title}>Sugar Codex</Text>
          
          {/* New Positioning Statement */}
          <Text style={styles.positioning}>THE Education App</Text>
          
          {/* Subtitle with SugarCypher reference */}
          <Text style={styles.subtitle}>
            Decoding sugar & its impact
          </Text>
          
          {/* SugarCypher complement message */}
          <Text style={styles.complement}>
            The perfect companion to SugarCypher
          </Text>
          
          {/* Loading animation */}
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
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: 'rgba(255, 107, 107, 0.3)',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  positioning: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFD93D',
    marginBottom: 8,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD93D',
    textAlign: 'center',
    marginBottom: 12,
    opacity: 0.9,
  },
  complement: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.8,
    fontStyle: 'italic',
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