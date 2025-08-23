import React from 'react';
import type { CareerSuggestion, BookRecommendation } from '../../types/career';
import { BookOpen, Briefcase } from 'lucide-react';

interface RecommendationResultsProps {
  careers: CareerSuggestion[];
  books: BookRecommendation[];
}

const RecommendationResults = ({ careers, books }: RecommendationResultsProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Recommended Career Paths
        </h3>
        <div className="space-y-4">
          {careers.map((career, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold">{career.title}</h4>
                <span className="text-indigo-600">{career.match}% Match</span>
              </div>
              <p className="text-gray-600 mb-2">{career.description}</p>
              <p className="text-sm text-gray-500">Salary Range: {career.salary}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <BookOpen className="h-5 w-5 mr-2" />
          Recommended Books
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map((book, index) => (
            <div key={index} className="border rounded-lg p-4">
              <h4 className="font-semibold mb-2">{book.title}</h4>
              <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
              <p className="text-gray-500 text-sm mb-3">{book.description}</p>
              <a
                href={book.amazonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm"
              >
                View on Amazon →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationResults;