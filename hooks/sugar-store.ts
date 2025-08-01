import { useState, useEffect } from 'react';
import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Sugar, EducationSection } from '@/types/sugar';
import { usePrivacyCompliance } from '@/hooks/privacy-compliance';

interface SugarStore {
  favorites: string[];
  educationFavorites: string[];
  addToFavorites: (sugarId: string) => void;
  removeFromFavorites: (sugarId: string) => void;
  isFavorite: (sugarId: string) => boolean;
  addToEducationFavorites: (sectionId: string) => void;
  removeFromEducationFavorites: (sectionId: string) => void;
  isEducationFavorite: (sectionId: string) => boolean;
}

export const [SugarContext, useSugarStore] = createContextHook(() => {
  const { hasConsentFor, logDataProcessing } = usePrivacyCompliance();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [educationFavorites, setEducationFavorites] = useState<string[]>([]);
  
  // Load favorites from storage
  useEffect(() => {
    const loadFavorites = async () => {
      if (!hasConsentFor('dataCollection')) {
        return;
      }
      
      try {
        const storedFavorites = await AsyncStorage.getItem('sugar-favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
          await logDataProcessing('read', 'favorites', 'Load user favorites on app start', 'consent', '12 months');
        }
        
        const storedEducationFavorites = await AsyncStorage.getItem('education-favorites');
        if (storedEducationFavorites) {
          setEducationFavorites(JSON.parse(storedEducationFavorites));
          await logDataProcessing('read', 'favorites', 'Load education favorites on app start', 'consent', '12 months');
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
      }
    };
    
    loadFavorites();
  }, [hasConsentFor, logDataProcessing]);
  
  // Save favorites to storage when changed
  useEffect(() => {
    const saveFavorites = async () => {
      if (!hasConsentFor('dataCollection')) {
        return;
      }
      
      try {
        await AsyncStorage.setItem('sugar-favorites', JSON.stringify(favorites));
        await logDataProcessing('update', 'favorites', 'Save user favorites to storage', 'consent', '12 months');
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    };
    
    if (favorites.length > 0) {
      saveFavorites();
    }
  }, [favorites, hasConsentFor, logDataProcessing]);
  
  // Save education favorites to storage when changed
  useEffect(() => {
    const saveEducationFavorites = async () => {
      if (!hasConsentFor('dataCollection')) {
        return;
      }
      
      try {
        await AsyncStorage.setItem('education-favorites', JSON.stringify(educationFavorites));
        await logDataProcessing('update', 'favorites', 'Save education favorites to storage', 'consent', '12 months');
      } catch (error) {
        console.error('Failed to save education favorites:', error);
      }
    };
    
    if (educationFavorites.length > 0) {
      saveEducationFavorites();
    }
  }, [educationFavorites, hasConsentFor, logDataProcessing]);
  
  const addToFavorites = async (sugarId: string) => {
    if (!hasConsentFor('dataCollection')) {
      console.warn('Cannot add to favorites: data collection consent not granted');
      return;
    }
    
    setFavorites(prev => {
      if (prev.includes(sugarId)) return prev;
      return [...prev, sugarId];
    });
    
    await logDataProcessing('create', 'favorites', 'User added sugar to favorites', 'consent', '12 months');
  };
  
  const removeFromFavorites = async (sugarId: string) => {
    if (!hasConsentFor('dataCollection')) {
      console.warn('Cannot remove from favorites: data collection consent not granted');
      return;
    }
    
    setFavorites(prev => prev.filter(id => id !== sugarId));
    await logDataProcessing('delete', 'favorites', 'User removed sugar from favorites', 'consent', '12 months');
  };
  
  const isFavorite = (sugarId: string) => {
    return favorites.includes(sugarId);
  };
  

  
  const addToEducationFavorites = async (sectionId: string) => {
    if (!hasConsentFor('dataCollection')) {
      console.warn('Cannot add to education favorites: data collection consent not granted');
      return;
    }
    
    setEducationFavorites(prev => {
      if (prev.includes(sectionId)) return prev;
      return [...prev, sectionId];
    });
    
    await logDataProcessing('create', 'favorites', 'User added education section to favorites', 'consent', '12 months');
  };
  
  const removeFromEducationFavorites = async (sectionId: string) => {
    if (!hasConsentFor('dataCollection')) {
      console.warn('Cannot remove from education favorites: data collection consent not granted');
      return;
    }
    
    setEducationFavorites(prev => prev.filter(id => id !== sectionId));
    await logDataProcessing('delete', 'favorites', 'User removed education section from favorites', 'consent', '12 months');
  };
  
  const isEducationFavorite = (sectionId: string) => {
    return educationFavorites.includes(sectionId);
  };
  
  return {
    favorites,
    educationFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    addToEducationFavorites,
    removeFromEducationFavorites,
    isEducationFavorite,
  };
});

export function useFavoriteSugars(allSugars: Sugar[]): Sugar[] {
  const { favorites } = useSugarStore();
  
  return allSugars.filter(sugar => favorites.includes(sugar.id));
}



export function useFavoriteEducationSections(allSections: EducationSection[]): EducationSection[] {
  const { educationFavorites } = useSugarStore();
  
  return allSections.filter(section => educationFavorites.includes(section.id));
}