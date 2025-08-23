import React, { useState } from 'react';
import type { UserPreferences } from '../../types/career';

interface PreferencesFormProps {
  onSubmit: (preferences: UserPreferences) => void;
}

const PreferencesForm = ({ onSubmit }: PreferencesFormProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    interests: [],
    experience: 'beginner',
    preferredWorkStyle: 'hybrid',
    skillset: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          What interests you? (comma-separated)
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setPreferences({
            ...preferences,
            interests: e.target.value.split(',').map(i => i.trim())
          })}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Experience Level
        </label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          onChange={(e) => setPreferences({
            ...preferences,
            experience: e.target.value as UserPreferences['experience']
          })}
        >
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
      >
        Get Recommendations
      </button>
    </form>
  );
};

export default PreferencesForm;