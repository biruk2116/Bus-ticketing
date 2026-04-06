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
bus-ticketing-app/
│
├── frontend/
│   ├── public/
│   │   └── home-bus.gif
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   └── images/
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Field.jsx
│   │   │   │   ├── PageShell.jsx
│   │   │   │   ├── Panel.jsx
│   │   │   │   ├── Skeleton.jsx
│   │   │   │   └── StatusBadge.jsx
│   │   │   │
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   │
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── BookingSummary.jsx
│   │   │   ├── BusList.jsx
│   │   │   ├── BusSearch.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Payment.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ScrollToTopButton.jsx
│   │   │   ├── SeatSelection.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   └── TicketView.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   └── useActiveSection.js
│   │   │
│   │   ├── lib/
│   │   │   └── ui.js
│   │   │
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   └── ContactPage.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   └── index.css
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── busController.js
│   │   │   ├── bookingController.js
│   │   │   ├── paymentController.js
│   │   │   └── adminController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorMiddleware.js
│   │   │   └── validationMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Bus.js
│   │   │   ├── Booking.js
│   │   │   ├── Route.js
│   │   │   └── Payment.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── busRoutes.js
│   │   │   ├── bookingRoutes.js
│   │   │   ├── paymentRoutes.js
│   │   │   └── adminRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── emailService.js
│   │   │   └── paymentService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── generateToken.js
│   │   │   └── validators.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
├── README.md
└── LICENSE
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
