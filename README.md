# 🚌 Bus Ticketing System - Ethiopia

A modern, full-featured bus ticketing web application with premium UI/UX, allowing users to search, book, and manage bus tickets across Ethiopia. Features include user authentication, seat selection, payment simulation, digital tickets, and an admin dashboard.

![Bus Ticketing System](https://via.placeholder.com/1200x630?text=Bus+Ticketing+System)

## ✨ Features

### 🎯 User Features
- **User Authentication** - Sign up, login, and logout functionality
- **Bus Search** - Search buses by route, date, and passenger count
- **Interactive Seat Selection** - Visual seat map with real-time availability
- **Booking Management** - View booking history and ticket details
- **Digital Tickets** - Generate and download/print e-tickets with QR code
- **Dark/Light Mode** - Toggle between themes for comfortable viewing
- **Responsive Design** - Fully responsive on mobile, tablet, and desktop

### 🛠️ Admin Features
- **Admin Dashboard** - Complete system management interface
- **Bus Management** - Add, edit, and delete buses
- **Route Management** - Create and manage bus routes
- **Booking Overview** - View all user bookings
- **User Management** - View registered users and their booking history
- **Analytics** - View total bookings, revenue, and other statistics

### 🎨 UI/UX
- Glassmorphism design with modern gradients
- Smooth animations with Framer Motion
- Full responsive layout
- Toast notifications for user feedback
- Loading skeletons for better UX
- Scroll progress indicator

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Routing and navigation
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Date-fns** - Date manipulation

### Backend Ready
- API service structure prepared for backend integration
- JWT authentication ready
- Mock data ready for replacement with real API calls

## 📁 Project Structure
frontend/
├── src/
│ ├── assets/ # Static assets (images, GIFs)
│ ├── components/ # Reusable components
│ │ ├── ui/ # UI components (Button, Card, etc.)
│ │ ├── Auth/ # Authentication components
│ │ └── ... # Other components
│ ├── context/ # React Context for state management
│ ├── hooks/ # Custom React hooks
│ ├── lib/ # Utility functions
│ ├── pages/ # Page components
│ ├── services/ # API service layer (backend ready)
│ ├── App.jsx # Main app component
│ ├── main.jsx # Entry point
│ └── index.css # Global styles
├── public/ # Public assets
│ └── home-bus.gif # Hero section background GIF
├── index.html # HTML template
├── package.json # Dependencies
├── tailwind.config.js # Tailwind configuration
├── postcss.config.js # PostCSS configuration
└── vite.config.js # Vite configuration
