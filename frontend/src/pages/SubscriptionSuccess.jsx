import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function SubscriptionSuccess({ onLoginClick }) {
    return (
        <div className="w-full min-h-screen bg-white dark:bg-background-dark">
            <div className="sticky top-0 z-50 shadow-md">
                <Navbar onLoginClick={onLoginClick} />
            </div>
            <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-green-500 text-5xl">check_circle</span>
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">
                    Payment Successful!
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md mb-8">
                    Your subscription is now active. Start exploring millions of royalty-free assets.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-red-600 transition-colors"
                    >
                        Start Browsing
                    </Link>
                    <Link
                        to="/subscription"
                        className="px-6 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        View Plans
                    </Link>
                </div>
            </div>
        </div>
    );
}
