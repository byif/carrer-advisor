import React, { useState } from 'react';
import type { UserPreferences, CareerSuggestion, BookRecommendation } from '../../types/career';
import PreferencesForm from './PreferencesForm';
import RecommendationResults from './RecommendationResults';
import { calculateCareerMatch } from '../../utils/careerMatch';
import { getBookRecommendations } from '../../utils/bookRecommender';

const CareerAdvisor = () => {
  const [recommendations, setRecommendations] = useState<{
    careers: CareerSuggestion[];
    books: BookRecommendation[];
  } | null>(null);

  const handlePreferencesSubmit = (preferences: UserPreferences) => {
    const careers = calculateCareerMatch(preferences);
    const books = getBookRecommendations(preferences);
    setRecommendations({ careers, books });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">AI Career Advisor</h2>
        <div className="max-w-4xl mx-auto">
          {!recommendations ? (
            <PreferencesForm onSubmit={handlePreferencesSubmit} />
          ) : (
            <RecommendationResults
              careers={recommendations.careers}
              books={recommendations.books}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerAdvisor;