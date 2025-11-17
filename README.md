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

---

## License

This project is open-source and available under the MIT License.

---
