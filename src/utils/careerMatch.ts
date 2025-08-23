import type { UserPreferences, CareerSuggestion } from '../types/career';

const careerPaths: CareerSuggestion[] = [
  {
    title: 'Frontend Developer',
    match: 0,
    description: 'Build user interfaces and create engaging web experiences',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    salary: '$70,000 - $120,000'
  },
  {
    title: 'Backend Developer',
    match: 0,
    description: 'Design and implement server-side applications and APIs',
    requiredSkills: ['Node.js', 'Python', 'Databases', 'API Design'],
    salary: '$80,000 - $130,000'
  },
  {
    title: 'Data Scientist',
    match: 0,
    description: 'Analyze data and create machine learning models',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL'],
    salary: '$90,000 - $150,000'
  },
  {
    title: 'DevOps Engineer',
    match: 0,
    description: 'Automate deployment processes and manage infrastructure',
    requiredSkills: ['Linux', 'Docker', 'CI/CD', 'Cloud Platforms'],
    salary: '$85,000 - $140,000'
  },
  {
    title: 'UI/UX Designer',
    match: 0,
    description: 'Create intuitive and beautiful user interfaces',
    requiredSkills: ['Design Tools', 'User Research', 'Prototyping', 'Visual Design'],
    salary: '$65,000 - $110,000'
  },
  {
    title: 'Mobile Developer',
    match: 0,
    description: 'Build native and cross-platform mobile applications',
    requiredSkills: ['React Native', 'iOS', 'Android', 'Mobile UI'],
    salary: '$75,000 - $125,000'
  }
];

export const calculateCareerMatch = (preferences: UserPreferences): CareerSuggestion[] => {
  return careerPaths.map(career => {
    let match = 0;
    
    // Calculate match based on skills overlap
    const skillsMatch = career.requiredSkills.filter(skill => 
      preferences.skillset.includes(skill)
    ).length;
    match += (skillsMatch / career.requiredSkills.length) * 50;
    
    // Calculate match based on interests
    const interestsMatch = preferences.interests.some(interest => 
      career.description.toLowerCase().includes(interest.toLowerCase())
    );
    match += interestsMatch ? 50 : 0;

    return {
      ...career,
      match: Math.round(match)
    };
  }).sort((a, b) => b.match - a.match);
};