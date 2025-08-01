import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Heart, BookOpen } from 'lucide-react-native';
import { sugars } from '@/data/sugars';
import { educationSections } from '@/data/education-sections';
import { useFavoriteSugars, useFavoriteEducationSections } from '@/hooks/sugar-store';
import { colors, shadows } from '@/constants/colors';
import SugarCard from '@/components/SugarCard';

export default function FavoritesScreen() {
  const router = useRouter();
  const favoriteSugars = useFavoriteSugars(sugars);
  const favoriteEducationSections = useFavoriteEducationSections(educationSections);
  
  const navigateToSugar = (id: string) => {
    router.push(`/sugar/${id}`);
  };
  
  const navigateToEducation = () => {
    router.push('/education');
  };
  
  const navigateToHome = () => {
    router.push('/');
  };
  
  const hasAnyFavorites = favoriteSugars.length > 0 || favoriteEducationSections.length > 0;

  return (
    <View style={styles.container}>
      {!hasAnyFavorites ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Favorites Yet</Text>
          <Text style={styles.emptyText}>
            Add sugars and education sections to your favorites for quick access to important information.
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.browseButton} onPress={navigateToHome}>
              <Text style={styles.browseButtonText}>Browse Sugars</Text>
            </Pressable>
            <Pressable style={styles.browseButton} onPress={navigateToEducation}>
              <Text style={styles.browseButtonText}>View Education</Text>
            </Pressable>
          </View>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Your Favorites</Text>
          
          {favoriteEducationSections.length > 0 && (
            <View style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <BookOpen size={20} color={colors.primary} />
                <Text style={styles.categoryTitle}>Education Sections</Text>
              </View>
              
              {favoriteEducationSections.map((section) => (
                <Pressable
                  key={section.id}
                  style={[styles.educationCard, shadows.small]}
                  onPress={navigateToEducation}
                >
                  <View style={styles.educationCardContent}>
                    <Text style={styles.educationEmoji}>{section.emoji}</Text>
                    <View style={styles.educationInfo}>
                      <Text style={styles.educationTitle}>{section.title}</Text>
                      <Text style={styles.educationDescription}>{section.description}</Text>
                    </View>
                    <Heart size={16} color={colors.bad} fill={colors.bad} />
                  </View>
                </Pressable>
              ))}
            </View>
          )}
          
          {favoriteSugars.length > 0 && (
            <View style={styles.categorySection}>
              <View style={styles.categoryHeader}>
                <Heart size={20} color={colors.primary} />
                <Text style={styles.categoryTitle}>Sugars</Text>
              </View>
              
              {favoriteSugars.map((sugar) => (
                <SugarCard
                  key={sugar.id}
                  sugar={sugar}
                  onPress={() => navigateToSugar(sugar.id)}
                />
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: 'white',
    fontWeight: '600' as const,
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: colors.text,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  categorySection: {
    marginBottom: 32,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: colors.text,
    marginLeft: 8,
  },
  educationCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  educationCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  educationEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  educationInfo: {
    flex: 1,
    marginRight: 12,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: colors.text,
    marginBottom: 4,
  },
  educationDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});