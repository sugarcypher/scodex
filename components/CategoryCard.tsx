import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { SugarCategory } from '@/types/sugar';
import { colors, shadows } from '@/constants/colors';

interface CategoryCardProps {
  category: SugarCategory;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  return (
    <Pressable 
      style={[styles.card, shadows.small, { borderLeftColor: category.color }]} 
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.description}>{category.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});