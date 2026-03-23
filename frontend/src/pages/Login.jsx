import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login({ onClose }) {
    const { login, register } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        let result;
        if (isSignUp) {
            result = await register(name, email, password);
        } else {
            result = await login(email, password);
        }

        if (result.success) {
            onClose();
        } else {
            setError(result.message);
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
            <div className="bg-background-light dark:bg-background-dark w-full max-w-[1200px] h-auto md:h-[800px] flex flex-col md:flex-row rounded-xl shadow-2xl overflow-hidden relative">
                <button onClick={onClose} className="absolute top-6 right-6 z-20 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors bg-white/10 rounded-full p-1 backdrop-blur-md">
                    <span className="material-icons">close</span>
                </button>
                <div className="w-full md:w-1/2 relative bg-black hidden md:flex flex-col justify-center items-center text-center p-12 text-white">
                    <div className="absolute inset-0 z-0">
                        <img alt="Astronaut floating in deep space with blue nebula" className="w-full h-full object-cover opacity-80 mix-blend-overlay" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClrl3HR4vIKF866amn2rT_eBC8J9x40NPhmxoPI9nsprV9CXQP1Es8vffcuFG9iad2NIsDD9CgpBvnVmgSBrnh7m3XskpLzEuDhQ3_nF8RdTb3GmWAJVuFznK_Tim0JyOjIBdsrvCn2xKWKMyPwI61SLOAEv8qfGn4FYfltT_hdlUTUz8D7_nQWMS9azDO8mE-01lBVpK8UNmTP7Cm2gzcYiMnSSDCBCEuo7yIovOi2kuoEYCUYk9_goK8F1rm-bjJFJEuoxd9M" />
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 to-black/80 mix-blend-multiply"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                    </div>
                    <div className="relative z-10 max-w-md mt-auto mb-32">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight drop-shadow-lg">Bring your ideas to life</h1>
                        <p className="text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md font-light">
                            Tell your story with compelling images, videos, and music. Access our library of over 500 million high-quality assets.
                        </p>
                    </div>
                </div>
                <div className="w-full md:w-1/2 flex flex-col p-8 md:p-12 overflow-y-auto">
                    <div className="max-w-md w-full mx-auto flex flex-col flex-grow justify-center">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                            {isSignUp ? 'Create an Account' : 'Log in to your account'}
                        </h2>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2" htmlFor="name">Full Name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" id="name" type="text" placeholder="John Doe" />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" id="email" type="email" placeholder="Email address" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2" htmlFor="password">Password</label>
                                <div className="relative">
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" id="password" type="password" placeholder="Password (min 6 chars)" />
                                </div>
                            </div>
                            
                            {!isSignUp && (
                                <div>
                                    <a className="text-sm font-medium text-gray-900 dark:text-white underline decoration-1 hover:text-blue-600 transition-colors" href="#">
                                        Forgot your password?
                                    </a>
                                </div>
                            )}

                            <button disabled={loading} className="w-full bg-primary hover:bg-black text-white font-bold py-3.5 rounded-lg transition-colors duration-200 disabled:opacity-50" type="submit">
                                {loading ? 'Processing...' : (isSignUp ? 'Sign up' : 'Log in')}
                            </button>
                        </form>
                        
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">or</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        </div>

                        <div className="text-center space-y-3">
                            <p className="text-gray-600 dark:text-gray-400">
                                {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}
                            </p>
                            <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }} className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold py-3.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" type="button">
                                {isSignUp ? 'Log in instead' : 'Create your account'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
