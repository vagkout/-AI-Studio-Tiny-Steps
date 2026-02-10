
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
  },

  // Books - Essentials (Category with no milestones)
  {
    id: 'b1', category: 'Books', type: 'essential', icon: '🦓', title: 'High-Contrast Board Books', description: 'Visual stimulation for newborns.', startAgeMonths: 0, endAgeMonths: 4
  },
  {
    id: 'b2', category: 'Books', type: 'essential', icon: '🧤', title: 'Touch-and-Feel Sensory Books', description: 'Exploring textures with hands.', startAgeMonths: 4, endAgeMonths: 12
  },
  {
    id: 'b3', category: 'Books', type: 'essential', icon: '🐶', title: 'First Word Books', description: 'Building early vocabulary and recognition.', startAgeMonths: 10, endAgeMonths: 24
  },
  {
    id: 'b4', category: 'Books', type: 'essential', icon: '🚪', title: 'Interactive Lift-the-Flap', description: 'Developing curiosity and object permanence.', startAgeMonths: 18, endAgeMonths: 48
  },

  // Growth Jumps - Milestones only (Wonder Weeks focus)
  {
    id: 'gj1', category: 'Growth Jumps', type: 'milestone', icon: '⚡', title: 'Leap 1: Changing Sensations', description: 'Increased alertness and focus on surroundings.', startAgeMonths: 1,
    fullDescription: 'At around 5 weeks, babies experience their first major mental development leap. They start to become more aware of their senses and may stay awake for longer periods, looking at things with more intent.'
  },
  {
    id: 'gj2', category: 'Growth Jumps', type: 'milestone', icon: '🌀', title: 'Leap 2: World of Patterns', description: 'Discovering hands and repetitive sounds.', startAgeMonths: 2,
    fullDescription: 'Babies begin to recognize simple patterns in their environment and in their own bodies—like discovering they have hands and feet!'
  },
  {
    id: 'gj3', category: 'Growth Jumps', type: 'milestone', icon: '🌊', title: 'Leap 3: Smooth Transitions', description: 'Noticing fluid movements and pitch changes.', startAgeMonths: 3,
    fullDescription: 'The world becomes less robotic. Movements seem more fluid, and they begin to notice the nuances in how people speak or move objects.'
  },
  {
    id: 'gj4', category: 'Growth Jumps', type: 'milestone', icon: '🌤️', title: 'Leap 4: World of Events', description: 'Predicting sequences and cause-and-effect.', startAgeMonths: 4,
    fullDescription: 'This is often the biggest leap. Babies start to understand that one thing leads to another (dropping a toy makes a sound).'
  }
];
