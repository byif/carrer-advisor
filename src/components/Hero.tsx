import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div id="home" className="min-h-screen pt-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Shape Your Future in Tech</h1>
          <p className="text-xl mb-8">
            Discover your perfect career path in technology, find exciting internship opportunities,
            and access curated resources to help you succeed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/careers')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-indigo-100 transition-colors"
            >
              Explore Careers <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => navigate('/internships')}
              className="bg-transparent border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
            >
              Find Internships
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;