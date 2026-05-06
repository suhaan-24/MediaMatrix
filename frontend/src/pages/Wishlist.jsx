import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Wishlist({ onLoginClick }) {
  const navigate = useNavigate();

  const dummyFavourites = [
    { id: 1, title: 'Blossoming Spring', type: 'image', url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80' },
    { id: 2, title: 'Abstract Data', type: 'image', url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80' },
    { id: 3, title: 'Cyberpunk City', type: 'image', url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80' },
  ];

  return (
    <div className="w-full min-h-screen bg-[#111111] text-white">
      <Navbar onLoginClick={onLoginClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Favourites</h1>
            <p className="text-gray-400">Items you've liked will appear here.</p>
          </div>
          <button onClick={() => navigate('/search')} className="text-sm border border-gray-700 px-4 py-2 rounded-full hover:bg-gray-800 transition">
            Continue exploring
          </button>
        </div>

        {dummyFavourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500 bg-[#1A1A1A] rounded-2xl border border-gray-800">
            <span className="material-icons-outlined text-6xl mb-4">favorite_border</span>
            <p className="text-lg">Your wishlist is empty.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dummyFavourites.map(item => (
              <div key={item.id} className="relative group rounded-xl overflow-hidden cursor-pointer shadow-lg bg-[#1A1A1A] border border-gray-800 h-64">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                </div>
                <button className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg">
                  <span className="material-icons-outlined text-sm">favorite</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
