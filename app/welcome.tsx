import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { GraduationCap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DefinitionsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Definitions', headerShown: true }} />
      <View style={styles.container}>
      <LinearGradient
        colors={['#0f0c29', '#24243e', '#302b63', '#0f0c29']}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoContainer}>
              <GraduationCap color="#FF6B6B" size={48} />
            </View>
            <Text style={styles.title}>Sugar Codex</Text>
            <Text style={styles.subtitle}>Decoding sugar & its impact</Text>
            <Text style={styles.byline}>&quot;Knowledge is the antidote to sweet deception&quot;</Text>
          </View>

          {/* Definitions Section */}
          <View style={styles.definitionsSection}>
            {/* Metasugar Definition */}
            <View style={styles.definitionCard}>
              <Text style={styles.termTitle}>Metasugar</Text>
              <Text style={styles.pronunciation}>/met·uh·shu·gr/</Text>
              <Text style={styles.partOfSpeech}>(n.)</Text>
              
              <Text style={styles.definition}>
                Any substance that is not chemically a sugar at ingestion but is converted by the body—through enzymatic or hepatic processes—into glucose, fructose, or another glycemic molecule.
              </Text>
              
              <Text style={styles.includes}>
                → Includes refined starches, fast carbs, maltodextrin, certain alcohol sugars, and deceptive health foods.
              </Text>
              
              <View style={styles.exampleContainer}>
                <Text style={styles.example}>
                  &quot;Whole wheat bread is loaded with metasugar. Just because it&apos;s brown doesn&apos;t mean it&apos;s benign.&quot;
                </Text>
              </View>
            </View>

            {/* Transglycate Definition */}
            <View style={styles.definitionCard}>
              <Text style={styles.termTitle}>Transglycate</Text>
              <Text style={styles.pronunciation}>/tranz·gli·kayt/</Text>
              <Text style={styles.partOfSpeech}>(v.)</Text>
              
              <Text style={styles.definition}>
                To undergo or cause glycemic transformation from a non-sugar input; to metabolically convert a compound into sugar in the body.
              </Text>
              
              <Text style={styles.etymology}>
                → From Latin trans- (&quot;across, change&quot;) + glycate (&quot;to bond or produce sugar&quot;).
              </Text>
              
              <Text style={styles.includes}>
                → Can be applied to both foods and physiological processes.
              </Text>
              
              <View style={styles.exampleContainer}>
                <Text style={styles.example}>
                  &quot;That &apos;low-carb&apos; bar transglycates faster than table sugar.&quot;
                </Text>
              </View>

              {/* Variant Forms */}
              <View style={styles.variantSection}>
                <Text style={styles.variantTitle}>🔁 Variant Forms:</Text>
                <Text style={styles.variant}>• Transglycation (n.): the act or process</Text>
                <Text style={styles.variant}>• Transglycating (adj./v.): describing behavior or capacity</Text>
                <Text style={styles.variant}>• Transglycator (n.): a substance or ingredient designed or known to transglycate</Text>
              </View>
            </View>
          </View>


        </ScrollView>
      </LinearGradient>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 107, 107, 0.3)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#FFD93D',
    marginBottom: 12,
    textAlign: 'center',
  },
  byline: {
    fontSize: 14,
    color: '#FF8E53',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  definitionsSection: {
    marginBottom: 40,
  },
  definitionCard: {
    backgroundColor: 'rgba(255, 107, 107, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.15)',
  },
  termTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 4,
  },
  pronunciation: {
    fontSize: 16,
    color: '#FFD93D',
    marginBottom: 2,
  },
  partOfSpeech: {
    fontSize: 14,
    color: '#FF8E53',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  definition: {
    fontSize: 16,
    color: '#F8F8FF',
    lineHeight: 24,
    marginBottom: 12,
  },
  includes: {
    fontSize: 14,
    color: '#FFD93D',
    lineHeight: 20,
    marginBottom: 12,
  },
  etymology: {
    fontSize: 14,
    color: '#FFD93D',
    lineHeight: 20,
    marginBottom: 8,
  },
  exampleContainer: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FF6B6B',
  },
  example: {
    fontSize: 14,
    color: '#F8F8FF',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  variantSection: {
    marginTop: 8,
  },
  variantTitle: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginBottom: 8,
  },
  variant: {
    fontSize: 13,
    color: '#FFD93D',
    lineHeight: 18,
    marginBottom: 4,
  },

});