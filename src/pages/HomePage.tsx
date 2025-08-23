import React from 'react';
import Hero from '../components/Hero';
import CareerPaths from '../components/CareerPaths';
import Internships from '../components/Internships';
import Resources from '../components/Resources';
import Newsletter from '../components/Newsletter';
import BlogPreview from '../components/BlogPreview';


const HomePage = () => {
  return (
    <>
      <Hero />
      <CareerPaths />
      <Internships />
      <BlogPreview />
      <Resources />
      <Newsletter />
    </>
  );
};

export default HomePage;