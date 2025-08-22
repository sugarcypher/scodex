export interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  crashReporting: boolean;
  personalizedContent: boolean;
  marketingCommunications: boolean;
  thirdPartySharing: boolean;
}

export interface UserConsent {
  consentVersion: string;
  consentDate: string;
  privacySettings: PrivacySettings;
  ipAddress?: string;
  userAgent?: string;
}

export interface DataProcessingLog {
  id: string;
  timestamp: string;
  action: 'create' | 'read' | 'update' | 'delete' | 'export' | 'anonymize';
  dataType: 'favorites' | 'preferences' | 'usage' | 'device_info';
  purpose: string;
  legalBasis: 'consent' | 'legitimate_interest' | 'contract' | 'legal_obligation';
  retention: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  event: 'data_access' | 'consent_change' | 'data_export' | 'data_deletion' | 'security_incident';
  userId?: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export interface ComplianceMetrics {
  totalUsers: number;
  consentedUsers: number;
  dataRetentionCompliance: number;
  securityIncidents: number;
  dataRequests: {
    access: number;
    deletion: number;
    portability: number;
  };
}