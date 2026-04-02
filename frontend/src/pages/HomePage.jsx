// src/pages/HomePage.jsx
import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutUs } from '../components/AboutUs';
import { Services } from '../components/Services';
import { Contacts } from '../components/Contacts';

export const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs />
      <Services />
      <Contacts />
    </div>
  );
};