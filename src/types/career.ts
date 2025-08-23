import { LucideIcon } from 'lucide-react';

export interface Career {
  title: string;
  icon: LucideIcon;
  description: string;
  skills: string[];
  learnMoreUrl: string;
  jobBoardUrl: string;
}

export interface CareerSuggestion {
  title: string;
  match: number;
  description: string;
  requiredSkills: string[];
  salary: string;
}

export interface BookRecommendation {
  title: string;
  author: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  amazonUrl: string;
}

export interface UserPreferences {
  interests: string[];
  experience: 'beginner' | 'intermediate' | 'advanced';
  preferredWorkStyle: 'remote' | 'hybrid' | 'office';
  skillset: string[];
}