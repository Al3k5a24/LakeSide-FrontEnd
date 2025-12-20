# <h1 style="font-size: 36px; margin: 0;">LakeSide Hotel Booking Web Application 🏨</h1>

A modern web-based hotel room booking platform built with React and Vite. This frontend application allows guests to browse and book hotel rooms, while providing administrators with tools to manage room inventory, pricing, and bookings efficiently. The application features a responsive design, secure authentication, and intuitive user interfaces for both guests and administrators.

⚠️ **Please read Important Requirements & Limitations section carefully before setting up and running this application.**

- [Important Requirements & Limitations](#important-requirements--limitations)
- [Features](#features-)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features 

- **User Registration & Authentication**: Secure sign-up and login functionality with session-based authentication using cookies. Login state persists across page refreshes, providing a seamless user experience.
- **Room Browsing**: Guests can browse all available rooms with filtering by room type and pagination support. The interface displays room cards with images, prices, and key details for easy comparison.
- **Room Booking**: Users can book rooms by providing guest details, number of adults/children, and check-in/check-out dates. The booking system validates dates and calculates pricing automatically.
- **Admin Room Management**: Administrators can add new rooms, edit existing room details (type, price, photos), and delete rooms through an intuitive table interface with inline editing capabilities.
- **Room Type Management**: Dynamic room type selection with ability to add custom room types on the fly when creating or editing rooms, providing flexibility in room categorization.
- **Image Upload & Preview**: Support for room photo uploads with real-time preview before submission, allowing administrators to verify images before saving.
- **Booking History**: Authenticated users can view their booking history and manage their reservations through a dedicated interface.
- **Responsive Design**: Built with Tailwind CSS and Bootstrap for optimal viewing across desktop, tablet, and mobile devices with adaptive layouts.
- **Protected Routes**: Separate routing for authenticated users (`/u/*`) and public visitors, ensuring proper access control and user experience.
- **Session Management**: Cookie-based session authentication that automatically handles user state and redirects unauthenticated users appropriately.

---

## Tech Stack

- **React 19** - Modern UI library for building component-based interfaces with hooks and functional components
- **Vite 7** - Fast build tool and development server with hot module replacement (HMR)
- **React Router DOM 7** - Client-side routing and navigation with protected route support
- **Axios** - HTTP client for API communication with automatic cookie handling and request/response interceptors
- **Tailwind CSS 4** - Utility-first CSS framework for rapid UI development and responsive design
- **Bootstrap 5** - Additional UI components, grid system, and pre-styled components
- **React Icons** - Comprehensive icon library for UI elements and visual indicators
- **ESLint** - Code linting and quality checks for maintaining code standards

---

## Screenshots

<p align="center">
  <img src="/pictures/BrowseRooms-1.png" width="700"/>
  <img src="/pictures/BrowseRooms-2.png" width="700"/>
  <img src="/pictures/BookRoomPage.png" width="700"/>
  <img src="/pictures/MyBookings.png" width="700"/>
</p>


## Project Structure

```
LakeSide-Frontend/
├── src/
│   ├── components/
│   │   ├── Authentication/
│   │   │   ├── LoginForm.jsx          # Login form with email/password validation
│   │   │   ├── LoginPage.jsx           # Login page wrapper with layout
│   │   │   ├── RegisterForm.jsx        # Registration form with validation
│   │   │   ├── RegisterPage.jsx        # Registration page wrapper
│   │   │   └── UserProfile.jsx         # User avatar component with initials display
│   │   ├── common/
│   │   │   ├── RoomFilter.tsx          # Filter rooms by type dropdown component
│   │   │   ├── RoomPaginator.jsx       # Pagination controls for room listings
│   │   │   └── RoomTypeSelector.jsx    # Room type dropdown with add new option
│   │   ├── home/
│   │   │   └── Home.jsx                # Welcome/home page component
│   │   ├── layout/
│   │   │   ├── NavBar.jsx              # Navigation bar with auth state and user menu
│   │   │   └── Footer.jsx              # Footer component with site information
│   │   └── room/
│   │       ├── Listing/
│   │       │   ├── Room.jsx            # Room listing component with filter/pagination
│   │       │   ├── RoomCard.jsx        # Individual room card component
│   │       │   └── RoomListing.jsx    # Room listing page wrapper
│   │       ├── myBookings/
│   │       │   └── MyBRoom.jsx        # User booking history component
│   │       ├── roomPosting/
│   │       │   ├── AddRoom.jsx        # Form to add new rooms with image upload
│   │       │   ├── EditRoom.jsx       # Form to edit existing rooms
│   │       │   └── ExistingRooms.tsx  # Admin table view of all rooms
│   │       └── BookingRoomPage.jsx     # Room booking form with date selection
│   ├── utils/
│   │   ├── ApiAuth.js                  # Authentication API functions (login, register, profile)
│   │   ├── ApiFunctions.js             # Room and booking API functions
│   │   └── BookingHistoryAPI.js        # Booking history API functions
│   ├── assets/                         # Static images and assets
│   ├── App.jsx                         # Main app component with routing configuration
│   ├── App.css                         # App-level styles and component styles
│   ├── index.css                       # Global styles and Tailwind imports
│   └── main.jsx                        # Application entry point and React root
├── public/                             # Public static assets
├── package.json                        # Project dependencies and scripts
├── vite.config.js                      # Vite build configuration
├── tailwind.config.js                  # Tailwind CSS configuration
└── README.md                           # Project documentation
```

### Key Components

- **App.jsx**: The main application component that sets up React Router with public and authenticated routes. Handles route protection and navigation structure.
- **ApiAuth.js**: Contains authentication API functions including `createAccount()`, `signIn()`, and `getProfile()` with cookie-based session management.
- **ApiFunctions.js**: Core API functions for room operations including `getAllRooms()`, `addRoom()`, `updateRoom()`, `deleteRoom()`, and `bookRoom()`.
- **NavBar.jsx**: Navigation component that displays different menu items based on authentication state, including user profile and logout functionality.
- **RoomListing.jsx**: Main room browsing page that integrates filtering, pagination, and room card display components.
- **ExistingRooms.tsx**: Admin interface displaying all rooms in a table format with edit and delete actions.
- **BookingRoomPage.jsx**: Booking form component that handles date selection, guest information, and booking submission.

---

## Installation

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js 18.x or higher** - [Download Node.js](https://nodejs.org/)
- **npm 9.x or higher** - Comes bundled with Node.js (or use yarn/pnpm as alternatives)
- **Git** - For cloning the repository (optional)
- **Backend API Server** - The application requires a running backend API server (see Configuration section)

### Step-by-Step Installation

1. **Clone the repository** (or download the project files):
   ```bash
   git clone https://github.com/YourUsername/LakeSide-Frontend.git
   cd LakeSide-Frontend
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

   This will install all required packages including React, Vite, React Router, Axios, Tailwind CSS, Bootstrap, and other dependencies listed in `package.json`.

3. **Verify installation**:
   ```bash
   npm run dev
   ```

   If the installation was successful, the development server should start and you'll see output indicating the local server URL (typically `http://localhost:5173`).

4. **Stop the development server** (Ctrl+C) and proceed to the Configuration section to set up the backend API connection.

---

## Important Requirements & Limitations

### Backend API Requirements

This frontend application **requires a running backend API server** to function properly:

#### 1. **Backend Server Must Be Running**

- ✅ **Required**: A backend API server running on `http://localhost:8080` (or configured base URL)
- ❌ **Will NOT work**: Without a backend server, all API calls will fail
- **Why**: The application makes HTTP requests to backend endpoints for authentication, room data, and bookings. All functionality depends on these API calls.

**How to verify**: Ensure your backend server is running and accessible at the configured base URL before starting the frontend application.

#### 2. **Required API Endpoints**

The frontend expects the following backend endpoints to be available:

**Authentication Endpoints:**
- `POST /auth/create-account` - User registration
- `POST /auth/sign-in` - User login
- `GET /auth/profile` - Get current user profile

**Room Management Endpoints:**
- `GET /rooms/all-rooms` - Get all rooms
- `GET /rooms/room-types` - Get available room types
- `GET /rooms/room/:id` - Get room by ID
- `POST /rooms/add/new-room` - Create new room
- `PUT /rooms/update/room/:id` - Update room
- `DELETE /rooms/delete/room/:id` - Delete room

**Booking Endpoints:**
- `POST /rooms/browse-rooms/booking/:id` - Book a room
- `GET /rooms/my-bookings` - Get user's booking history (if implemented)

**Before using**: Ensure your backend API implements all these endpoints with the expected request/response formats.

#### 3. **Cookie-Based Authentication Required**

- ✅ **Works with**: Backend that sets HTTP-only cookies for session management
- ✅ **Required**: Backend must support CORS with credentials (`Access-Control-Allow-Credentials: true`)
- ❌ **Does NOT work**: Token-based authentication (JWT in localStorage) without modifications
- **Why**: The frontend uses `withCredentials: true` in Axios configuration to send cookies with requests.

**Current implementation**: All API calls include `withCredentials: true` to support cookie-based sessions. The backend must be configured to accept credentials from the frontend origin.

#### 4. **CORS Configuration**

The backend must be configured to allow requests from the frontend origin:

- **Development**: `http://localhost:5173` (default Vite dev server port)
- **Production**: Your production frontend domain
- **Headers**: Must allow `Content-Type`, `Authorization` (if used), and credentials

**Backend CORS configuration example** (conceptual):
```javascript
// Backend must allow
Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
```

### Browser Compatibility

- ✅ **Modern Browsers**: Chrome, Firefox, Edge, Safari (latest versions)
- ✅ **Required Features**: ES6+ JavaScript, CSS Grid, Flexbox, Fetch API
- ❌ **Does NOT support**: Internet Explorer 11 or older browsers without ES6 support

### Development Environment

- **Node.js Version**: Requires Node.js 18.x or higher for Vite 7 compatibility
- **Package Manager**: npm, yarn, or pnpm can be used
- **Port Conflicts**: If port 5173 is in use, Vite will automatically try the next available port

### Production Deployment Considerations

1. **Environment Variables**: API base URL should be configured via environment variables for different environments
2. **Build Optimization**: Run `npm run build` to create optimized production build
3. **Static Hosting**: The built application can be served from any static file server (Nginx, Apache, Vercel, Netlify, etc.)
4. **API URL Configuration**: Update API base URL in production to point to production backend server

### Known Limitations

1. **No Offline Support**: Application requires active internet connection and backend API access
2. **No Real-time Updates**: Room availability and booking status are fetched on page load, not updated in real-time
3. **Image Upload Size**: No explicit file size limits configured in frontend (backend should handle validation)
4. **Date Validation**: Client-side date validation only; backend should validate booking dates
5. **Error Handling**: Some API errors may not have user-friendly error messages displayed

### Before Running the Application

1. ✅ Ensure backend API server is running and accessible
2. ✅ Verify backend CORS configuration allows frontend origin
3. ✅ Confirm all required API endpoints are implemented in backend
4. ✅ Check that backend supports cookie-based authentication
5. ✅ Update API base URL in `ApiAuth.js`, `ApiFunctions.js`, and `BookingHistoryAPI.js` if different from `http://localhost:8080`
6. ✅ Test backend endpoints independently (using Postman or curl) before connecting frontend

---

## Usage

### Basic Usage

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

3. **Browse rooms** as a guest or **log in** to access authenticated features

### For Guests

#### Browsing and Booking Rooms

1. **Browse Available Rooms**:
   - Navigate to `/browse-rooms` from the home page
   - View all available rooms displayed as cards with images and details
   - Use the room type filter dropdown to filter rooms by category
   - Navigate through pages using pagination controls at the bottom

2. **Book a Room**:
   - Click "Book now" button on any room card
   - You'll be redirected to the booking page (`/browse-rooms/booking/:roomId`)
   - Fill in the booking form:
     - Guest full name
     - Guest email
     - Number of adults
     - Number of children
     - Check-in date (select from date picker)
     - Check-out date (select from date picker)
   - Click "Book Now" to submit the reservation
   - You'll receive confirmation if the booking is successful

3. **View Booking History** (requires authentication):
   - Log in to your account
   - Navigate to "My Bookings" from the navigation menu
   - View all your past and current bookings

### For Administrators

#### Managing Rooms

1. **View All Rooms**:
   - Navigate to `/existingRooms` or `/u/existingRooms` (if authenticated)
   - View all rooms in a table format with details:
     - Room ID
     - Room type
     - Room price
     - Actions (Edit/Delete buttons)

2. **Add a New Room**:
   - Navigate to `/add/new-room`
   - Fill in the room form:
     - Select or add a room type (use dropdown or type new type)
     - Enter room price (numeric value)
     - Upload a room photo (click to select image file)
     - Preview the uploaded image before submission
   - Click "Add Room" to save

3. **Edit an Existing Room**:
   - From the existing rooms table, click the edit icon/button
   - You'll be redirected to `/edit-room/:roomId`
   - Modify room type, price, or photo
   - Upload a new photo if needed (preview available)
   - Click "Update Room" to save changes

4. **Delete a Room**:
   - From the existing rooms table, click the delete button
   - Confirm the deletion (if confirmation dialog appears)
   - The room will be removed from the system

#### Room Type Management

- When adding or editing rooms, you can:
  - Select from existing room types in the dropdown
  - Type a new room type name to create it on the fly
  - The new room type will be available for future use

### Authentication

#### Public Routes (No Authentication Required)

- `/` - Home page
- `/browse-rooms` - Browse all available rooms
- `/browse-rooms/booking/:roomId` - Book a specific room
- `/login` - User login page
- `/register` - User registration page
- `/existingRooms` - View all rooms (admin view)
- `/add/new-room` - Add new room (admin)
- `/edit-room/:roomId` - Edit room (admin)

#### Authenticated Routes (Requires Login)

- `/u` - Home page for authenticated users
- `/u/browse-rooms` - Browse rooms (authenticated)
- `/u/browse-rooms/booking/:roomId` - Book room (authenticated)
- `/u/existingRooms` - Manage rooms (admin, authenticated)
- `/u/my-booking` - View booking history

**Note**: The application uses session-based authentication with cookies. Once logged in, your session persists across page refreshes until you log out or the session expires.

### Example Workflows

#### Guest Booking Workflow

```
1. Visit home page (/)
2. Click "Browse Rooms" → Navigate to /browse-rooms
3. Filter by room type (optional)
4. Click "Book now" on desired room
5. Fill in booking form with dates and guest info
6. Submit booking
7. Receive confirmation
```

#### Admin Room Management Workflow

```
1. Log in at /login
2. Navigate to "Existing Rooms" (/u/existingRooms)
3. To add: Click "Add Room" → Fill form → Upload photo → Save
4. To edit: Click edit icon → Modify details → Update
5. To delete: Click delete button → Confirm
```

---

## Configuration

### API Base URL Configuration

The application connects to a backend API server. The base URL is configured in three utility files:

- `src/utils/ApiAuth.js`
- `src/utils/ApiFunctions.js`
- `src/utils/BookingHistoryAPI.js`

**Current Configuration**:
```javascript
export const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true  // for cookies to be sent along with requests
})
```

**To Change the API URL**:

1. **For Development**: Update the `baseURL` in all three files to your local backend URL
2. **For Production**: Consider using environment variables:

   Create a `.env` file in the project root:
   ```env
   VITE_API_BASE_URL=http://your-production-api.com
   ```

   Then update the API configuration files:
   ```javascript
   export const api = axios.create({
       baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
       withCredentials: true
   })
   ```

### Vite Configuration

The project uses Vite 7 for building and development. Configuration is in `vite.config.js`:

- **Development Server Port**: Default is 5173, automatically increments if port is in use
- **Build Output**: Production builds are output to `dist/` directory
- **Hot Module Replacement**: Enabled by default for fast development

### Tailwind CSS Configuration

Tailwind CSS is configured in `tailwind.config.js`:

- Custom theme settings can be added here
- Additional plugins can be configured
- Content paths are automatically configured to scan `src/` directory

### ESLint Configuration

Code linting is configured in `eslint.config.js`:

- React-specific linting rules
- React Hooks linting rules
- Code quality and best practices enforcement

Run linter:
```bash
npm run lint
```

### Build Configuration

**Development Build**:
```bash
npm run dev
```
- Starts development server with HMR
- Source maps enabled for debugging
- Fast refresh for React components

**Production Build**:
```bash
npm run build
```
- Optimizes and minifies code
- Tree-shakes unused code
- Outputs to `dist/` directory

**Preview Production Build**:
```bash
npm run preview
```
- Serves the production build locally
- Useful for testing production build before deployment

---

## Troubleshooting

### Common Issues

#### 1. **API Connection Errors**

**Problem**: "Network Error" or "Failed to fetch" errors in console

**Solutions**:
- ✅ Verify backend server is running on `http://localhost:8080`
- ✅ Check backend CORS configuration allows frontend origin
- ✅ Ensure `withCredentials: true` is set in API configuration
- ✅ Verify backend accepts credentials in CORS headers
- ✅ Check browser console for specific error messages
- ✅ Test backend endpoints directly (using Postman or curl)

#### 2. **Authentication Not Working**

**Problem**: Login succeeds but user is not recognized as authenticated

**Solutions**:
- ✅ Verify cookies are being set by backend (check browser DevTools → Application → Cookies)
- ✅ Ensure backend sets `HttpOnly` and `SameSite` cookie attributes correctly
- ✅ Check that `withCredentials: true` is in all API configurations
- ✅ Verify backend session management is working correctly
- ✅ Clear browser cookies and try logging in again

#### 3. **Module Not Found Errors**

**Problem**: `ModuleNotFoundError` or import errors

**Solutions**:
- ✅ Run `npm install` to ensure all dependencies are installed
- ✅ Delete `node_modules` and `package-lock.json`, then run `npm install` again
- ✅ Verify Node.js version is 18.x or higher: `node --version`
- ✅ Check that all import paths in code are correct

#### 4. **Port Already in Use**

**Problem**: "Port 5173 is in use" error

**Solutions**:
- ✅ Vite will automatically try the next available port
- ✅ Or manually specify a port: `npm run dev -- --port 3000`
- ✅ Close other applications using port 5173
- ✅ Check what's using the port: `netstat -ano | findstr :5173` (Windows) or `lsof -i :5173` (Mac/Linux)

#### 5. **Images Not Uploading**

**Problem**: Room photo upload fails or doesn't preview

**Solutions**:
- ✅ Verify backend accepts multipart/form-data for image uploads
- ✅ Check file size limits (backend may have restrictions)
- ✅ Ensure image file format is supported (JPG, PNG, etc.)
- ✅ Check browser console for specific error messages
- ✅ Verify FormData is being created correctly in `addRoom()` function

#### 6. **Routing Issues**

**Problem**: Routes not working or 404 errors

**Solutions**:
- ✅ Verify React Router is properly configured in `App.jsx`
- ✅ Check that route paths match exactly (case-sensitive)
- ✅ Ensure all route components are imported correctly
- ✅ For production builds, configure server to serve `index.html` for all routes (SPA routing)

#### 7. **Styling Issues**

**Problem**: Tailwind CSS classes not applying

**Solutions**:
- ✅ Verify Tailwind is imported in `index.css`: `@import "tailwindcss";`
- ✅ Check `tailwind.config.js` content paths include `src/`
- ✅ Restart development server after Tailwind config changes
- ✅ Ensure Bootstrap CSS is also imported if using Bootstrap components

#### 8. **Build Errors**

**Problem**: `npm run build` fails

**Solutions**:
- ✅ Fix all ESLint errors first: `npm run lint`
- ✅ Check for TypeScript errors if using TypeScript files
- ✅ Verify all imports are correct and files exist
- ✅ Check Node.js version compatibility
- ✅ Clear build cache: Delete `dist/` folder and rebuild

### Getting Help

- **Check Browser Console**: Most errors will appear in the browser's developer console (F12)
- **Check Network Tab**: Verify API requests are being made and check response status codes
- **Review Backend Logs**: Check backend server logs for API errors
- **Verify Dependencies**: Ensure all packages are up to date: `npm outdated`
- **React Documentation**: https://react.dev/
- **Vite Documentation**: https://vitejs.dev/
- **React Router Documentation**: https://reactrouter.com/

### Debugging Tips

1. **Enable Verbose Logging**: Add `console.log()` statements in API functions to track request/response flow
2. **Use React DevTools**: Install React Developer Tools browser extension for component inspection
3. **Network Inspection**: Use browser DevTools Network tab to inspect API requests and responses
4. **Check Cookie Storage**: Verify cookies in DevTools → Application → Cookies
5. **Test API Independently**: Use Postman or curl to test backend endpoints separately

---

## License

This project is open-source and available under the MIT License.

---

## Notes

- This application is a **frontend-only** implementation and requires a separate backend API server to function
- The application uses **cookie-based session authentication** - ensure your backend supports this authentication method
- All API endpoints must be implemented in the backend with the expected request/response formats
- The application is designed for **modern browsers** with ES6+ JavaScript support
- For production deployment, configure environment variables for API base URLs and other environment-specific settings
- Room images are uploaded as multipart/form-data - ensure backend handles file uploads correctly
- The application uses both **Tailwind CSS** and **Bootstrap** - be mindful of potential style conflicts when adding custom styles
- Protected routes use the `/u/*` prefix for authenticated users, while public routes are accessible without authentication
- Date validation for bookings should be implemented on both frontend (UX) and backend (security) sides
- Consider implementing loading states and error boundaries for better user experience in production
