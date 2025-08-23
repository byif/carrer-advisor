import React from 'react';
import { Code, Database, Globe, Shield, Cpu, Brain } from 'lucide-react';
import CareerCard from './CareerCard';

const careers = [
  {
    title: 'Software Development',
    icon: Code,
    description: 'Build applications and software solutions that power the modern world.',
    skills: ['JavaScript', 'Python', 'Java', 'React', 'Node.js'],
    learnMoreUrl: 'https://roadmap.sh/frontend',
    jobBoardUrl: 'https://www.linkedin.com/jobs/software-developer-jobs',
  },
  {
    title: 'Data Science',
    icon: Database,
    description: 'Analyze complex data sets to help organizations make better decisions.',
    skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics'],
    learnMoreUrl: 'https://roadmap.sh/data-science',
    jobBoardUrl: 'https://www.linkedin.com/jobs/data-scientist-jobs',
  },
  {
    title: 'Web Development',
    icon: Globe,
    description: 'Create responsive and dynamic websites and web applications.',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
    learnMoreUrl: 'https://roadmap.sh/frontend',
    jobBoardUrl: 'https://www.linkedin.com/jobs/web-developer-jobs',
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    description: 'Protect organizations from digital threats and secure sensitive data.',
    skills: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Security Tools'],
    learnMoreUrl: 'https://roadmap.sh/cyber-security',
    jobBoardUrl: 'https://www.linkedin.com/jobs/cyber-security-jobs',
  },
  {
    title: 'DevOps',
    icon: Cpu,
    description: 'Bridge development and operations to improve software delivery.',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms', 'Linux'],
    learnMoreUrl: 'https://roadmap.sh/devops',
    jobBoardUrl: 'https://www.linkedin.com/jobs/devops-jobs',
  },
  {
    title: 'AI/ML Engineering',
    icon: Brain,
    description: 'Develop intelligent systems and machine learning models.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Deep Learning', 'NLP'],
    learnMoreUrl: 'https://roadmap.sh/ai-data-scientist',
    jobBoardUrl: 'https://www.linkedin.com/jobs/machine-learning-engineer-jobs',
  },
];

const CareerPaths = () => {
  return (
    <div id="careers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Career Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career, index) => (
            <CareerCard key={index} career={career} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerPaths;