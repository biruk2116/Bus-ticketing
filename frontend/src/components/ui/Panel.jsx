// src/components/ui/Panel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/ui';

export const Panel = ({ children, className, glass = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'rounded-2xl bg-white shadow-xl dark:bg-gray-900 p-6',
        glass && 'glass backdrop-blur-md bg-white/80 dark:bg-gray-900/80',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};