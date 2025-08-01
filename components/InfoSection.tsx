import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '@/constants/colors';

interface InfoSectionProps {
  title: string;
  items: string[];
  type?: 'benefits' | 'risks' | 'uses';
}

export default function InfoSection({ title, items, type = 'benefits' }: InfoSectionProps) {
  const getIconColor = () => {
    switch (type) {
      case 'benefits': return colors.good;
      case 'risks': return colors.bad;
      case 'uses': return colors.primary;
      default: return colors.primary;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <View style={[styles.bullet, { backgroundColor: getIconColor() }]} />
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  itemText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
  },
});