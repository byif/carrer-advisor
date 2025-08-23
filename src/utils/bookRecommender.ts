import type { UserPreferences, BookRecommendation } from '../types/career';

const bookDatabase: BookRecommendation[] = [
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    description: 'Learn principles of writing maintainable code',
    level: 'intermediate',
    amazonUrl: 'https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882'
  },
  {
    title: 'Learning Python',
    author: 'Mark Lutz',
    description: 'Comprehensive introduction to Python programming',
    level: 'beginner',
    amazonUrl: 'https://www.amazon.com/Learning-Python-5th-Mark-Lutz/dp/1449355730'
  },
  {
    title: 'Design Patterns',
    author: 'Erich Gamma',
    description: 'Essential patterns for software design',
    level: 'advanced',
    amazonUrl: 'https://www.amazon.com/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612'
  },
  {
    title: 'JavaScript for Beginners',
    author: 'Mark Myers',
    description: 'Start your journey in web development',
    level: 'beginner',
    amazonUrl: 'https://www.amazon.com/JavaScript-Beginners-Hands-Project-Based-Introduction/dp/1951791479'
  },
  {
    title: 'System Design Interview',
    author: 'Alex Xu',
    description: 'Prepare for system design interviews',
    level: 'advanced',
    amazonUrl: 'https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119'
  },
  {
    title: 'React Cookbook',
    author: 'David Griffiths',
    description: 'Practical recipes for React development',
    level: 'intermediate',
    amazonUrl: 'https://www.amazon.com/React-Cookbook-Recipes-Mastering-Framework/dp/1783980727'
  }
];

export const getBookRecommendations = (
  preferences: UserPreferences
): BookRecommendation[] => {
  return bookDatabase
    .filter(book => book.level === preferences.experience)
    .slice(0, 3);
};