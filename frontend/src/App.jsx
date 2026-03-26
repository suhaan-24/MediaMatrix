import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import Subscription from './pages/Subscription';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
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
          <Route path="/profile" element={
            <ProtectedRoute onLoginClick={() => setIsLoginOpen(true)}>
              <div className="pt-24 text-center">
                <h1 className="text-3xl font-bold dark:text-white mb-4">My Profile</h1>
                <p className="text-gray-500">This is a fully protected route. Only logged-in users can see this!</p>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
