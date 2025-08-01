import { useState, useEffect } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { 
  PrivacySettings, 
  UserConsent, 
  DataProcessingLog, 
  SecurityAuditLog,
  ComplianceMetrics 
} from '@/types/privacy';

const CURRENT_PRIVACY_VERSION = '1.0.0';
const CONSENT_STORAGE_KEY = 'user-consent';
const PRIVACY_SETTINGS_KEY = 'privacy-settings';
const DATA_PROCESSING_LOG_KEY = 'data-processing-log';
const SECURITY_AUDIT_LOG_KEY = 'security-audit-log';

const defaultPrivacySettings: PrivacySettings = {
  dataCollection: true,
  analytics: false,
  crashReporting: false,
  personalizedContent: false,
  marketingCommunications: false,
  thirdPartySharing: false,
};

export const [PrivacyComplianceContext, usePrivacyCompliance] = createContextHook(() => {
  const [consent, setConsent] = useState<UserConsent | null>(null);
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>(defaultPrivacySettings);
  const [dataProcessingLogs, setDataProcessingLogs] = useState<DataProcessingLog[]>([]);
  const [securityAuditLogs, setSecurityAuditLogs] = useState<SecurityAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load stored consent and settings
  useEffect(() => {
    const loadPrivacyData = async () => {
      try {
        const [storedConsent, storedSettings, storedDataLogs, storedSecurityLogs] = await Promise.all([
          AsyncStorage.getItem(CONSENT_STORAGE_KEY),
          AsyncStorage.getItem(PRIVACY_SETTINGS_KEY),
          AsyncStorage.getItem(DATA_PROCESSING_LOG_KEY),
          AsyncStorage.getItem(SECURITY_AUDIT_LOG_KEY),
        ]);

        if (storedConsent) {
          const parsedConsent = JSON.parse(storedConsent);
          setConsent(parsedConsent);
          
          // Check if consent is still valid (not older than 12 months)
          const consentDate = new Date(parsedConsent.consentDate);
          const twelveMonthsAgo = new Date();
          twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
          
          if (consentDate < twelveMonthsAgo || parsedConsent.consentVersion !== CURRENT_PRIVACY_VERSION) {
            // Consent expired or version changed, reset to defaults
            setConsent(null);
            setPrivacySettings(defaultPrivacySettings);
            await logSecurityEvent('consent_change', 'Consent expired or version changed', 'medium');
          }
        }

        if (storedSettings) {
          setPrivacySettings(JSON.parse(storedSettings));
        }

        if (storedDataLogs) {
          setDataProcessingLogs(JSON.parse(storedDataLogs));
        }

        if (storedSecurityLogs) {
          setSecurityAuditLogs(JSON.parse(storedSecurityLogs));
        }
      } catch (error) {
        console.error('Failed to load privacy data:', error);
        await logSecurityEvent('security_incident', `Failed to load privacy data: ${error}`, 'high');
      } finally {
        setIsLoading(false);
      }
    };

    loadPrivacyData();
  }, []);

  // Save consent and settings
  const saveConsent = async (newConsent: UserConsent) => {
    try {
      await AsyncStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(newConsent));
      setConsent(newConsent);
      await logSecurityEvent('consent_change', 'User consent updated', 'low');
    } catch (error) {
      console.error('Failed to save consent:', error);
      await logSecurityEvent('security_incident', `Failed to save consent: ${error}`, 'high');
    }
  };

  const savePrivacySettings = async (newSettings: PrivacySettings) => {
    try {
      await AsyncStorage.setItem(PRIVACY_SETTINGS_KEY, JSON.stringify(newSettings));
      setPrivacySettings(newSettings);
      await logDataProcessing('update', 'preferences', 'User privacy settings update', 'consent', '12 months');
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
      await logSecurityEvent('security_incident', `Failed to save privacy settings: ${error}`, 'high');
    }
  };

  // Data processing logging
  const logDataProcessing = async (
    action: DataProcessingLog['action'],
    dataType: DataProcessingLog['dataType'],
    purpose: string,
    legalBasis: DataProcessingLog['legalBasis'],
    retention: string
  ) => {
    const log: DataProcessingLog = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      action,
      dataType,
      purpose,
      legalBasis,
      retention,
    };

    const updatedLogs = [...dataProcessingLogs, log];
    setDataProcessingLogs(updatedLogs);

    try {
      await AsyncStorage.setItem(DATA_PROCESSING_LOG_KEY, JSON.stringify(updatedLogs));
    } catch (error) {
      console.error('Failed to save data processing log:', error);
    }
  };

  // Security audit logging
  const logSecurityEvent = async (
    event: SecurityAuditLog['event'],
    details: string,
    severity: SecurityAuditLog['severity'],
    userId?: string
  ) => {
    const log: SecurityAuditLog = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      event,
      userId,
      details,
      severity,
    };

    const updatedLogs = [...securityAuditLogs, log];
    setSecurityAuditLogs(updatedLogs);

    try {
      await AsyncStorage.setItem(SECURITY_AUDIT_LOG_KEY, JSON.stringify(updatedLogs));
    } catch (error) {
      console.error('Failed to save security audit log:', error);
    }
  };

  // Grant consent with proper logging
  const grantConsent = async (settings: PrivacySettings) => {
    const userAgent = Platform.OS === 'web' ? navigator.userAgent : `${Platform.OS} ${Platform.Version}`;
    
    const newConsent: UserConsent = {
      consentVersion: CURRENT_PRIVACY_VERSION,
      consentDate: new Date().toISOString(),
      privacySettings: settings,
      userAgent,
    };

    await saveConsent(newConsent);
    await savePrivacySettings(settings);
    await logDataProcessing('create', 'preferences', 'Initial consent granted', 'consent', '12 months');
  };

  // Revoke consent and delete data
  const revokeConsent = async () => {
    try {
      // Clear all stored data
      await Promise.all([
        AsyncStorage.removeItem(CONSENT_STORAGE_KEY),
        AsyncStorage.removeItem(PRIVACY_SETTINGS_KEY),
        AsyncStorage.removeItem('sugar-favorites'),
        AsyncStorage.removeItem('education-favorites'),
      ]);

      setConsent(null);
      setPrivacySettings(defaultPrivacySettings);
      
      await logDataProcessing('delete', 'preferences', 'User revoked consent - data deleted', 'consent', 'immediate');
      await logSecurityEvent('data_deletion', 'User revoked consent and requested data deletion', 'medium');
    } catch (error) {
      console.error('Failed to revoke consent:', error);
      await logSecurityEvent('security_incident', `Failed to revoke consent: ${error}`, 'critical');
    }
  };

  // Export user data (GDPR Article 20)
  const exportUserData = async () => {
    try {
      const userData = {
        consent,
        privacySettings,
        favorites: await AsyncStorage.getItem('sugar-favorites'),
        educationFavorites: await AsyncStorage.getItem('education-favorites'),
        exportDate: new Date().toISOString(),
        dataProcessingLogs: dataProcessingLogs.slice(-50), // Last 50 logs for transparency
      };

      await logDataProcessing('export', 'preferences', 'User requested data export', 'consent', 'immediate');
      await logSecurityEvent('data_export', 'User exported personal data', 'low');
      
      return userData;
    } catch (error) {
      console.error('Failed to export user data:', error);
      await logSecurityEvent('security_incident', `Failed to export user data: ${error}`, 'high');
      throw error;
    }
  };

  // Check if user has given consent for specific data processing
  const hasConsentFor = (purpose: keyof PrivacySettings): boolean => {
    return consent !== null && privacySettings[purpose] === true;
  };

  // Get compliance metrics
  const getComplianceMetrics = (): ComplianceMetrics => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    
    const recentSecurityIncidents = securityAuditLogs.filter(
      log => new Date(log.timestamp) > thirtyDaysAgo && log.event === 'security_incident'
    ).length;

    return {
      totalUsers: consent ? 1 : 0,
      consentedUsers: consent ? 1 : 0,
      dataRetentionCompliance: 100, // Simplified for single user
      securityIncidents: recentSecurityIncidents,
      dataRequests: {
        access: dataProcessingLogs.filter(log => log.action === 'export').length,
        deletion: dataProcessingLogs.filter(log => log.action === 'delete').length,
        portability: dataProcessingLogs.filter(log => log.action === 'export').length,
      },
    };
  };

  // Clean up old logs (data minimization)
  const cleanupOldLogs = async () => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const filteredDataLogs = dataProcessingLogs.filter(
      log => new Date(log.timestamp) > sixMonthsAgo
    );
    
    const filteredSecurityLogs = securityAuditLogs.filter(
      log => new Date(log.timestamp) > sixMonthsAgo
    );

    if (filteredDataLogs.length !== dataProcessingLogs.length || 
        filteredSecurityLogs.length !== securityAuditLogs.length) {
      setDataProcessingLogs(filteredDataLogs);
      setSecurityAuditLogs(filteredSecurityLogs);
      
      await Promise.all([
        AsyncStorage.setItem(DATA_PROCESSING_LOG_KEY, JSON.stringify(filteredDataLogs)),
        AsyncStorage.setItem(SECURITY_AUDIT_LOG_KEY, JSON.stringify(filteredSecurityLogs)),
      ]);

      await logDataProcessing('delete', 'usage', 'Automated cleanup of old logs', 'legitimate_interest', 'immediate');
    }
  };

  // Run cleanup periodically
  useEffect(() => {
    if (!isLoading) {
      cleanupOldLogs();
    }
  }, [isLoading]);

  return {
    consent,
    privacySettings,
    dataProcessingLogs,
    securityAuditLogs,
    isLoading,
    grantConsent,
    revokeConsent,
    savePrivacySettings,
    exportUserData,
    hasConsentFor,
    logDataProcessing,
    logSecurityEvent,
    getComplianceMetrics,
    isConsentRequired: consent === null,
    isConsentValid: consent !== null && 
      new Date(consent.consentDate) > new Date(Date.now() - 365 * 24 * 60 * 60 * 1000) &&
      consent.consentVersion === CURRENT_PRIVACY_VERSION,
  };
});