import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Career } from '../types/career';

interface CareerCardProps {
  career: Career;
}

const CareerCard = ({ career }: CareerCardProps) => {
  const { title, icon: Icon, description, skills, learnMoreUrl, jobBoardUrl } = career;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center mb-4">
        <Icon className="h-8 w-8 text-indigo-600 mr-3" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2 mb-4">
        <h4 className="font-semibold text-sm text-gray-700">Key Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <a
          href={learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Learn More <ExternalLink className="h-4 w-4 ml-2" />
        </a>
        <a
          href={jobBoardUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors"
        >
          View Jobs <ExternalLink className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default CareerCard;