import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable } from 'react-native';
import { colors, shadows } from '@/constants/colors';
import { Search, ChevronDown, ChevronUp, BookOpen } from 'lucide-react-native';
import { router } from 'expo-router';

interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation?: string;
  definition: string;
  category: 'sugar' | 'health' | 'processing' | 'metabolism' | 'measurement';
  examples?: string[];
  relatedTerms?: string[];
}

const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'metasugar',
    term: 'Metasugar',
    pronunciation: '/met·uh·shu·gr/',
    definition: 'Any substance that is not chemically a sugar at ingestion but is converted by the body—through enzymatic or hepatic processes—into glucose, fructose, or another glycemic molecule.',
    category: 'sugar',
    examples: ['Refined starches', 'Fast carbs', 'Maltodextrin', 'Certain alcohol sugars', 'Deceptive health foods'],
    relatedTerms: ['Transglycate', 'Glycemic Index']
  },
  {
    id: 'transglycate',
    term: 'Transglycate',
    pronunciation: '/tranz·gli·kayt/',
    definition: 'To undergo or cause glycemic transformation from a non-sugar input; to metabolically convert a compound into sugar in the body.',
    category: 'metabolism',
    examples: ['That low-carb bar transglycates faster than table sugar'],
    relatedTerms: ['Metasugar', 'Glycemic Response']
  },
  {
    id: 'glycemic-index',
    term: 'Glycemic Index (GI)',
    definition: 'A ranking system that measures how quickly carbohydrate-containing foods raise blood glucose levels compared to pure glucose (GI = 100).',
    category: 'measurement',
    examples: ['Low GI: 55 or less', 'Medium GI: 56-69', 'High GI: 70 or above'],
    relatedTerms: ['Glycemic Load', 'Blood Sugar Spike']
  },
  {
    id: 'glycemic-load',
    term: 'Glycemic Load (GL)',
    definition: 'A measure that considers both the glycemic index of a food and the amount of carbohydrates in a serving, providing a more realistic picture of blood sugar impact.',
    category: 'measurement',
    examples: ['GL = (GI × carbs per serving) ÷ 100'],
    relatedTerms: ['Glycemic Index', 'Portion Control']
  },
  {
    id: 'added-sugars',
    term: 'Added Sugars',
    definition: 'Sugars and syrups that are added to foods or beverages during processing or preparation, not including naturally occurring sugars in fruits and milk.',
    category: 'sugar',
    examples: ['High fructose corn syrup', 'Cane sugar', 'Honey added to products', 'Agave nectar'],
    relatedTerms: ['Free Sugars', 'Natural Sugars']
  },
  {
    id: 'free-sugars',
    term: 'Free Sugars',
    definition: 'Monosaccharides and disaccharides added to foods by manufacturers, cooks, or consumers, plus sugars naturally present in honey, syrups, and fruit juices.',
    category: 'sugar',
    examples: ['Table sugar in coffee', 'Honey', 'Fruit juice concentrate', 'Maple syrup'],
    relatedTerms: ['Added Sugars', 'WHO Guidelines']
  },
  {
    id: 'insulin-resistance',
    term: 'Insulin Resistance',
    definition: 'A condition where cells become less responsive to insulin, requiring higher levels to maintain normal blood glucose, often leading to Type 2 diabetes.',
    category: 'health',
    examples: ['Prediabetes', 'Metabolic syndrome', 'PCOS'],
    relatedTerms: ['Type 2 Diabetes', 'Metabolic Syndrome']
  },
  {
    id: 'blood-sugar-spike',
    term: 'Blood Sugar Spike',
    definition: 'A rapid increase in blood glucose levels after eating, typically occurring within 1-2 hours of consuming high-glycemic foods.',
    category: 'metabolism',
    examples: ['Post-meal glucose over 180 mg/dL', 'Energy crash after eating candy'],
    relatedTerms: ['Glycemic Response', 'Postprandial Glucose']
  },
  {
    id: 'fructose',
    term: 'Fructose',
    definition: 'A simple sugar found naturally in fruits and honey, but also used in processed foods as high fructose corn syrup. Metabolized primarily in the liver.',
    category: 'sugar',
    examples: ['Fruit sugar', 'High fructose corn syrup', 'Agave nectar'],
    relatedTerms: ['Glucose', 'Sucrose', 'HFCS']
  },
  {
    id: 'glucose',
    term: 'Glucose',
    definition: 'The primary sugar used by the body for energy. All carbohydrates are eventually broken down into glucose in the bloodstream.',
    category: 'sugar',
    examples: ['Blood sugar', 'Dextrose', 'Grape sugar'],
    relatedTerms: ['Fructose', 'Blood Glucose', 'Dextrose']
  },
  {
    id: 'sucrose',
    term: 'Sucrose',
    definition: 'Common table sugar composed of one glucose and one fructose molecule bonded together. Derived from sugar cane or sugar beets.',
    category: 'sugar',
    examples: ['Table sugar', 'Cane sugar', 'Beet sugar'],
    relatedTerms: ['Glucose', 'Fructose', 'Disaccharide']
  },
  {
    id: 'hfcs',
    term: 'High Fructose Corn Syrup (HFCS)',
    definition: 'A liquid sweetener made from corn starch, containing varying ratios of fructose and glucose. Common in processed foods and beverages.',
    category: 'sugar',
    examples: ['HFCS-42 (42% fructose)', 'HFCS-55 (55% fructose)', 'Soft drinks', 'Processed foods'],
    relatedTerms: ['Fructose', 'Corn Syrup', 'Processed Foods']
  },
  {
    id: 'sugar-alcohols',
    term: 'Sugar Alcohols',
    definition: 'Low-calorie sweeteners that are neither sugars nor alcohols, but carbohydrates with a chemical structure similar to both. Often cause digestive issues.',
    category: 'sugar',
    examples: ['Erythritol', 'Xylitol', 'Sorbitol', 'Mannitol'],
    relatedTerms: ['Artificial Sweeteners', 'Polyols']
  },
  {
    id: 'ages',
    term: 'Advanced Glycation End Products (AGEs)',
    definition: 'Harmful compounds formed when proteins or fats combine with sugars, contributing to aging, inflammation, and chronic diseases.',
    category: 'health',
    examples: ['Browned/caramelized foods', 'Grilled meats', 'Processed foods'],
    relatedTerms: ['Glycation', 'Inflammation', 'Oxidative Stress']
  },
  {
    id: 'metabolic-syndrome',
    term: 'Metabolic Syndrome',
    definition: 'A cluster of conditions including high blood pressure, high blood sugar, excess abdominal fat, and abnormal cholesterol levels, increasing disease risk.',
    category: 'health',
    examples: ['Insulin resistance', 'Abdominal obesity', 'High triglycerides'],
    relatedTerms: ['Insulin Resistance', 'Type 2 Diabetes', 'Cardiovascular Disease']
  },
  {
    id: 'refined-sugar',
    term: 'Refined Sugar',
    definition: 'Sugar that has been processed to remove impurities, minerals, and fiber, resulting in pure sucrose with no nutritional value beyond calories.',
    category: 'processing',
    examples: ['White sugar', 'Powdered sugar', 'Brown sugar (with molasses added back)'],
    relatedTerms: ['Raw Sugar', 'Processing', 'Empty Calories']
  },
  {
    id: 'natural-sugars',
    term: 'Natural Sugars',
    definition: 'Sugars that occur naturally in whole foods like fruits, vegetables, and dairy, typically accompanied by fiber, vitamins, and minerals.',
    category: 'sugar',
    examples: ['Fructose in apples', 'Lactose in milk', 'Glucose in vegetables'],
    relatedTerms: ['Added Sugars', 'Whole Foods', 'Fiber']
  },
  {
    id: 'empty-calories',
    term: 'Empty Calories',
    definition: 'Calories from foods that provide energy but little to no essential nutrients like vitamins, minerals, or fiber.',
    category: 'health',
    examples: ['Soda', 'Candy', 'White bread', 'Alcohol'],
    relatedTerms: ['Nutrient Density', 'Refined Foods']
  },
  {
    id: 'postprandial',
    term: 'Postprandial Glucose',
    definition: 'Blood glucose levels measured after eating, typically 1-2 hours post-meal. Important indicator of metabolic health.',
    category: 'measurement',
    examples: ['Normal: <140 mg/dL at 2 hours', 'Prediabetic: 140-199 mg/dL', 'Diabetic: ≥200 mg/dL'],
    relatedTerms: ['Blood Sugar Spike', 'Glucose Tolerance']
  }
];

