export const PRIVACY_POLICY = {
  lastUpdated: '2025-01-27',
  version: '1.0.0',
  
  sections: [
    {
      title: 'Introduction',
      content: `
Welcome to Sugar Codex ("we," "our," or "us"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application. This policy complies with SOC 3, GDPR, CCPA, and other applicable privacy regulations.

By using Sugar Codex, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our application.
      `
    },
    {
      title: 'Information We Collect',
      content: `
We collect information you provide directly to us and information automatically collected when you use our app:

**Personal Information:**
• App preferences and settings
• Sugar and education favorites
• Usage patterns and interactions

**Technical Information:**
• Device information (OS, version, model)
• App performance data
• Crash reports (if enabled)
• Analytics data (if enabled)

**We do NOT collect:**
• Personal identification information (name, email, phone)
• Location data
• Health or medical information
• Payment information
      `
    },
    {
      title: 'How We Use Your Information',
      content: `
We use collected information for the following purposes:

**Essential Functions:**
• Provide core app functionality
• Save your preferences and favorites
• Improve app performance and stability

**Optional Functions (with your consent):**
• Analytics to understand usage patterns
• Crash reporting for bug fixes
• Personalized content recommendations
• App improvement and feature development

**Legal Basis (GDPR):**
• Consent: For optional data processing
• Legitimate Interest: For essential app functions
• Contract: To provide requested services
      `
    },
    {
      title: 'Data Sharing and Disclosure',
      content: `
We do not sell, trade, or rent your personal information. We may share information only in these limited circumstances:

**Service Providers:**
• Cloud storage providers (encrypted data only)
• Analytics services (anonymized data only)
• Crash reporting services (technical data only)

**Legal Requirements:**
• To comply with applicable laws
• To protect our rights and safety
• In response to legal process

**Business Transfers:**
• In connection with mergers or acquisitions (with notice)

**Research Partners:**
• Anonymized, aggregated data for health research (with explicit consent)
      `
    },
    {
      title: 'Data Security',
      content: `
We implement industry-standard security measures to protect your information:

**Technical Safeguards:**
• End-to-end encryption for data transmission
• AES-256 encryption for data storage
• Secure authentication protocols
• Regular security audits and penetration testing

**Organizational Safeguards:**
• SOC 3 compliance program
• Employee privacy training
• Access controls and monitoring
• Incident response procedures

**Data Minimization:**
• Collect only necessary information
• Automatic data deletion after retention periods
• Regular data cleanup and anonymization
      `
    },
    {
      title: 'Your Privacy Rights',
      content: `
You have the following rights regarding your personal information:

**Access Rights:**
• Request a copy of your personal data
• View data processing logs
• Understand how your data is used

**Control Rights:**
• Update or correct your information
• Withdraw consent at any time
• Opt-out of optional data processing

**Deletion Rights:**
• Request deletion of your personal data
• Account closure and data removal
• Right to be forgotten (GDPR)

**Portability Rights:**
• Export your data in a portable format
• Transfer data to another service
• Machine-readable data formats

**To exercise these rights, use the Privacy settings in the app or contact us at privacy@sugarcodex.com**
      `
    },
    {
      title: 'Data Retention',
      content: `
We retain your information for the following periods:

**User Preferences:** 12 months from last app use
**Favorites Data:** 12 months from last app use
**Analytics Data:** 6 months from collection
**Crash Reports:** 6 months from collection
**Security Logs:** 6 months from creation
**Data Processing Logs:** 6 months for transparency

**Automatic Deletion:**
• Data is automatically deleted after retention periods
• Users can request immediate deletion
• Anonymized data may be retained for research
      `
    },
    {
      title: 'International Data Transfers',
      content: `
Your information may be transferred to and processed in countries other than your own:

**Safeguards:**
• Standard Contractual Clauses (SCCs)
• Adequacy decisions where applicable
• Additional security measures for transfers

**Data Locations:**
• Primary storage: United States
• Backup storage: European Union
• Processing: United States and EU

**Your Rights:**
• Object to international transfers
• Request data localization where possible
• Receive information about transfer safeguards
      `
    },
    {
      title: 'Children\'s Privacy',
      content: `
Sugar Codex is not intended for children under 13 years of age:

**Age Restrictions:**
• Users must be 13 or older
• No knowing collection of children's data
• Parental consent required for users 13-16 in EU

**If We Learn of Children's Data:**
• Immediate deletion of the information
• Notification to parents where possible
• Review of data collection practices

**Parents' Rights:**
• Request information about child's data
• Request deletion of child's data
• Contact us with concerns
      `
    },
    {
      title: 'Compliance and Certifications',
      content: `
Sugar Codex maintains the following compliance standards:

**SOC 3 Compliance:**
• Annual third-party audits
• Security, availability, and confidentiality controls
• Public SOC 3 report available upon request

**GDPR Compliance:**
• EU representative appointed
• Data Protection Impact Assessments
• Privacy by design principles

**CCPA Compliance:**
• California consumer rights respected
• Do Not Sell My Personal Information
• Transparent privacy practices

**Other Standards:**
• ISO 27001 security management
• NIST Cybersecurity Framework
• Regular compliance assessments
      `
    },
    {
      title: 'Updates to This Policy',
      content: `
We may update this Privacy Policy from time to time:

**Notification:**
• In-app notification of material changes
• Email notification (if provided)
• 30-day notice period for significant changes

**Version Control:**
• All versions archived and accessible
• Clear change logs maintained
• Effective date clearly stated

**Your Options:**
• Review changes before they take effect
• Withdraw consent if you disagree
• Continue using app constitutes acceptance
      `
    },
    {
      title: 'Contact Information',
      content: `
For privacy-related questions or concerns:

**Privacy Officer:**
Email: privacy@sugarcodex.com
Response time: 72 hours for general inquiries, 30 days for formal requests

**Data Protection Officer (EU):**
Email: dpo@sugarcodex.com
Address: [EU Representative Address]

**Supervisory Authorities:**
• EU: Contact your local data protection authority
• California: California Attorney General's Office
• Other jurisdictions: Relevant privacy regulators

**Mailing Address:**
Sugar Codex Privacy Team
[Company Address]
[City, State, ZIP Code]
      `
    }
  ]
};

