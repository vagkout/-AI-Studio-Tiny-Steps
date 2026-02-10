
export interface UsefulLink {
  label: string;
  url: string;
  description?: string;
  type?: 'web' | 'instagram' | 'expert' | 'video';
  author?: string;
  authorIcon?: string;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  links?: UsefulLink[];
  link?: string;
  category: string;
  icon: string;
  startAgeMonths: number;
  type?: 'milestone' | 'essential'; // New field to distinguish type
  endAgeMonths?: number; // Optional end of relevancy
}

export interface AgeGroupDefinition {
  id: string;
  label: string;
  minMonths: number;
  maxMonths: number;
}

export const AGE_GROUPS: AgeGroupDefinition[] = [
  { id: 'infancy', label: 'Infancy (0-2)', minMonths: 0, maxMonths: 24 },
  { id: 'preschool', label: 'Preschool (3-5)', minMonths: 25, maxMonths: 60 },
  { id: 'school-age', label: 'School Age (6-12)', minMonths: 61, maxMonths: 144 }
];

export type SubCategoryStyle = 'timeline' | 'pills' | 'stepper' | 'minimal' | 'tabs';

export interface SubCategory {
  id: string;
  label: string;
  startMonth: number;
  endMonth: number;
  items: Item[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  items?: Item[];
  subCategories?: SubCategory[];
}
