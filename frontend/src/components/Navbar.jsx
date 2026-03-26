import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import UploadModal from './UploadModal';

export default function Navbar({ onLoginClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleComingSoon = (feature) => (e) => {
    e.preventDefault();
    showToast(`${feature} — coming soon!`, 'info');
  };

  return (
    <>
      <nav className="bg-background-dark text-white border-b border-gray-800">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <span className="material-icons-outlined text-primary text-3xl">shutter_speed</span>
              <span className="font-bold text-xl tracking-tight hidden sm:block">MediaMatrix</span>
            </div>

            {/* Global Search Bar */}
            <div className="flex-1 max-w-2xl hidden md:flex">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-icons text-gray-500 text-xl">search</span>
                </div>
                <input 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  onKeyDown={handleSearchSubmit} 
                  className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-full leading-5 bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all" 
                  placeholder="Search for images, videos, music..." 
                  type="text"
                  aria-label="Search assets"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6 text-sm">
              <button aria-label="Favourites" onClick={handleComingSoon('Favourites page')} className="hover:text-primary transition"><span className="material-icons-outlined text-xl">favorite_border</span></button>
              <button aria-label="Shopping cart" onClick={handleComingSoon('Shopping cart')} className="hover:text-primary transition"><span className="material-icons-outlined text-xl">shopping_cart</span></button>
              {user ? (
                <div className="flex items-center gap-4">
                  <Link to="/profile" className="flex items-center gap-2 hover:text-primary transition group">
                    <span className="material-icons-outlined text-xl group-hover:scale-110 transition">account_circle</span>
                    <span className="text-gray-300 font-medium hidden sm:block">Hi, {user.name}</span>
                  </Link>
                  <button onClick={() => setIsUploadOpen(true)} className="px-4 py-1.5 bg-primary hover:bg-primary-hover border border-primary text-white rounded text-xs transition font-bold flex items-center gap-1">
                    <span className="material-icons text-sm">cloud_upload</span> Upload
                  </button>
                  <button onClick={logout} className="px-4 py-1.5 border border-gray-600 rounded text-xs hover:border-gray-400 transition font-medium">Log out</button>
                </div>
              ) : (
                <button onClick={onLoginClick} className="px-4 py-1.5 border border-gray-600 rounded text-xs hover:border-gray-400 transition font-medium">Log in</button>
              )}
            </div>
          </div>
          {/* MM-02: Removed dropdown arrows. Categories now link to search. MM-01: AI Generator routes to search. */}
          <div className="hidden md:flex space-x-8 pb-3 text-xs text-gray-400 font-medium">
            <Link to="/search?q=photos" className="hover:text-white transition">Images</Link>
            <Link to="/search?q=video" className="hover:text-white transition">Video</Link>
            <Link to="/search?q=music" className="hover:text-white transition">Music</Link>
            <Link to="/search?q=editorial" className="hover:text-white transition">Editorial</Link>
            <Link to="/search?q=3d" className="hover:text-white transition">3D</Link>
            <Link to="/search?q=ai+generated" className="text-primary hover:text-red-400 flex items-center gap-1">AI Generator <span className="bg-primary/20 text-primary px-1 rounded text-[9px] border border-primary/30">NEW</span></Link>
            <Link to="/subscription" className="ml-auto hover:text-white transition font-semibold">See Pricing</Link>
          </div>
        </div>
      </nav>
      {isUploadOpen && <UploadModal onClose={() => setIsUploadOpen(false)} />}
    </>
  );
}
