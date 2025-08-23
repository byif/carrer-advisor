import React from 'react';
import { internships } from '../data/internships';
import InternshipCard from './InternshipCard';

const Internships = () => {
  return (
    <div id="internships" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Internships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {internships.map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-colors">
            View All Opportunities
          </button>
        </div>
      </div>
    </div>
  );
};

export default Internships;