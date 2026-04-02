// src/components/ui/StatusBadge.jsx
import React from 'react';
import { cn } from '../../lib/ui';

export const StatusBadge = ({ status }) => {
  const variants = {
    confirmed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  return (
    <span className={cn('px-3 py-1 rounded-full text-sm font-semibold', variants[status])}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};