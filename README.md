# <h1 style="font-size: 36px; margin: 0;">LakeSide Hotel Booking Web Application 🏨</h1>

A modern web-based hotel room booking platform built with React and Vite. This frontend application allows guests to browse and book hotel rooms, while providing administrators with tools to manage room inventory, pricing, and bookings efficiently.

- [Features](#features-)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Installation](#installation)
- [License](#license)

## Features 

- **User Registration & Authentication**: Secure sign-up and login functionality with session-based authentication using cookies.
- **Room Browsing**: Guests can browse all available rooms with filtering by room type and pagination support.
- **Room Booking**: Users can book rooms by providing guest details, number of adults/children, and check-in/check-out dates.
- **Admin Room Management**: Administrators can add new rooms, edit existing room details (type, price, photos), and delete rooms.
- **Room Type Management**: Dynamic room type selection with ability to add custom room types on the fly.
- **Image Upload & Preview**: Support for room photo uploads with real-time preview before submission.
- **Responsive Design**: Built with Tailwind CSS and Bootstrap for optimal viewing across desktop and mobile devices.
- **Protected Routes**: Separate routing for authenticated users (`/p/*`) and public visitors.

---

## Tech Stack

- **React 19** - Modern UI library for building component-based interfaces
- **Vite 7** - Fast build tool and development server
- **React Router DOM 7** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Tailwind CSS 4** - Utility-first CSS framework for styling
- **Bootstrap 5** - Additional UI components and grid system
- **React Icons** - Icon library for UI elements
- **ESLint** - Code linting and quality checks

---

## Project Structure

```
src/
├── components/
│   ├── Authentication/
│   │   ├── LoginForm.jsx          # Login form with email/password
│   │   ├── LoginPage.jsx           # Login page wrapper
│   │   ├── RegisterForm.jsx        # Registration form
│   │   ├── RegisterPage.jsx        # Registration page wrapper
│   │   └── UserProfile.jsx         # User avatar with initials
│   ├── common/
│   │   ├── RoomFilter.tsx          # Filter rooms by type
│   │   ├── RoomPaginator.jsx       # Pagination controls
│   │   └── RoomTypeSelector.jsx    # Room type dropdown with add new option
│   ├── home/
│   │   └── Home.jsx                # Welcome/home page
│   ├── layout/
│   │   ├── NavBar.jsx              # Navigation bar with auth state
│   │   └── Footer.jsx              # Footer component
│   └── room/
│       ├── AddRoom.jsx             # Form to add new rooms
│       ├── BookingRoomPage.jsx     # Room booking form
│       ├── EditRoom.jsx            # Form to edit existing rooms
│       ├── ExistingRooms.tsx       # Admin table view of all rooms
│       ├── Room.jsx                # Room listing with filter/pagination
│       ├── RoomCard.jsx            # Individual room card component
│       └── RoomListing.jsx        # Room listing page wrapper
├── utils/
│   ├── ApiAuth.js                  # Authentication API functions
│   └── ApiFunctions.js             # Room and booking API functions
├── assets/                         # Static images and assets
├── App.jsx                         # Main app component with routing
├── App.css                         # App-level styles
├── index.css                       # Global styles and Tailwind imports
└── main.jsx                        # Application entry point
```

---

## Usage

### For Guests
- Browse available rooms on the `/browse-rooms` page
- Filter rooms by type using the dropdown filter
- Click "Book now" on any room card to view details and make a reservation
- Fill in guest information, party size, and dates to complete booking

### For Administrators
- Log in to access protected routes (prefixed with `/p`)
- Navigate to "Existing Rooms" to view all rooms in a table format
- Add new rooms via `/add/new-room` with room type, price, and photo
- Edit existing rooms by clicking the edit icon in the rooms table
- Delete rooms using the delete button in the table
- Manage room types dynamically - add new types when creating/editing rooms

### Authentication
- Public routes: `/`, `/browse-rooms`, `/login`, `/register`
- Protected routes: `/p/*` (requires authentication)
- Session-based auth using cookies - login state persists across page refreshes

---

## Installation

```bash
# Clone the repository
git clone https://github.com/YourUsername/LakeSide-Frontend.git

# Navigate into the project directory
cd LakeSide-Frontend

# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Backend API Endpoints
The frontend expects the following backend endpoints:
- `/auth/create-account` - User registration
- `/auth/sign-in` - User login
- `/auth/profile` - Get current user profile
- `/rooms/all-rooms` - Get all rooms
- `/rooms/room-types` - Get available room types
- `/rooms/room/:id` - Get room by ID
- `/rooms/add/new-room` - Create new room
- `/rooms/update/room/:id` - Update room
- `/rooms/delete/room/:id` - Delete room
- `/rooms/browse-rooms/booking/:id` - Book a room

---

## License

This project is open-source and available under the MIT License.

---
