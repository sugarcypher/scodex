import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { sugars, sugarCategories, getSugarsByCategory } from '@/data/sugars';
import { colors } from '@/constants/colors';
import SugarCard from '@/components/SugarCard';
import { SugarCategory } from '@/types/sugar';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [category, setCategory] = useState<SugarCategory | null>(null);
  const [categorySugars, setCategorySugars] = useState(getSugarsByCategory(id || ''));
  
  useEffect(() => {
    if (id) {
      const foundCategory = sugarCategories.find(cat => cat.id === id);
      if (foundCategory) {
        setCategory(foundCategory);
      }
      
      setCategorySugars(getSugarsByCategory(id));
    }
  }, [id]);
  
  const navigateToSugar = (sugarId: string) => {
    router.push(`/sugar/${sugarId}`);
  };
  
  if (!category) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: category.name,
        headerStyle: {
          backgroundColor: category.color,
        },
      }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: category.color + '20' }]}>
          <Text style={styles.title}>{category.name}</Text>
          <Text style={styles.description}>{category.description}</Text>
        </View>
        
        <View style={styles.sugarsContainer}>
          <Text style={styles.sectionTitle}>
            {categorySugars.length} {categorySugars.length === 1 ? 'Sugar' : 'Sugars'} in this Category
          </Text>
          
          {categorySugars.map((sugar) => (
            <SugarCard
              key={sugar.id}
              sugar={sugar}
              onPress={() => navigateToSugar(sugar.id)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
  sugarsContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 16,
  },
});