import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Sugar } from '@/types/sugar';
import { colors, shadows } from '@/constants/colors';
import { getGlycemicIndexRating, getProcessingLevelRating } from '@/data/sugars';

interface SugarCardProps {
  sugar: Sugar;
  onPress: () => void;
}

export default function SugarCard({ sugar, onPress }: SugarCardProps) {
  const giRating = getGlycemicIndexRating(sugar.glycemicIndex);
  const processingRating = getProcessingLevelRating(sugar.processingLevel);
  
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'natural': return colors.natural;
      case 'processed': return colors.processed;
      case 'artificial': return colors.artificial;
      default: return colors.primary;
    }
  };
  
  const getRatingColor = (rating: string) => {
    switch(rating) {
      case 'Low':
      case 'Minimal': return colors.good;
      case 'Medium':
      case 'Moderate': return colors.moderate;
      case 'High': return colors.bad;
      default: return colors.textSecondary;
    }
  };

  return (
    <Pressable 
      style={[styles.card, shadows.medium]} 
      onPress={onPress}
    >
      <View style={styles.glyphContainer}>
        <Text style={styles.glyph}>{sugar.glyph}</Text>
        <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(sugar.category) }]}>
          <Text style={styles.categoryText}>{sugar.category}</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{sugar.name}</Text>
        
        <View style={styles.indicators}>
          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>GI:</Text>
            <Text style={[styles.indicatorValue, { color: getRatingColor(giRating) }]}>
              {sugar.glycemicIndex} ({giRating})
            </Text>
          </View>
          
          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>Processing:</Text>
            <Text style={[styles.indicatorValue, { color: getRatingColor(processingRating) }]}>
              {processingRating}
            </Text>
          </View>
          
          <View style={styles.indicator}>
            <Text style={styles.indicatorLabel}>GMO:</Text>
            <Text style={[styles.indicatorValue, { color: sugar.isGMO ? colors.bad : colors.good }]}>
              {sugar.isGMO ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
  },
  glyphContainer: {
    position: 'relative',
    height: 140,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glyph: {
    fontSize: 64,
    textAlign: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600' as const,
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 8,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  indicatorValue: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
});