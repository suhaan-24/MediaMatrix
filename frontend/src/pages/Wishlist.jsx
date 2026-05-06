import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Wishlist({ onLoginClick }) {
  const navigate = useNavigate();

  const [favourites, setFavourites] = React.useState(() => {
    return JSON.parse(localStorage.getItem('wishlist') || '[]');
  });

  const removeFromWishlist = (id, e) => {
    if (e) e.stopPropagation();
    const newFavs = favourites.filter(item => item._id !== id);
    setFavourites(newFavs);
    localStorage.setItem('wishlist', JSON.stringify(newFavs));
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#111111] text-gray-900 dark:text-white transition-colors duration-200">
      <Navbar onLoginClick={onLoginClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Your Favourites</h1>
            <p className="text-gray-500 dark:text-gray-400">Items you've liked will appear here.</p>
          </div>
          <button onClick={() => navigate('/search')} className="text-sm border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition">
            Continue exploring
          </button>
        </div>

        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-white dark:bg-[#1A1A1A] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
            <span className="material-icons-outlined text-6xl mb-4 text-gray-400 dark:text-gray-500">favorite_border</span>
            <p className="text-lg">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favourites.map(item => (
              <div key={item._id} onClick={() => navigate(`/details/${item._id}`)} className="relative group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg bg-white dark:bg-[#1A1A1A] border border-gray-200 dark:border-gray-800 h-64 transition-shadow">
                {item.type && (item.type.includes('video') || item.type.includes('audio')) ? (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <span className="material-icons-outlined text-5xl text-white">{item.type.includes('video') ? 'videocam' : 'music_note'}</span>
                  </div>
                ) : (
                  <img src={item.fileUrl ? `http://localhost:5001${item.fileUrl}` : 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80'; }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100"></div>
                <div className="absolute bottom-4 left-4 text-white z-10">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <button onClick={(e) => removeFromWishlist(item._id, e)} className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg z-20 hover:bg-primary-hover">
                  <span className="material-icons-outlined text-sm">close</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
