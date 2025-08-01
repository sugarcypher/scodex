import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { GraduationCap, ArrowRight, ArrowLeft, BookOpen, Search, Heart, Shield } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePrivacyCompliance } from '@/hooks/privacy-compliance';
import PrivacyConsentScreen from '@/components/PrivacyConsentScreen';
import { PrivacySettings } from '@/types/privacy';

const { width } = Dimensions.get('window');

interface OnboardingStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Welcome to Sugar Codex',
    subtitle: 'Your sugar education companion',
    description: 'Learn about different types of sugars, their health impacts, and make informed dietary choices.',
    icon: <GraduationCap color="#FF6B6B" size={64} />,
    color: '#FF6B6B',
  },
  {
    id: 2,
    title: 'Explore Sugar Types',
    subtitle: 'Natural, processed & metasugars',
    description: 'Discover the differences between various sugar categories and understand their glycemic impact.',
    icon: <Search color="#FFD93D" size={64} />,
    color: '#FFD93D',
  },
  {
    id: 3,
    title: 'Learn & Educate',
    subtitle: 'Evidence-based information',
    description: 'Access our comprehensive education library with scientific insights about sugar metabolism.',
    icon: <BookOpen color="#FF8E53" size={64} />,
    color: '#FF8E53',
  },
  {
    id: 4,
    title: 'Track Favorites',
    subtitle: 'Save what matters to you',
    description: 'Bookmark sugars and information that are relevant to your dietary needs and preferences.',
    icon: <Heart color="#FF6B6B" size={64} />,
    color: '#FF6B6B',
  },
  {
    id: 5,
    title: 'Privacy First',
    subtitle: 'Your data, your control',
    description: 'We prioritize your privacy. All data is stored locally on your device with full transparency.',
    icon: <Shield color="#9B59B6" size={64} />,
    color: '#9B59B6',
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const { isConsentRequired, grantConsent } = usePrivacyCompliance();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      scrollViewRef.current?.scrollTo({ x: nextStep * width, animated: true });
    } else {
      handleFinishOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      scrollViewRef.current?.scrollTo({ x: prevStep * width, animated: true });
    }
  };

  const handleFinishOnboarding = async () => {
    if (isConsentRequired) {
      setShowPrivacyConsent(true);
    } else {
      await completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenOnboarding', 'true');
      router.replace('/(tabs)');
    } catch (error) {
      console.log('Error saving onboarding status:', error);
      router.replace('/(tabs)');
    }
  };

  const handleConsentAccept = async (settings: PrivacySettings) => {
    await grantConsent(settings);
    await completeOnboarding();
  };

  const handleConsentDecline = () => {
    setShowPrivacyConsent(false);
  };

  if (showPrivacyConsent) {
    return (
      <PrivacyConsentScreen 
        onAccept={handleConsentAccept}
        onDecline={handleConsentDecline}
      />
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63', '#0f0c29']}
        style={styles.gradient}
      >
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          style={styles.scrollView}
        >
          {onboardingSteps.map((step, index) => (
            <View key={step.id} style={styles.stepContainer}>
              <View style={styles.content}>
                <View style={[styles.iconContainer, { borderColor: `${step.color}30` }]}>
                  {step.icon}
                </View>
                
                <Text style={[styles.title, { color: step.color }]}>
                  {step.title}
                </Text>
                
                <Text style={styles.subtitle}>
                  {step.subtitle}
                </Text>
                
                <Text style={styles.description}>
                  {step.description}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.progressDot,
                {
                  backgroundColor: index === currentStep ? '#FF6B6B' : 'rgba(255, 255, 255, 0.3)',
                  width: index === currentStep ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>

        {/* Navigation */}
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={[styles.navButton, styles.prevButton]}
            onPress={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft 
              color={currentStep === 0 ? 'rgba(255, 255, 255, 0.3)' : '#fff'} 
              size={24} 
            />
            <Text style={[
              styles.navButtonText, 
              { color: currentStep === 0 ? 'rgba(255, 255, 255, 0.3)' : '#fff' }
            ]}>
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={styles.navButtonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
            <ArrowRight color="#0f0c29" size={24} />
          </TouchableOpacity>
        </View>

        {/* Skip Button */}
        <TouchableOpacity
          style={styles.skipButton}
          onPress={handleFinishOnboarding}
        >
          <Text style={styles.skipButtonText}>Skip Tour</Text>
        </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  stepContainer: {
    width,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    maxWidth: 320,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD93D',
    textAlign: 'center',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 32,
  },
  progressDot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 16,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
  },
  prevButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'flex-start',
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
    justifyContent: 'flex-end',
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  skipButton: {
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  skipButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textDecorationLine: 'underline',
  },
});