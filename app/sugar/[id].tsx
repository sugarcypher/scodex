import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { sugars } from '@/data/sugars';
import { useSugarStore } from '@/hooks/sugar-store';
import { colors, shadows } from '@/constants/colors';
import { Sugar } from '@/types/sugar';
import RatingIndicator from '@/components/RatingIndicator';
import InfoSection from '@/components/InfoSection';
import { Heart } from 'lucide-react-native';

export default function SugarDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [sugar, setSugar] = useState<Sugar | null>(null);
  const { 
    isFavorite, 
    addToFavorites, 
    removeFromFavorites
  } = useSugarStore();
  
  useEffect(() => {
    if (id) {
      const foundSugar = sugars.find(s => s.id === id);
      if (foundSugar) {
        setSugar(foundSugar);
      }
    }
  }, [id]);
  
  const toggleFavorite = () => {
    if (!sugar) return;
    
    if (isFavorite(sugar.id)) {
      removeFromFavorites(sugar.id);
    } else {
      addToFavorites(sugar.id);
    }
  };
  

  
  const getCategoryColor = (category: string) => {
    switch(category.toLowerCase()) {
      case 'natural': return colors.natural;
      case 'processed': return colors.processed;
      case 'artificial': return colors.artificial;
      default: return colors.primary;
    }
  };
  
  if (!sugar) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: sugar.name,
          headerRight: () => (
            <Pressable style={styles.headerButton} onPress={toggleFavorite}>
              <Heart 
                size={24} 
                fill={isFavorite(sugar.id) ? colors.primary : 'transparent'} 
                color={isFavorite(sugar.id) ? colors.primary : colors.textSecondary} 
              />
            </Pressable>
          ),
        }} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.glyphContainer}>
          <Text style={styles.glyph}>{sugar.glyph}</Text>
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(sugar.category) }]}>
            <Text style={styles.categoryText}>{sugar.category}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{sugar.name}</Text>
          <Text style={styles.description}>{sugar.description}</Text>
          
          <View style={[styles.section, shadows.small]}>
            <Text style={styles.sectionTitle}>Nutritional Profile</Text>
            <RatingIndicator 
              label="Glycemic Index" 
              value={sugar.glycemicIndex} 
              maxValue={100} 
              type="gi" 
            />
            <RatingIndicator 
              label="Processing Level" 
              value={sugar.processingLevel} 
              maxValue={10} 
              type="processing" 
            />
            <RatingIndicator 
              label="GMO" 
              value={sugar.isGMO ? 'Yes' : 'No'} 
              type="boolean" 
            />
          </View>
          
          <View style={[styles.section, shadows.small]}>
            <InfoSection 
              title="Benefits" 
              items={sugar.benefits} 
              type="benefits" 
            />
            
            <InfoSection 
              title="Potential Risks" 
              items={sugar.risks} 
              type="risks" 
            />
            
            <InfoSection 
              title="Common Uses" 
              items={sugar.commonUses} 
              type="uses" 
            />
          </View>
          
          <View style={styles.actionButtons}>
            <Pressable 
              style={[
                styles.actionButton, 
                { backgroundColor: isFavorite(sugar.id) ? colors.primaryLight : colors.primary }
              ]} 
              onPress={toggleFavorite}
            >
              <Heart 
                size={20} 
                color="white" 
                fill={isFavorite(sugar.id) ? 'white' : 'transparent'} 
              />
              <Text style={styles.actionButtonText}>
                {isFavorite(sugar.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Text>
            </Pressable>
            

          </View>
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

  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  glyphContainer: {
    position: 'relative',
    height: 200,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  glyph: {
    fontSize: 96,
    textAlign: 'center',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600' as const,
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 16,
  },
  actionButtons: {
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600' as const,
    fontSize: 16,
    marginLeft: 8,
  },
});