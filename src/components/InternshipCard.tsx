import React from 'react';
import { Building2, MapPin, Calendar, ExternalLink } from 'lucide-react';
import type { Internship } from '../data/internships';

interface InternshipCardProps {
  internship: Internship;
}

const InternshipCard = ({ internship }: InternshipCardProps) => {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={internship.logo}
            alt={internship.company}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold text-lg">{internship.position}</h3>
            <div className="flex items-center text-gray-600">
              <Building2 className="h-4 w-4 mr-1" />
              <span>{internship.company}</span>
            </div>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{internship.location}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{internship.duration} • {internship.type}</span>
          </div>
        </div>
        <a
          href={internship.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center justify-center"
        >
          Apply Now <ExternalLink className="h-4 w-4 ml-2" />
        </a>
      </div>
    </div>
  );
};

export default InternshipCard;