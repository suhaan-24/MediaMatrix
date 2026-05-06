import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Profile({ onLoginClick }) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(user?.name || 'User');
  const [email, setEmail] = useState(user?.email || 'user@example.com');
  const [activeTab, setActiveTab] = useState('profile');

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-[#111111] text-gray-900 dark:text-white transition-colors duration-200">
      <Navbar onLoginClick={onLoginClick} />
      
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-lg">
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
              <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-2 rounded font-medium flex items-center gap-2 transition ${activeTab === 'profile' ? 'bg-red-50 dark:bg-gray-800 text-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <span className="material-icons-outlined text-sm">person</span> Profile
              </button>
              <button onClick={() => setActiveTab('security')} className={`w-full text-left px-4 py-2 rounded font-medium flex items-center gap-2 transition ${activeTab === 'security' ? 'bg-red-50 dark:bg-gray-800 text-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <span className="material-icons-outlined text-sm">lock</span> Security
              </button>
              <button onClick={() => setActiveTab('billing')} className={`w-full text-left px-4 py-2 rounded font-medium flex items-center gap-2 transition ${activeTab === 'billing' ? 'bg-red-50 dark:bg-gray-800 text-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                <span className="material-icons-outlined text-sm">credit_card</span> Billing
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-white dark:bg-[#1A1A1A] rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-lg">
            {activeTab === 'profile' && (
              <>
                <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
                <form onSubmit={handleSave} className="space-y-6 max-w-lg">
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                      <span className="material-icons-outlined text-4xl text-gray-400 dark:text-gray-500">add_a_photo</span>
                    </div>
                    <div>
                      <button type="button" onClick={() => showToast('Photo upload simulated', 'info')} className="px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm font-medium transition mb-2 text-gray-700 dark:text-gray-300">
                        Change Logo / Avatar
                      </button>
                      <p className="text-xs text-gray-500">Recommended: Square image, at least 400x400px.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Display Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Email Address</label>
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-500 cursor-not-allowed focus:outline-none"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed directly.</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Bio / Description</label>
                      <textarea 
                        rows="4"
                        className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition"
                        placeholder="Tell us about yourself..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-4">
                    <button type="button" className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:text-gray-900 hover:bg-gray-50 dark:hover:text-white dark:hover:bg-gray-800 rounded-full text-sm font-bold transition">
                      Cancel
                    </button>
                    <button type="submit" className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 transition">
                      Save Changes
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'security' && (
              <>
                <h1 className="text-2xl font-bold mb-6">Security Settings</h1>
                <form onSubmit={(e) => { e.preventDefault(); showToast('Password changed successfully!', 'success'); }} className="space-y-4 max-w-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Current Password</label>
                    <input type="password" required className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">New Password</label>
                    <input type="password" required minLength="8" className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">Confirm New Password</label>
                    <input type="password" required minLength="8" className="w-full bg-gray-50 dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-gray-900 dark:text-white focus:border-primary focus:outline-none transition" />
                  </div>
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-800 mt-6">
                    <button type="submit" className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 transition">
                      Update Password
                    </button>
                  </div>
                </form>
              </>
            )}

            {activeTab === 'billing' && (
              <>
                <h1 className="text-2xl font-bold mb-6">Billing & Subscription</h1>
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg p-6 mb-8 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Free Tier</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">You are currently on the basic free plan.</p>
                  </div>
                  <button onClick={() => showToast('Upgrading...', 'info')} className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-full text-sm font-bold transition">
                    Upgrade to Pro
                  </button>
                </div>
                
                <h2 className="text-lg font-bold mb-4">Payment Methods</h2>
                <div className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 text-center text-gray-500">
                  <span className="material-icons-outlined text-4xl mb-2">credit_card_off</span>
                  <p>No payment methods on file.</p>
                  <button onClick={() => showToast('Add payment modal opening...', 'info')} className="mt-4 text-primary font-medium hover:underline">Add a card</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
