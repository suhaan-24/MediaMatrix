import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Profile({ onLoginClick }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || 'User');
  const [email, setEmail] = useState(user?.email || 'user@example.com');

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-[#111111] text-white">
      <Navbar onLoginClick={onLoginClick} />
      
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl">
                {name.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold">{name}</h2>
                <p className="text-xs text-gray-500">Personal Account</p>
              </div>
            </div>
            <nav className="space-y-2">
              <button className="w-full text-left px-4 py-2 bg-gray-800 rounded text-primary font-medium flex items-center gap-2">
                <span className="material-icons-outlined text-sm">person</span> Profile
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded font-medium flex items-center gap-2 transition">
                <span className="material-icons-outlined text-sm">lock</span> Security
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-400 hover:bg-gray-800 rounded font-medium flex items-center gap-2 transition">
                <span className="material-icons-outlined text-sm">credit_card</span> Billing
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-[#1A1A1A] rounded-xl border border-gray-800 p-8 shadow-lg">
            <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
            
            <form onSubmit={handleSave} className="space-y-6 max-w-lg">
              {/* Profile Photo */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-gray-700 flex items-center justify-center overflow-hidden">
                  <span className="material-icons-outlined text-4xl text-gray-500">add_a_photo</span>
                </div>
                <div>
                  <button type="button" onClick={() => showToast('Photo upload simulated', 'info')} className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded text-sm font-medium transition mb-2">
                    Change Logo / Avatar
                  </button>
                  <p className="text-xs text-gray-500">Recommended: Square image, at least 400x400px.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed focus:outline-none"
                    disabled
                  />
                  <p className="text-xs text-gray-600 mt-1">Email cannot be changed directly.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Bio / Description</label>
                  <textarea 
                    rows="4"
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-primary focus:outline-none transition"
                    placeholder="Tell us about yourself..."
                  ></textarea>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-800 flex justify-end gap-4">
                <button type="button" className="px-6 py-2 border border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full text-sm font-bold transition">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 transition">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
