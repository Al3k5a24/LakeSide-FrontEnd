import React, { useEffect, useState } from "react";
import { Link, matchPath, NavLink, useLocation } from "react-router-dom";
import { getUserProfile } from "../../utils/ApiAuth";
import UserProfile from "../Authentication/UserProfile";

const NavBar = () => {
  const [isUserAuth, setIsUserAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: ""
  });
  const location = useLocation();

  const hideElementLogin = location.pathname === '/login';
  const hideElementRegister = location.pathname === '/register';
  const currentURL = window.location.pathname;

  const match = matchPath("/u/*", currentURL);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (!match) {
          setUser(null);
          setIsLoading(false);
          setIsUserAuth(false);
          return;
        }
        try {
          setIsLoading(false);
          const data = await getUserProfile();
          setUser(data);
          setIsUserAuth(true);
        } catch (error) {
          console.error('Error', error);
          setUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        setUser(null);
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [currentURL, match]);

  if (hideElementLogin || hideElementRegister) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {!isUserAuth ? (
              <Link to="/" className="flex items-center group">
                <svg className="w-8 h-8 text-red-500 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-2xl font-bold">
                  <span className="text-red-500 group-hover:text-red-600 transition-colors">lakeSide</span>
                  <span className="text-gray-900 ml-1">hotel</span>
                </span>
              </Link>
            ) : (
              <Link to="/u" className="flex items-center group">
                <svg className="w-8 h-8 text-red-500 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-2xl font-bold">
                  <span className="text-red-500 group-hover:text-red-600 transition-colors">lakeSide</span>
                  <span className="text-gray-900 ml-1">hotel</span>
                </span>
              </Link>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isUserAuth ? (
              <NavLink
                to="/browse-rooms"
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-300 relative group ${
                    isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Browse Rooms
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </>
                )}
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/u/browse-rooms"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-300 relative group ${
                      isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      Browse Rooms
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </>
                  )}
                </NavLink>

                <NavLink
                  to="/u/my-booking"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-all duration-300 relative group ${
                      isActive ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      My Bookings
                      <span className={`absolute -bottom-1 left-0 h-0.5 bg-red-500 transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}></span>
                    </>
                  )}
                </NavLink>
              </>
            )}
          </div>

          {/* Right Side - User Profile or Login */}
          <div className="hidden md:flex items-center">
            {!isLoading && user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center ring-2 ring-red-100 hover:ring-red-200 transition-all cursor-pointer">
                  <UserProfile userData={user} />
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Log In
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
            >
              <span className="sr-only">Open menu</span>
              {!isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white border-t border-gray-100">
          {!isUserAuth ? (
            <NavLink
              to="/browse-rooms"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-red-50 text-red-500'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                }`
              }
            >
              Browse Rooms
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/u/browse-rooms"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`
                }
              >
                Browse Rooms
              </NavLink>

              <NavLink
                to="/u/my-booking"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-red-50 text-red-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-red-500'
                  }`
                }
              >
                My Bookings
              </NavLink>
            </>
          )}

          {/* Mobile User Section */}
          <div className="pt-4 border-t border-gray-100">
            {!isLoading && user ? (
              <div className="px-4 py-2">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
                    <UserProfile userData={user} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block mx-4 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-center text-sm font-medium rounded-lg shadow-md"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;