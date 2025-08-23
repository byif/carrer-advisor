import React from 'react';
import { BookOpen, Video, ExternalLink } from 'lucide-react';
import { resources } from '../data/resources';
import BookCard from './BookCard';

const Resources = () => {
  return (
    <div id="resources" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((section, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                {section.icon === 'BookOpen' && <BookOpen className="h-6 w-6 text-indigo-600 mr-3" />}
                {section.icon === 'Video' && <Video className="h-6 w-6 text-indigo-600 mr-3" />}
                <h3 className="text-xl font-semibold">{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.items.map((item, idx) => (
                  <div key={idx} className="border-b pb-2 last:border-b-0">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600 mb-2">
                      {item.author || item.platform || item.type || item.org}
                    </div>
                    {item.purchaseUrl && (
                      <a
                        href={item.purchaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 hover:text-indigo-800 inline-flex items-center"
                      >
                        Learn More <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;