import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

interface RatingIndicatorProps {
  label: string;
  value: number | string | boolean;
  maxValue?: number;
  type: 'gi' | 'processing' | 'boolean';
  invert?: boolean;
}

export default function RatingIndicator({ 
  label, 
  value, 
  maxValue = 100, 
  type, 
  invert = false 
}: RatingIndicatorProps) {
  const getColor = () => {
    if (type === 'boolean') {
      return (value === 'Yes' || value === true) ? 
        (invert ? colors.good : colors.bad) : 
        (invert ? colors.bad : colors.good);
    }
    
    const numValue = typeof value === 'number' ? value : 0;
    const percentage = numValue / maxValue;
    
    if (type === 'gi') {
      if (numValue < 55) return colors.good;
      if (numValue < 70) return colors.moderate;
      return colors.bad;
    }
    
    if (type === 'processing') {
      if (percentage <= 0.3) return invert ? colors.bad : colors.good;
      if (percentage <= 0.6) return colors.moderate;
      return invert ? colors.good : colors.bad;
    }
    
    return colors.primary;
  };
  
  const getProgressWidth = () => {
    if (type === 'boolean') return '100%';
    const numValue = typeof value === 'number' ? value : 0;
    return `${(numValue / maxValue) * 100}%`;
  };
  
  const getRatingText = () => {
    if (type === 'gi') {
      const numValue = typeof value === 'number' ? value : 0;
      if (numValue < 55) return 'Low';
      if (numValue < 70) return 'Medium';
      return 'High';
    }
    
    if (type === 'processing') {
      const numValue = typeof value === 'number' ? value : 0;
      const percentage = numValue / maxValue;
      if (percentage <= 0.3) return 'Minimal';
      if (percentage <= 0.6) return 'Moderate';
      return 'High';
    }
    
    return typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value.toString();
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={[styles.value, { color: getColor() }]}>
          {typeof value === 'number' ? value : value.toString()}
          {type === 'gi' || type === 'processing' ? ` (${getRatingText()})` : ''}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { 
              width: getProgressWidth(), 
              backgroundColor: getColor() 
            }
          ]} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: colors.text,
  },
  value: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});