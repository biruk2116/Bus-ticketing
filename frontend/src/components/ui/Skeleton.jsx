// src/components/ui/Skeleton.jsx
import React from 'react';
import { cn } from '../../lib/ui';

export const Skeleton = ({ className }) => {
  return (
    <div className={cn('animate-pulse bg-gray-200 dark:bg-gray-700 rounded', className)} />
  );
};