// src/components/ui/SectionHero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/ui';

export const SectionHero = ({ children, backgroundGif, className }) => {
  return (
    <section className={cn('relative min-h-screen flex items-center justify-center overflow-hidden', className)}>
      {backgroundGif && (
        <div className="absolute inset-0 z-0">
          <img 
            src={backgroundGif} 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        </div>
      )}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};