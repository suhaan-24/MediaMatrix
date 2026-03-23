import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from './pages/Details';
import Subscription from './pages/Subscription';
import Login from './pages/Login';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="w-full min-h-screen relative">
        <Routes>
          <Route path="/" element={<Home onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/search" element={<Search onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/details" element={<Details onLoginClick={() => setIsLoginOpen(true)} />} />
          <Route path="/subscription" element={<Subscription onLoginClick={() => setIsLoginOpen(true)} />} />
        </Routes>
        {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} />}
      </div>
    </BrowserRouter>
  );
}

export default App;
