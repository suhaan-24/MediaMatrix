import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import Subscription from './pages/Subscription';
import SubscriptionSuccess from './pages/SubscriptionSuccess';
import AIGenerator from './pages/AIGenerator';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Blog from './pages/Blog';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import { useAuth } from './context/AuthContext';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-background-dark">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/search" element={<Search onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/details/:id" element={<Details onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/subscription" element={<Subscription onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/subscription/success" element={<SubscriptionSuccess onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/ai-generator" element={<AIGenerator onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/blog" element={<Blog onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/wishlist" element={<Wishlist onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/cart" element={<Cart onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/profile" element={
            <ProtectedRoute onLoginClick={() => setIsLoginOpen(true)}>
              <Profile onLoginClick={() => setIsLoginOpen(true)} />
            </ProtectedRoute>
          } />
        </Routes>
        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
