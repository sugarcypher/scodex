import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
  Animated,
} from 'react-native';
import { Shield, Lock, Eye, Users, Mail, Share2, CheckCircle, XCircle } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PrivacySettings } from '@/types/privacy';

interface PrivacyConsentScreenProps {
  onAccept: (settings: PrivacySettings) => void;
  onDecline: () => void;
}

export default function PrivacyConsentScreen({ onAccept, onDecline }: PrivacyConsentScreenProps) {
  const [settings, setSettings] = useState<PrivacySettings>({
    dataCollection: true,
    analytics: false,
    crashReporting: false,
    personalizedContent: false,
    marketingCommunications: false,
    thirdPartySharing: false,
  });

  const [hasReadPolicy, setHasReadPolicy] = useState<boolean>(false);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handleSettingChange = (key: keyof PrivacySettings, value: boolean) => {
    if (key === 'dataCollection' && !value) {
      Alert.alert(
        'Essential Local Storage',
        'Disabling local storage will prevent the app from saving your favorites and preferences on your device. The app will work in read-only mode. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Disable', 
            style: 'destructive',
            onPress: () => setSettings(prev => ({ ...prev, [key]: value }))
          }
        ]
      );
    } else {
      setSettings(prev => ({ ...prev, [key]: value }));
    }
  };

  useEffect(() => {
    if (!hasReadPolicy) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );

      const glowAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      );

      pulseAnimation.start();
      glowAnimation.start();

      return () => {
        pulseAnimation.stop();
        glowAnimation.stop();
      };
    } else {
      pulseAnim.setValue(1);
      glowAnim.setValue(0);
    }
  }, [hasReadPolicy, pulseAnim, glowAnim]);

  const handleAccept = () => {
    if (!hasReadPolicy) {
      Alert.alert(
        'Privacy Policy Required',
        'Please confirm that you have read and understood our Privacy Policy before proceeding.',
        [{ text: 'OK' }]
      );
      return;
    }

    onAccept(settings);
  };

  const openPrivacyPolicy = () => {
    // In a real app, this would open your privacy policy URL
    Alert.alert(
      'Privacy Policy',
      'This would open the full privacy policy in your browser.',
      [
        { text: 'Cancel' },
        { 
          text: 'Open', 
          onPress: () => {
            // Linking.openURL('https://yourapp.com/privacy-policy');
            setHasReadPolicy(true);
          }
        }
      ]
    );
  };

  const privacyOptions = [
    {
      key: 'dataCollection' as keyof PrivacySettings,
      title: 'Essential Local Storage',
      description: 'Store your favorites and preferences locally on your device only. No data is sent to external servers.',
      icon: Lock,
      required: false,
      color: '#4CAF50',
    },
    {
      key: 'analytics' as keyof PrivacySettings,
      title: 'Usage Analytics',
      description: 'Help us improve the app by sharing anonymous usage statistics',
      icon: Eye,
      required: false,
      color: '#2196F3',
    },
    {
      key: 'crashReporting' as keyof PrivacySettings,
      title: 'Crash Reporting',
      description: 'Automatically report crashes to help us fix bugs faster',
      icon: Shield,
      required: false,
      color: '#FF9800',
    },
    {
      key: 'personalizedContent' as keyof PrivacySettings,
      title: 'Personalized Content',
      description: 'Customize content recommendations based on your preferences',
      icon: Users,
      required: false,
      color: '#9C27B0',
    },
    {
      key: 'marketingCommunications' as keyof PrivacySettings,
      title: 'Marketing Communications',
      description: 'Receive updates about new features and health tips',
      icon: Mail,
      required: false,
      color: '#607D8B',
    },
    {
      key: 'thirdPartySharing' as keyof PrivacySettings,
      title: 'Third-Party Sharing',
      description: 'Share anonymized data with research partners for health studies',
      icon: Share2,
      required: false,
      color: '#795548',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63']}
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Shield color="#FF6B6B" size={48} />
            <Text style={styles.title}>Privacy & Data Protection</Text>
            <Text style={styles.subtitle}>
              Your privacy is our priority. Choose what data you&apos;re comfortable sharing.
            </Text>
          </View>

          <View style={styles.complianceSection}>
            <Text style={styles.complianceTitle}>🔒 SOC 3 & GDPR Compliant</Text>
            <Text style={styles.complianceText}>
              This app follows industry-standard security practices and complies with international privacy regulations including GDPR, CCPA, and SOC 3 requirements.
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {privacyOptions.map((option) => {
              const IconComponent = option.icon;
              const isEnabled = settings[option.key];
              
              return (
                <View key={option.key} style={styles.optionCard}>
                  <View style={styles.optionHeader}>
                    <View style={styles.optionIconContainer}>
                      <IconComponent color={option.color} size={24} />
                    </View>
                    <View style={styles.optionContent}>
                      <View style={styles.optionTitleRow}>
                        <Text style={styles.optionTitle}>{option.title}</Text>
                        {option.key === 'dataCollection' && (
                          <Text style={styles.recommendedBadge}>Recommended</Text>
                        )}
                      </View>
                      <Text style={styles.optionDescription}>{option.description}</Text>
                    </View>
                    <Switch
                      value={isEnabled}
                      onValueChange={(value) => handleSettingChange(option.key, value)}
                      trackColor={{ false: '#767577', true: option.color }}
                      thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.policySection}>
            <TouchableOpacity style={styles.policyButton} onPress={openPrivacyPolicy}>
              <Text style={styles.policyButtonText}>Read Full Privacy Policy</Text>
            </TouchableOpacity>
            
            <Animated.View
              style={[
                styles.checkboxAnimationContainer,
                {
                  transform: [{ scale: pulseAnim }],
                  opacity: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.7, 1],
                  }),
                },
              ]}
            >
              <TouchableOpacity 
                style={[
                  styles.checkboxContainer,
                  !hasReadPolicy && styles.checkboxHighlight
                ]}
                onPress={() => setHasReadPolicy(!hasReadPolicy)}
              >
                {hasReadPolicy ? (
                  <CheckCircle color="#4CAF50" size={20} />
                ) : (
                  <XCircle color="#757575" size={20} />
                )}
                <Text style={[
                  styles.checkboxText,
                  !hasReadPolicy && styles.checkboxTextHighlight
                ]}>
                  I have read and understood the Privacy Policy
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <View style={styles.dataRightsSection}>
            <Text style={styles.dataRightsTitle}>Your Data Rights</Text>
            <Text style={styles.dataRightsText}>
              • Right to access your personal data{'\n'}
              • Right to correct inaccurate data{'\n'}
              • Right to delete your data{'\n'}
              • Right to data portability{'\n'}
              • Right to withdraw consent at any time
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.declineButton} onPress={onDecline}>
              <Text style={styles.declineButtonText}>Decline & Exit</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.acceptButton, !hasReadPolicy && styles.disabledButton]} 
              onPress={handleAccept}
              disabled={!hasReadPolicy}
            >
              <Text style={styles.acceptButtonText}>Accept & Continue</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footerText}>
            You can change these settings anytime in the app settings.
          </Text>
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
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#F8F8FF',
    textAlign: 'center',
    lineHeight: 22,
  },
  complianceSection: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(76, 175, 80, 0.3)',
  },
  complianceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginBottom: 8,
  },
  complianceText: {
    fontSize: 14,
    color: '#F8F8FF',
    lineHeight: 20,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  optionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionContent: {
    flex: 1,
    marginRight: 12,
  },
  optionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F8F8FF',
    flex: 1,
  },
  recommendedBadge: {
    fontSize: 12,
    color: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  optionDescription: {
    fontSize: 14,
    color: '#B0B0B0',
    lineHeight: 18,
  },
  policySection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  policyButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  policyButtonText: {
    color: '#FF6B6B',
    fontSize: 14,
    fontWeight: '600',
  },
  checkboxAnimationContainer: {
    borderRadius: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  checkboxHighlight: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  checkboxText: {
    color: '#F8F8FF',
    fontSize: 14,
    marginLeft: 8,
  },
  checkboxTextHighlight: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  dataRightsSection: {
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.2)',
  },
  dataRightsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 8,
  },
  dataRightsText: {
    fontSize: 14,
    color: '#F8F8FF',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  declineButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  declineButtonText: {
    color: '#F8F8FF',
    fontSize: 16,
    fontWeight: '600',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: 'rgba(255, 107, 107, 0.3)',
  },
  acceptButtonText: {
    color: '#0f0c29',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 12,
    color: '#B0B0B0',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 16,
  },
});