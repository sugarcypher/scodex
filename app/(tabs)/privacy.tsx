import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Share,
} from 'react-native';
import { Stack } from 'expo-router';
import { 
  Shield, 
  Download, 
  Trash2, 
  FileText, 
  BarChart3, 
  Eye,
  Users,
  Mail,
  Share2,
  Lock,
  AlertTriangle,
} from 'lucide-react-native';
import { usePrivacyCompliance } from '@/hooks/privacy-compliance';
import { PrivacySettings } from '@/types/privacy';

export default function PrivacyScreen() {
  const {
    privacySettings,
    savePrivacySettings,
    exportUserData,
    revokeConsent,
    getComplianceMetrics,
    dataProcessingLogs,
    securityAuditLogs,
  } = usePrivacyCompliance();

  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleSettingChange = async (key: keyof PrivacySettings, value: boolean) => {
    const newSettings = { ...privacySettings, [key]: value };
    await savePrivacySettings(newSettings);
  };

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const userData = await exportUserData();
      const dataString = JSON.stringify(userData, null, 2);
      
      await Share.share({
        message: `Your Sugar Codex Data Export\\n\\nExported on: ${new Date().toLocaleDateString()}\\n\\nData: ${dataString}`,
        title: 'Sugar Codex Data Export',
      });
    } catch (error) {
      Alert.alert('Export Failed', 'Unable to export your data. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'This will permanently delete all your data and revoke consent. This action cannot be undone. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All Data',
          style: 'destructive',
          onPress: async () => {
            await revokeConsent();
            Alert.alert('Data Deleted', 'All your data has been permanently deleted.');
          },
        },
      ]
    );
  };

  const showComplianceReport = () => {
    const metrics = getComplianceMetrics();
    Alert.alert(
      'Compliance Report',
      `Total Users: ${metrics.totalUsers}\\nConsented Users: ${metrics.consentedUsers}\\nData Retention Compliance: ${metrics.dataRetentionCompliance}%\\nSecurity Incidents (30 days): ${metrics.securityIncidents}\\n\\nData Requests:\\n• Access: ${metrics.dataRequests.access}\\n• Deletion: ${metrics.dataRequests.deletion}\\n• Portability: ${metrics.dataRequests.portability}`,
      [{ text: 'OK' }]
    );
  };

  const privacyOptions = [
    {
      key: 'dataCollection' as keyof PrivacySettings,
      title: 'Essential Data Collection',
      description: 'Store your favorites and preferences locally',
      icon: Lock,
      required: true,
      color: '#4CAF50',
    },
    {
      key: 'analytics' as keyof PrivacySettings,
      title: 'Usage Analytics',
      description: 'Anonymous usage statistics to improve the app',
      icon: Eye,
      required: false,
      color: '#2196F3',
    },
    {
      key: 'crashReporting' as keyof PrivacySettings,
      title: 'Crash Reporting',
      description: 'Automatically report crashes for bug fixes',
      icon: Shield,
      required: false,
      color: '#FF9800',
    },
    {
      key: 'personalizedContent' as keyof PrivacySettings,
      title: 'Personalized Content',
      description: 'Customize recommendations based on preferences',
      icon: Users,
      required: false,
      color: '#9C27B0',
    },
    {
      key: 'marketingCommunications' as keyof PrivacySettings,
      title: 'Marketing Communications',
      description: 'Updates about new features and health tips',
      icon: Mail,
      required: false,
      color: '#607D8B',
    },
    {
      key: 'thirdPartySharing' as keyof PrivacySettings,
      title: 'Third-Party Sharing',
      description: 'Share anonymized data for health research',
      icon: Share2,
      required: false,
      color: '#795548',
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen 
        options={{ 
          title: 'Privacy & Security',
          headerStyle: { backgroundColor: '#9C27B0' },
          headerTintColor: '#fff',
        }} 
      />

      <View style={styles.header}>
        <Shield color="#9C27B0" size={32} />
        <Text style={styles.title}>Privacy & Data Protection</Text>
        <Text style={styles.subtitle}>
          Manage your privacy settings and data preferences
        </Text>
      </View>

      <View style={styles.complianceCard}>
        <View style={styles.complianceHeader}>
          <Shield color="#4CAF50" size={24} />
          <Text style={styles.complianceTitle}>SOC 3 & GDPR Compliant</Text>
        </View>
        <Text style={styles.complianceText}>
          Your data is protected by industry-standard security measures and international privacy regulations.
        </Text>
        <TouchableOpacity style={styles.complianceButton} onPress={showComplianceReport}>
          <BarChart3 color="#4CAF50" size={16} />
          <Text style={styles.complianceButtonText}>View Compliance Report</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Processing Preferences</Text>
        {privacyOptions.map((option) => {
          const IconComponent = option.icon;
          const isEnabled = privacySettings[option.key];
          
          return (
            <View key={option.key} style={styles.optionCard}>
              <View style={styles.optionHeader}>
                <View style={[styles.optionIcon, { backgroundColor: `${option.color}20` }]}>
                  <IconComponent color={option.color} size={20} />
                </View>
                <View style={styles.optionContent}>
                  <View style={styles.optionTitleRow}>
                    <Text style={styles.optionTitle}>{option.title}</Text>
                    {option.required && (
                      <Text style={styles.requiredBadge}>Required</Text>
                    )}
                  </View>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <Switch
                  value={isEnabled}
                  onValueChange={(value) => handleSettingChange(option.key, value)}
                  disabled={option.required}
                  trackColor={{ false: '#E0E0E0', true: option.color }}
                  thumbColor={isEnabled ? '#ffffff' : '#f4f3f4'}
                />
              </View>
            </View>
          );
        })}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Data Rights</Text>
        
        <TouchableOpacity 
          style={styles.actionCard} 
          onPress={handleExportData}
          disabled={isExporting}
        >
          <View style={styles.actionIcon}>
            <Download color="#2196F3" size={20} />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Export Your Data</Text>
            <Text style={styles.actionDescription}>
              Download all your personal data in a portable format
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionCard} onPress={handleDeleteAllData}>
          <View style={[styles.actionIcon, { backgroundColor: '#FFEBEE' }]}>
            <Trash2 color="#F44336" size={20} />
          </View>
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: '#F44336' }]}>Delete All Data</Text>
            <Text style={styles.actionDescription}>
              Permanently delete all your data and revoke consent
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transparency & Audit</Text>
        
        <View style={styles.auditCard}>
          <View style={styles.auditHeader}>
            <FileText color="#9C27B0" size={20} />
            <Text style={styles.auditTitle}>Data Processing Log</Text>
          </View>
          <Text style={styles.auditText}>
            {dataProcessingLogs.length} data processing activities logged
          </Text>
          <Text style={styles.auditSubtext}>
            Last activity: {dataProcessingLogs.length > 0 
              ? new Date(dataProcessingLogs[dataProcessingLogs.length - 1].timestamp).toLocaleDateString()
              : 'None'
            }
          </Text>
        </View>

        <View style={styles.auditCard}>
          <View style={styles.auditHeader}>
            <AlertTriangle color="#FF9800" size={20} />
            <Text style={styles.auditTitle}>Security Audit Log</Text>
          </View>
          <Text style={styles.auditText}>
            {securityAuditLogs.length} security events logged
          </Text>
          <Text style={styles.auditSubtext}>
            Last event: {securityAuditLogs.length > 0 
              ? new Date(securityAuditLogs[securityAuditLogs.length - 1].timestamp).toLocaleDateString()
              : 'None'
            }
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Data retention: 12 months for preferences, 6 months for logs
        </Text>
        <Text style={styles.footerText}>
          Contact: privacy@sugarcodex.com for data protection inquiries
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 22,
  },
  complianceCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  complianceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  complianceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
    marginLeft: 8,
  },
  complianceText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 12,
  },
  complianceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  complianceButtonText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
    marginLeft: 6,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  optionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
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
    color: '#333333',
    flex: 1,
  },
  requiredBadge: {
    fontSize: 12,
    color: '#F44336',
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 18,
  },
  auditCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    padding: 16,
  },
  auditHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  auditTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 8,
  },
  auditText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  auditSubtext: {
    fontSize: 12,
    color: '#666666',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 4,
  },
});