export const CONSENT_PURPOSES = {
  dataCollection: {
    title: 'Essential Data Collection',
    description: 'Store your favorites and preferences locally on your device',
    required: true,
    legalBasis: 'consent',
    retention: '12 months',
    dataTypes: ['preferences', 'favorites'],
  },
  analytics: {
    title: 'Usage Analytics',
    description: 'Help us improve the app by sharing anonymous usage statistics',
    required: false,
    legalBasis: 'consent',
    retention: '6 months',
    dataTypes: ['usage_patterns', 'feature_usage'],
  },
  crashReporting: {
    title: 'Crash Reporting',
    description: 'Automatically report crashes to help us fix bugs faster',
    required: false,
    legalBasis: 'consent',
    retention: '6 months',
    dataTypes: ['crash_logs', 'device_info'],
  },
  personalizedContent: {
    title: 'Personalized Content',
    description: 'Customize content recommendations based on your preferences',
    required: false,
    legalBasis: 'consent',
    retention: '12 months',
    dataTypes: ['preferences', 'usage_patterns'],
  },
  marketingCommunications: {
    title: 'Marketing Communications',
    description: 'Receive updates about new features and health tips',
    required: false,
    legalBasis: 'consent',
    retention: '24 months',
    dataTypes: ['preferences', 'contact_info'],
  },
  thirdPartySharing: {
    title: 'Third-Party Sharing',
    description: 'Share anonymized data with research partners for health studies',
    required: false,
    legalBasis: 'consent',
    retention: '12 months',
    dataTypes: ['anonymized_usage', 'aggregated_data'],
  },
} as const;

export const DISCLAIMER_CONTENT = {
  sections: [
    {
      title: 'Medical & Health Disclaimer',
      content: `
• This app is for educational and informational purposes only
• NOT intended as medical advice, diagnosis, or treatment
• Always consult qualified healthcare professionals for medical decisions
• Individual health needs vary - personalized medical advice required
• Emergency situations require immediate professional medical attention
• Recommendations may change - verify information with authoritative sources
• Report any inaccuracies through proper channels
      `
    },
    {
      title: 'Dietary & Nutritional Disclaimer',
      content: `
• This app does NOT provide personalized dietary advice
• Individual nutritional needs vary significantly
• Consult registered dietitians for personalized nutrition plans
• Consider allergies, medical conditions, and medications
• Pregnant/nursing women should consult healthcare providers
• Children's nutritional needs require professional guidance
      `
    },
    {
      title: 'Regulatory Compliance',
      content: `
• This app complies with applicable laws in our jurisdiction
• Users responsible for compliance in their local jurisdiction
• Health claims may not be evaluated by regulatory authorities
• Not intended to diagnose, treat, cure, or prevent any disease
• Dietary supplements and health products require professional guidance
• International users subject to local laws and regulations
      `
    },
    {
      title: 'Technology Limitations',
      content: `
• App functionality depends on device capabilities and internet connectivity
• We cannot guarantee uninterrupted or error-free operation
• Data accuracy depends on user input and external sources
• Regular updates may change functionality or content
• Backup important data - we're not responsible for data loss
• Third-party integrations subject to their own terms and limitations
      `
    },
    {
      title: 'Privacy & Data Protection',
      content: `
• Your privacy is important - see our Privacy Policy for details
• Data processing complies with applicable privacy laws
• You control your personal data and consent preferences
• We implement appropriate security measures
• Data breaches will be reported as required by law
• You have rights regarding your personal data
      `
    },
    {
      title: 'Indemnification',
      content: `
By using this app, you agree to indemnify and hold harmless the developers, contributors, and associated parties from any claims, damages, or expenses arising from:

• Your use or misuse of the application
• Violation of these terms or applicable laws
• Health decisions made based on app information
• Any content you submit or share through the app
• Third-party claims related to your app usage
      `
    },
    {
      title: 'Governing Law & Jurisdiction',
      content: `
• These terms governed by laws of [Your Jurisdiction]
• Disputes subject to exclusive jurisdiction of [Your Courts]
• If any provision is unenforceable, remainder remains in effect
• These terms constitute the entire agreement
• Updates to terms will be communicated appropriately
• Continued use after changes constitutes acceptance
      `
    }
  ],
  finalWarning: 'BY PROCEEDING, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS. YOU UNDERSTAND THE RISKS AND LIMITATIONS, AND YOU AGREE TO USE THIS APP AT YOUR OWN RISK.'
};