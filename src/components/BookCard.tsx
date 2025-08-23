import React from 'react';
import { ExternalLink } from 'lucide-react';

interface BookCardProps {
  name: string;
  author: string;
  purchaseUrl: string;
}

const BookCard = ({ name, author, purchaseUrl }: BookCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="font-semibold text-lg mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">by {author}</p>
      <a
        href={purchaseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-indigo-600 hover:text-indigo-800"
      >
        Purchase <ExternalLink className="h-4 w-4 ml-1" />
      </a>
    </div>
  );
};

export default BookCard;