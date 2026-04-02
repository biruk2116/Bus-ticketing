// src/lib/ui.js
import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatTime = (time) => {
  if (!time) return '';
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0,
  }).format(price);
};

export const generateSeatLayout = (totalSeats = 40, bookedSeats = []) => {
  const seats = [];
  for (let i = 1; i <= totalSeats; i++) {
    seats.push({
      id: i,
      number: i,
      status: bookedSeats.includes(i) ? 'booked' : 'available',
    });
  }
  return seats;
};