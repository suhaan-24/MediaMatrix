import React, { createContext, useState, useContext, useCallback } from 'react';

const ToastContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

let toastId = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'info') => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none" style={{ maxWidth: '380px' }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            onClick={() => dismissToast(toast.id)}
            className={`pointer-events-auto flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl text-sm font-medium cursor-pointer transform transition-all duration-300 animate-slide-in backdrop-blur-md border ${
              toast.type === 'success' ? 'bg-green-600/95 text-white border-green-500/50' :
              toast.type === 'error'   ? 'bg-red-600/95 text-white border-red-500/50' :
              'bg-gray-800/95 text-white border-gray-700/50'
            }`}
          >
            <span className="material-icons-outlined text-lg flex-shrink-0">
              {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
            </span>
            <span className="flex-1">{toast.message}</span>
            <span className="material-icons-outlined text-base opacity-60 hover:opacity-100 flex-shrink-0">close</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
