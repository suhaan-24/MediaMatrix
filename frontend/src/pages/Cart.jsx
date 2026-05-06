import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';

export default function Cart({ onLoginClick }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const cartItems = [
    { id: 1, title: 'Premium Commercial License: Blossoming Spring', type: 'image', price: 199.00, url: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=200&q=80' },
    { id: 2, title: 'Extended Vector License: Abstract Data', type: 'vector', price: 49.00, url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&q=80' },
  ];

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = () => {
    showToast('Proceeding to checkout...', 'success');
    setTimeout(() => navigate('/subscription'), 1000);
  };

  return (
    <div className="w-full min-h-screen bg-[#111111] text-white">
      <Navbar onLoginClick={onLoginClick} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items List */}
          <div className="flex-grow space-y-6">
            {cartItems.map(item => (
              <div key={item.id} className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-4 flex items-center gap-6 shadow-sm">
                <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-black">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{item.type}</p>
                  <button className="text-sm text-gray-400 hover:text-primary transition flex items-center gap-1">
                    <span className="material-icons-outlined text-sm">delete</span> Remove
                  </button>
                </div>
                <div className="text-xl font-bold">
                  ${item.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-8 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-gray-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-6 mb-8 flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 transition">
                Checkout
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                Secure SSL encrypted payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
