export interface Internship {
  id: string;
  company: string;
  position: string;
  location: string;
  duration: string;
  type: string;
  logo: string;
  applyUrl: string;
}

export const internships: Internship[] = [
  {
    id: '1',
    company: 'Google',
    position: 'Software Engineering Intern',
    location: 'Mountain View, CA',
    duration: '12 weeks',
    type: 'Summer Internship',
    logo: 'https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    applyUrl: 'https://careers.google.com/students',
  },
  {
    id: '2',
    company: 'Microsoft',
    position: 'Cloud Engineering Intern',
    location: 'Redmond, WA',
    duration: '16 weeks',
    type: 'Fall Internship',
    logo: 'https://images.unsplash.com/photo-1583321500900-82807e458f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    applyUrl: 'https://careers.microsoft.com/students',
  },
  {
    id: '3',
    company: 'Amazon',
    position: 'Data Science Intern',
    location: 'Seattle, WA',
    duration: '12 weeks',
    type: 'Summer Internship',
    logo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
    applyUrl: 'https://www.amazon.jobs/student-programs',
  },
];