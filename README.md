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
│
├── public/                          # Static public assets
│   └── home-bus.gif                 # Hero section background animation
│
├── src/                             # Source code
│   │
│   ├── assets/                      # Static assets
│   │   └── images/                  # Image files
│   │
│   ├── components/                  # React components
│   │   │
│   │   ├── ui/                      # Reusable UI components
│   │   │   ├── Button.jsx          # Styled button component
│   │   │   ├── Field.jsx           # Form input field component
│   │   │   ├── PageShell.jsx       # Page layout wrapper
│   │   │   ├── Panel.jsx           # Card/Panel component
│   │   │   ├── Skeleton.jsx        # Loading skeleton component
│   │   │   └── StatusBadge.jsx     # Status indicator badge
│   │   │
│   │   ├── Auth/                    # Authentication components
│   │   │   ├── Login.jsx           # User login page
│   │   │   └── Signup.jsx          # User registration page
│   │   │
│   │   ├── AdminLogin.jsx          # Admin login page
│   │   ├── AdminDashboard.jsx      # Admin control panel
│   │   ├── BookingSummary.jsx      # Booking review page
│   │   ├── BusList.jsx             # Available buses listing
│   │   ├── BusSearch.jsx           # Bus search form
│   │   ├── Footer.jsx              # Website footer
│   │   ├── Navbar.jsx              # Navigation bar
│   │   ├── Payment.jsx             # Payment processing page
│   │   ├── ProtectedRoute.jsx      # Route protection wrapper
│   │   ├── ScrollToTopButton.jsx   # Scroll to top button
│   │   ├── SeatSelection.jsx       # Interactive seat map
│   │   ├── SectionHeading.jsx      # Section title component
│   │   └── TicketView.jsx          # Digital ticket display
│   │
│   ├── context/                     # React Context providers
│   │   └── AuthContext.jsx         # Authentication state management
│   │
│   ├── hooks/                       # Custom React hooks
│   │   └── useActiveSection.js     # Active section detection on scroll
│   │
│   ├── lib/                         # Utility functions
│   │   └── ui.js                   # UI helpers (formatting, classes)
│   │
│   ├── pages/                       # Page components
│   │   ├── HomePage.jsx            # Home page with all sections
│   │   ├── AboutPage.jsx           # About us page
│   │   ├── ServicesPage.jsx        # Services page
│   │   └── ContactPage.jsx         # Contact page
│   │
│   ├── services/                    # API service layer
│   │   └── api.js                  # API calls (backend ready)
│   │
│   ├── styles/                      # Style files
│   │   └── index.css               # Global styles
│   │
│   ├── App.jsx                      # Main application component
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Tailwind CSS imports
│
├── .env                             # Environment variables
├── .gitignore                       # Git ignore file
├── index.html                       # HTML template
├── package.json                     # Dependencies and scripts
├── package-lock.json                # Locked dependencies
├── postcss.config.js                # PostCSS configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── vite.config.js                   # Vite configuration
## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/biruk2116/bus-ticketing-system.git
   cd bus-ticketing-system/frontend
   Install dependencies
   npm install
   Add hero background GIF

Place your home-bus.gif file in the public folder

Path should be: frontend/public/home-bus.gif

Start the development server
npm run dev
