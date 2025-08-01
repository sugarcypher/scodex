export interface Sugar {
  id: string;
  name: string;
  category: 'Natural' | 'Processed' | 'Artificial' | 'Metasugar';
  glycemicIndex: number; // 0-100 scale
  processingLevel: number; // 1-10 scale (1 being least processed)
  isGMO: boolean;
  description: string;
  benefits: string[];
  risks: string[];
  commonUses: string[];
  glyph: string;
  isMetasugar?: boolean;
  transglycationRate?: 'Fast' | 'Medium' | 'Slow';
}

export interface SugarCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface EducationSection {
  id: string;
  title: string;
  emoji: string;
  description: string;
}