import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 🚀 DEPLOYMENT ID: FRESH-DEPLOY-2025-08-23
export default function SplashScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [termsAccepted, setTermsAccepted] = useState(false);

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
    };

    initializeApp();
  }, [fadeAnim, scaleAnim]);

  const handleAcceptTerms = async () => {
    setTermsAccepted(true);
    
    // Check if user has seen onboarding
    try {
      const hasSeenOnboarding = await AsyncStorage.getItem('hasSeenOnboarding');
      
      if (hasSeenOnboarding === 'true') {
        router.replace('/(tabs)');
      } else {
        router.replace('/onboarding');
      }
    } catch (error) {
      console.log('Error checking onboarding status:', error);
      router.replace('/onboarding');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63', '#0f0c29']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              <View style={styles.loadingDot} />
              <View style={styles.loadingDot} />
            </View>
          </Animated.View>

          {/* Terms and Conditions Section */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsTitle}>Terms and Conditions</Text>
            <ScrollView style={styles.termsTextContainer}>
              <Text style={styles.termsText}>
                By using Sugar Codex, you agree to our terms of service and privacy policy. 
                This app is designed for educational purposes and should not replace professional medical advice. 
                Always consult with healthcare professionals regarding your health and nutrition.
              </Text>
              <Text style={styles.termsText}>
                Sugar Codex collects minimal data necessary for app functionality and does not share personal information with third parties. 
                Your privacy and data security are our top priorities.
              </Text>
            </ScrollView>
            
            {/* Accept Button */}
            <TouchableOpacity 
              style={[styles.acceptButton, termsAccepted && styles.acceptButtonDisabled]} 
              onPress={handleAcceptTerms}
              disabled={termsAccepted}
            >
              <Text style={styles.acceptButtonText}>
                {termsAccepted ? 'Accepted ✓' : 'I Accept the Terms'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
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
  termsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  termsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  termsTextContainer: {
    maxHeight: 200, // Limit height for scrolling
  },
  termsText: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
    opacity: 0.9,
  },
  acceptButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  acceptButtonDisabled: {
    backgroundColor: '#888888',
    opacity: 0.7,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});