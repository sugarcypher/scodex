import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { sugarCategories } from '@/data/sugars';
import CategoryCard from '@/components/CategoryCard';
import { colors } from '@/constants/colors';

export default function HomeScreen() {
  const router = useRouter();
  
  const navigateToCategory = (categoryId: string) => {
    router.push(`/category/${categoryId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Sugar Education Library</Text>
          <Text style={styles.subtitle}>
            Learn about different types of sugars, their nutritional values, and health impacts
          </Text>
        </View>
        
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Sugar Categories</Text>
          {sugarCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onPress={() => navigateToCategory(category.id)}
            />
          ))}
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Why Sugar Education Matters</Text>
          <Text style={styles.infoText}>
            Not all sugars are created equal. Understanding the differences between natural, 
            processed, and artificial sugars can help you make healthier choices for you and your family.
          </Text>
          <Text style={styles.infoText}>
            Explore our library to learn about glycemic index, processing methods, and the health 
            impacts of different sweeteners.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.primaryDark,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 15,
    color: colors.text,
    marginBottom: 12,
    lineHeight: 22,
  },
});