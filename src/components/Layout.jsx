import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navItems } from '../nav-items';
import NotePopup from './NotePopup';

const Layout = ({ children }) => {
  const [isNotePopupOpen, setIsNotePopupOpen] = useState(false);
  const navigate = useNavigate();
  const [lastKeyPressTime, setLastKeyPressTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && event.key === 'm') {
        event.preventDefault();
        const currentTime = new Date().getTime();
        if (currentTime - lastKeyPressTime < 500) {
          // Double press detected
          navigate('/notes');
        } else {
          setIsNotePopupOpen(prev => !prev);
        }
        setLastKeyPressTime(currentTime);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lastKeyPressTime, navigate]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600">AIdeaForge</Link>
              </div>
            </div>
            <div className="flex items-center">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      {isNotePopupOpen && <NotePopup onClose={() => setIsNotePopupOpen(false)} />}
    </div>
  );
};

export default Layout;