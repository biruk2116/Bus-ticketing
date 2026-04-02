// src/pages/HomePage.jsx
import React from 'react';
import { Home } from '../components/Home';
import { Services } from '../components/Services';
import { Contacts } from '../components/Contacts';

export const HomePage = () => {
  return (
    <div>
      <Home />
      <Services />
      <Contacts />
    </div>
  );
};