const categories = {
  sugar: 'Sugar Types',
  health: 'Health Effects',
  processing: 'Processing',
  metabolism: 'Metabolism',
  measurement: 'Measurement'
};

export default function GlossaryScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const filteredTerms = glossaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (termId: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termId)) {
      newExpanded.delete(termId);
    } else {
      newExpanded.add(termId);
    }
    setExpandedTerms(newExpanded);
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      sugar: colors.primary,
      health: colors.error,
      processing: colors.processed,
      metabolism: colors.good,
      measurement: colors.secondary
    };
    return colorMap[category as keyof typeof colorMap] || colors.textSecondary;
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        {/* Definitions Button */}
        <Pressable 
          style={[styles.definitionsButton, shadows.small]}
          onPress={() => router.push('/welcome')}
        >
          <BookOpen size={20} color={colors.primary} />
          <Text style={styles.definitionsButtonText}>View Key Definitions</Text>
        </Pressable>
        <View style={[styles.searchBox, shadows.small]}>
          <Search size={20} color={colors.textSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search terms..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.textSecondary}
          />
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryFilter}
          contentContainerStyle={styles.categoryFilterContent}
        >
          <Pressable
            style={[
              styles.categoryButton,
              selectedCategory === 'all' && styles.categoryButtonActive
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text style={[
              styles.categoryButtonText,
              selectedCategory === 'all' && styles.categoryButtonTextActive
            ]}>All</Text>
          </Pressable>
          
          {Object.entries(categories).map(([key, label]) => (
            <Pressable
              key={key}
              style={[
                styles.categoryButton,
                selectedCategory === key && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(key)}
            >
              <Text style={[
                styles.categoryButtonText,
                selectedCategory === key && styles.categoryButtonTextActive
              ]}>{label}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.termsList}>
        <Text style={styles.resultsCount}>
          {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
        </Text>
        
        {filteredTerms.map((term) => {
          const isExpanded = expandedTerms.has(term.id);
          return (
            <Pressable
              key={term.id}
              style={[styles.termCard, shadows.small]}
              onPress={() => toggleExpanded(term.id)}
            >
              <View style={styles.termHeader}>
                <View style={styles.termTitleContainer}>
                  <Text style={styles.termTitle}>{term.term}</Text>
                  {term.pronunciation && (
                    <Text style={styles.pronunciation}>{term.pronunciation}</Text>
                  )}
                  <View style={[
                    styles.categoryTag,
                    { backgroundColor: getCategoryColor(term.category) + '20' }
                  ]}>
                    <Text style={[
                      styles.categoryTagText,
                      { color: getCategoryColor(term.category) }
                    ]}>
                      {categories[term.category as keyof typeof categories]}
                    </Text>
                  </View>
                </View>
                {isExpanded ? (
                  <ChevronUp size={20} color={colors.textSecondary} />
                ) : (
                  <ChevronDown size={20} color={colors.textSecondary} />
                )}
              </View>
              
              <Text style={styles.definition}>{term.definition}</Text>
              
              {isExpanded && (
                <View style={styles.expandedContent}>
                  {term.examples && term.examples.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Examples:</Text>
                      {term.examples.map((example, index) => (
                        <View key={index} style={styles.bulletPoint}>
                          <View style={styles.bullet} />
                          <Text style={styles.bulletText}>{example}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <View style={styles.section}>
                      <Text style={styles.sectionTitle}>Related Terms:</Text>
                      <View style={styles.relatedTerms}>
                        {term.relatedTerms.map((relatedTerm, index) => (
                          <View key={index} style={styles.relatedTermTag}>
                            <Text style={styles.relatedTermText}>{relatedTerm}</Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              )}
            </Pressable>
          );
        })}
        
        {filteredTerms.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No terms found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or category filter
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  definitionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  definitionsButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 8,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.text,
  },
  categoryFilter: {
    maxHeight: 50,
  },
  categoryFilterContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  categoryButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500' as const,
    color: colors.text,
  },
  categoryButtonTextActive: {
    color: 'white',
  },
  termsList: {
    flex: 1,
    padding: 16,
  },
  resultsCount: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
    fontWeight: '500' as const,
  },
  termCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  termHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  termTitleContainer: {
    flex: 1,
    marginRight: 12,
  },
  termTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 4,
  },
  pronunciation: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 8,
  },
  categoryTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryTagText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  definition: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 8,
  },
  bulletPoint: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginTop: 7,
    marginRight: 12,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  relatedTerms: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  relatedTermTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  relatedTermText: {
    fontSize: 14,
    color: colors.primaryDark,
    fontWeight: '500' as const,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});