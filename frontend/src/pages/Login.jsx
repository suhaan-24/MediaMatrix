import React from 'react';

export default function Login({ onClose }) {
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
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">Login or Signup</h2>
                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2" htmlFor="email">Email or username</label>
                                <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" id="email" name="email" placeholder="Email or username" type="text" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2" htmlFor="password">Password</label>
                                <div className="relative">
                                    <input className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:bg-gray-800 dark:text-white placeholder-gray-400" id="password" name="password" placeholder="Password" type="password" />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" type="button">
                                        <span className="material-icons text-xl">visibility_off</span>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <a className="text-sm font-medium text-gray-900 dark:text-white underline decoration-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" href="#">
                                    Forgot your password?
                                </a>
                            </div>
                            <button onClick={onClose} className="w-full bg-primary hover:bg-black text-white font-bold py-3.5 rounded-lg transition-colors duration-200 dark:border dark:border-gray-700" type="button">
                                Log in
                            </button>
                        </form>
                        <div className="space-y-3 mt-4">
                            <button className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3" type="button">
                                Log in with SSO
                            </button>
                            <button className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3" type="button">
                                <img alt="Google logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp9yXI7Tij5e4dTyuMzppLS2S2eLcy6aiydH6miQXDl8YrJREEFY5i4r7xkyHGtcHF-h0yI1HFRraHKe9xVeo5L6ke0herKQJ64vfbAahHhazEpw_dgBbkDRDO9UQ1mE4_0C7DYB_K6-1oJ3tTw_pEsYR_dCXui3jMZG-RjMLs3UTYXiFpfWHYFSABv3fwREsI8GWOO6uWjLfjjiov_9zhcH6BOV625hM-EP_66EWdA1AWdqGqP9j6rI61bgJZOxz8RVttYV79e2Q" />
                                Continue with Google
                            </button>
                            <button className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3" type="button">
                                <img alt="Facebook logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUW2x8sq2SEPLbo1YIvqwhDE9aOUtv6LGaT3WIxt9QVLLon_puIknM4efB21WtaEa84hWPC_MiZeq6JFtrwpeBOF0yncNszKPmycNzcXfBLr8TQYdCfgLW_WWu7IiehlkBH6gl7DM5avdhIjZQu_V_46QjPHwZtcQ0z98EN0kREwF2d2VZsY6ijaUTvHyGd7d3HLgXrRJY6id07GNup1anqQ-mmzwNrKlhjuZh-K95so7QKnGXUsmJRJTQvpnGBt8rKTGpsJr7mZE" />
                                Continue with Facebook
                            </button>
                            <button className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white font-semibold py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-3" type="button">
                                <svg className="w-5 h-5 text-black dark:text-white fill-current" viewBox="0 0 24 24">
                                    <path d="M17.5,12.5c-.2,0-.5-.1-.7-.3l-5.3-5.3-.9.9c.7.7,1.8,1.8,2.7,2.7.5.5.5,1.3,0,1.8l-5.3,5.3c-.2.2-.5.3-.7.3s-.5-.1-.7-.3c-.4-.4-.4-1,0-1.4l4.6-4.6-4.6-4.6c-.4-.4-.4-1,0-1.4s1-.4,1.4,0l5.3,5.3c.2.2.3.5.3.7s-.1.5-.3.7c-.5.5-1.1,1.1-1.6,1.6-.2.2-.5.2-.7,0s-.2-.5,0-.7c.9-.9,1.8-1.8,2.7-2.7l.9.9-5.3,5.3c-.2.2-.3.5-.3.7s.1.5.3.7c.4.4,1,.4,1.4,0l5.3-5.3c.2-.2.3-.5.3-.7s-.1-.5-.3-.7Zm-2.3-3.9c-.3,0-.7.1-.9.4-.9.9-1.5,2.1-1.7,3.3-.1.6.3,1.1.9,1.2.6.1,1.1-.3,1.2-.9.1-.8.6-1.6,1.2-2.2.4-.4.4-1.1,0-1.5-.2-.2-.5-.3-.7-.3Z"></path>
                                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24.02-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78.79.05 1.97-.67 3.28-.61 1.4.06 2.53.63 3.2 1.61-2.84 1.76-2.4 5.34.45 6.51-.21.84-.66 2.05-1.46 3.19-.57.82-1.25 1.61-2.05 1.49zM15.33 4.88c-.14 1.58-1.29 2.91-2.45 2.87-1.3-.04-2.52-1.55-2.26-3.13.25-1.46 1.64-2.95 2.76-2.92 1.15.03 2.1 1.59 1.95 3.18z"></path>
                                </svg>
                                Continue with Apple
                            </button>
                        </div>
                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">or</span>
                            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
                        </div>
                        <div className="text-left space-y-3">
                            <p className="text-gray-600 dark:text-gray-400">Don't have a free account yet?</p>
                            <button onClick={() => { onClose(); /* Handle navigation to signup / subscription if desired */ }} className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold py-3.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors" type="button">
                                Create your account
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
