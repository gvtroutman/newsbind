import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NewspaperIcon, UserIcon, LogOutIcon, UserPlusIcon, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const { currentUser, isGuest, logout, setGuestMode } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleGuestAccess = () => {
    setGuestMode(true);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white backdrop-blur-lg bg-opacity-90 sticky top-0 z-50 border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <NewspaperIcon className="h-8 w-8 text-gray-900" />
            <span className="text-xl font-semibold text-gray-900">Newsbind</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <>
                <Link
                  to="/profile"
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <UserIcon className="h-5 w-5 text-gray-700" />
                </Link>
                <button
                  onClick={() => logout()}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                >
                  <LogOutIcon className="h-5 w-5 text-gray-700" />
                </button>
              </>
            ) : isGuest ? (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full 
                         text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
              >
                Sign In
              </Link>
            ) : (
              <>
                <button
                  onClick={handleGuestAccess}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 
                           transition-colors duration-200"
                >
                  <UserPlusIcon className="h-5 w-5 mr-2" />
                  Guest Access
                </button>
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full 
                         text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 
                     focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            {currentUser ? (
              <div className="space-y-4">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-base font-medium text-gray-700 hover:text-gray-900 
                           hover:bg-gray-100 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 
                           hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  Sign Out
                </button>
              </div>
            ) : isGuest ? (
              <Link
                to="/login"
                className="block px-4 py-2 text-base font-medium text-gray-900 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            ) : (
              <div className="space-y-4">
                <button
                  onClick={handleGuestAccess}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 
                           hover:text-gray-900 hover:bg-gray-100 rounded-md"
                >
                  Guest Access
                </button>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-base font-medium text-white bg-gray-900 
                           hover:bg-gray-800 rounded-md text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;