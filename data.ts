
import { Item } from './types';

export const ALL_ITEMS: Item[] = [
  // Food - Milestones
  { 
    id: 'f1', category: 'Food', type: 'milestone', icon: '🍼', title: 'Exclusive Milk Feeding', description: 'Breastmilk or formula only.', startAgeMonths: 0 
  },
  { 
    id: 'f2', category: 'Food', type: 'milestone', icon: '🥣', title: 'First Purees', description: 'Single ingredient vegetable purees.', startAgeMonths: 6 
  },
  { 
    id: 'f3', category: 'Food', type: 'milestone', icon: '🥑', title: 'Soft Finger Foods', description: 'Small chunks of avocado, banana, etc.', startAgeMonths: 8 
  },
  
  // Food - Essentials
  {
    id: 'fe1', category: 'Food', type: 'essential', icon: '🪑', title: 'Ergonomic High Chair', 
    description: 'Adjustable footrest for core stability.', 
    fullDescription: 'A high chair with a footrest is essential for safe swallowing. It provides the core stability babies need to focus on the complex task of chewing and moving food around their mouths.',
    startAgeMonths: 5, endAgeMonths: 36
  },
  {
    id: 'fe2', category: 'Food', type: 'essential', icon: '🥄', title: 'Silicone Starter Spoons', 
    description: 'Soft on gums and easy to grip.', 
    startAgeMonths: 4, endAgeMonths: 12
  },

  // Sleep - Milestones
  {
    id: 's1', category: 'Sleep', type: 'milestone', icon: '🌙', title: 'Circadian Rhythm Setup', description: 'Starting to distinguish day from night.', startAgeMonths: 2
  },
  {
    id: 's2', category: 'Sleep', type: 'milestone', icon: '🛌', title: '4-Month Regression', description: 'A major shift in sleep cycle architecture.', startAgeMonths: 4
  },

  // Sleep - Essentials
  {
    id: 'se1', category: 'Sleep', type: 'essential', icon: '🧥', title: 'Weighted Sleep Sacks', description: 'Safety-certified comfort for deeper rest.', startAgeMonths: 3, endAgeMonths: 24
  },
  {
    id: 'se2', category: 'Sleep', type: 'essential', icon: '🔊', title: 'White Noise Machine', description: 'Blocks out household sounds.', startAgeMonths: 0, endAgeMonths: 72
  },

  // Toys - Milestones
  { id: 't1', category: 'Toys', type: 'milestone', icon: '🎨', title: 'High Contrast Cards', description: 'Black and white patterns.', startAgeMonths: 0 },
  { id: 't2', category: 'Toys', type: 'milestone', icon: '🔔', title: 'Rattles & Grasping', description: 'Sound and reach development.', startAgeMonths: 3 },
  
  // Toys - Essentials
  {
    id: 'te1', category: 'Toys', type: 'essential', icon: '🧩', title: 'Montessori Play Kit', description: 'Age-appropriate wooden tools for learning.', startAgeMonths: 0, endAgeMonths: 60
  },
  {
    id: 'te2', category: 'Toys', type: 'essential', icon: '🪀', title: 'Textured Sensory Balls', description: 'Easy to grip and great for tactile exploration.', startAgeMonths: 2, endAgeMonths: 12
  }
];
