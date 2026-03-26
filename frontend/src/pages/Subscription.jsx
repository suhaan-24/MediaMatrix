import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Subscription({ onLoginClick }) {
    const navigate = useNavigate();
    const [planType, setPlanType] = useState('individual');

    return (
        <div className="w-full h-full min-h-screen bg-white">

            <div className="sticky top-0 z-50 shadow-md">
                <Navbar onLoginClick={onLoginClick} />
            </div>
            <div className="relative bg-surface-light dark:bg-surface-dark pb-16 pt-12 lg:pt-20">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 dark:opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal"></div>
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-6">
                        Find the perfect plan for your creative needs
                    </h1>
                    <p className="mt-4 text-xl text-secondary-text-light dark:text-secondary-text-dark max-w-2xl mx-auto mb-10">
                        Access millions of royalty-free images, videos, and music tracks. Cancel anytime.
                    </p>
                    <div className="flex justify-center mb-12">
                        <div className="bg-gray-200 dark:bg-gray-800 p-1 rounded-full inline-flex relative">
                            <div className="w-full absolute inset-0 flex">
                                <div className={`w-1/2 bg-white dark:bg-gray-700 rounded-full shadow-sm m-1 transition-transform duration-300 transform ${planType === 'individual' ? 'translate-x-0' : 'translate-x-full'}`}></div>
                            </div>
                            <button onClick={() => setPlanType('individual')} className={`relative z-10 px-8 py-2 text-sm font-bold rounded-full focus:outline-none transition-colors ${planType === 'individual' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Individual</button>
                            <button onClick={() => setPlanType('enterprise')} className={`relative z-10 px-8 py-2 text-sm font-medium rounded-full focus:outline-none transition-colors ${planType === 'enterprise' ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}>Enterprise</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-background-light dark:bg-background-dark py-12 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${planType === 'individual' ? '' : 'hidden'}`} id="individual-plans">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-6 md:p-8 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">On-Demand Packs</h3>
                                        <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark mt-1">Best for one-off projects</p>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 text-3xl">shopping_bag</span>
                                </div>
                                <div className="my-6">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$49</span>
                                    <span className="text-base font-medium text-secondary-text-light dark:text-secondary-text-dark"> / pack</span>
                                </div>
                                <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark mb-6">Standard license included. Images available for 1 year from purchase.</p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">5 images per pack</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Standard License</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">No expiration on downloads</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                                <button onClick={() => navigate('/login')} className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                    Buy Pack
                                </button>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl hover:shadow-3xl transition-shadow border-2 border-primary overflow-hidden flex flex-col transform md:-translate-y-4 relative">
                            <div className="bg-primary text-white text-xs font-bold uppercase tracking-wider text-center py-1 absolute top-0 w-full">Most Popular</div>
                            <div className="p-6 md:p-8 pt-10 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Flex Subscription</h3>
                                        <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark mt-1">Best for regular content needs</p>
                                    </div>
                                    <span className="material-symbols-outlined text-primary text-3xl">auto_awesome</span>
                                </div>
                                <div className="my-6">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$29</span>
                                    <span className="text-base font-medium text-secondary-text-light dark:text-secondary-text-dark"> / month</span>
                                </div>
                                <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark mb-6">Billed annually. Cancel risk-free within the first month.</p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">10 credits per month</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Access to Images, Music, Video</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Unused credits rollover</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Editor tool access included</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                                <button onClick={() => navigate('/login')} className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30">
                                    Start Free Trial
                                </button>
                            </div>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
                            <div className="p-6 md:p-8 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Pro Volume</h3>
                                        <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark mt-1">For heavy users &amp; agencies</p>
                                    </div>
                                    <span className="material-symbols-outlined text-gray-400 dark:text-gray-600 text-3xl">rocket_launch</span>
                                </div>
                                <div className="my-6">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">$199</span>
                                    <span className="text-base font-medium text-secondary-text-light dark:text-secondary-text-dark"> / month</span>
                                </div>
                                <p className="text-sm text-secondary-text-light dark:text-secondary-text-dark mb-6">Maximum value for high volume downloads. Billed monthly.</p>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">750 images per month</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Multi-seat license (up to 5)</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Enhanced legal protection</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="material-symbols-outlined text-green-500 mr-2 text-xl">check</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">Dedicated support</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                                <button onClick={() => navigate('/login')} className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto ${planType === 'enterprise' ? '' : 'hidden'}`} id="enterprise-plans">
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Teams</h3>
                            <p className="text-secondary-text-light dark:text-secondary-text-dark mb-6">Collaborate seamlessly with multi-user accounts and shared asset libraries.</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <span className="material-symbols-outlined text-primary mr-2">check_circle</span> Unlimited downloads for teams
                                </li>
                                <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <span className="material-symbols-outlined text-primary mr-2">check_circle</span> Admin controls &amp; permission settings
                                </li>
                                <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <span className="material-symbols-outlined text-primary mr-2">check_circle</span> Centralized billing
                                </li>
                            </ul>
                            <button onClick={() => navigate('/login')} className="w-full py-3 px-4 bg-primary text-white font-bold rounded-lg hover:bg-red-600 transition-colors">Contact Sales</button>
                        </div>
                        <div className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">API Integration</h3>
                            <p className="text-secondary-text-light dark:text-secondary-text-dark mb-6">Power your platform with our world-class library directly through our robust API.</p>
                            <ul className="space-y-3 mb-8">
                                <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <span className="material-symbols-outlined text-primary mr-2">check_circle</span> Native integration capabilities
                                </li>
                                <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <span className="material-symbols-outlined text-primary mr-2">check_circle</span> Custom metadata &amp; search
                                </li>
                                <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                    <span className="material-symbols-outlined text-primary mr-2">check_circle</span> Dedicated technical support
                                </li>
                            </ul>
                            <button onClick={() => navigate('/login')} className="w-full py-3 px-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">Read Documentation</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-16 bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Included in every plan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-2xl">verified_user</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Legal Protection</h4>
                            <p className="text-secondary-text-light dark:text-secondary-text-dark text-sm">Every asset is vetted for copyright. Enjoy up to $10,000 indemnification per asset.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-2xl">edit_document</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Creative Editor</h4>
                            <p className="text-secondary-text-light dark:text-secondary-text-dark text-sm">Resize, add text, filters and more with our free built-in editor tool before you download.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="material-symbols-outlined text-primary text-2xl">devices</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Multi-Platform Use</h4>
                            <p className="text-secondary-text-light dark:text-secondary-text-dark text-sm">Use your content on social media, websites, print ads, and merchandise seamlessly.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-background-light dark:bg-background-dark py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        <details className="group bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm p-4 [&amp;_summary::-webkit-details-marker]:hidden border border-gray-200 dark:border-gray-700">
                            <summary className="flex items-center justify-between cursor-pointer">
                                <h2 className="font-medium text-gray-900 dark:text-white">What is a royalty-free license?</h2>
                                <span className="ml-1.5 flex-shrink-0 transition duration-300 group-open:-rotate-180">
                                    <span className="material-symbols-outlined text-gray-500">expand_more</span>
                                </span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-secondary-text-light dark:text-secondary-text-dark text-sm">
                                Royalty-free means you pay for the license once and can use the content forever without paying additional fees for each use, subject to the terms of the license agreement.
                            </p>
                        </details>
                        <details className="group bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm p-4 [&amp;_summary::-webkit-details-marker]:hidden border border-gray-200 dark:border-gray-700">
                            <summary className="flex items-center justify-between cursor-pointer">
                                <h2 className="font-medium text-gray-900 dark:text-white">Can I cancel my subscription anytime?</h2>
                                <span className="ml-1.5 flex-shrink-0 transition duration-300 group-open:-rotate-180">
                                    <span className="material-symbols-outlined text-gray-500">expand_more</span>
                                </span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-secondary-text-light dark:text-secondary-text-dark text-sm">
                                Yes. If you cancel within the first month, you can get a full refund if you haven't downloaded any assets. Otherwise, cancellation stops the auto-renewal at the end of your term.
                            </p>
                        </details>
                        <details className="group bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm p-4 [&amp;_summary::-webkit-details-marker]:hidden border border-gray-200 dark:border-gray-700">
                            <summary className="flex items-center justify-between cursor-pointer">
                                <h2 className="font-medium text-gray-900 dark:text-white">What happens to my unused downloads?</h2>
                                <span className="ml-1.5 flex-shrink-0 transition duration-300 group-open:-rotate-180">
                                    <span className="material-symbols-outlined text-gray-500">expand_more</span>
                                </span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-secondary-text-light dark:text-secondary-text-dark text-sm">
                                With an annual plan, unused downloads roll over to the next month as long as your subscription is active. On-demand packs do not expire for one year from purchase.
                            </p>
                        </details>
                        <details className="group bg-surface-light dark:bg-surface-dark rounded-lg shadow-sm p-4 [&amp;_summary::-webkit-details-marker]:hidden border border-gray-200 dark:border-gray-700">
                            <summary className="flex items-center justify-between cursor-pointer">
                                <h2 className="font-medium text-gray-900 dark:text-white">Do I need an Extended License?</h2>
                                <span className="ml-1.5 flex-shrink-0 transition duration-300 group-open:-rotate-180">
                                    <span className="material-symbols-outlined text-gray-500">expand_more</span>
                                </span>
                            </summary>
                            <p className="mt-4 leading-relaxed text-secondary-text-light dark:text-secondary-text-dark text-sm">
                                Standard licenses cover most uses including digital use, advertising, and packaging up to 500,000 copies. If you need unlimited print runs or merchandise for resale, you'll need an Extended License.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">Our Company</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a className="hover:text-white" href="#">About Us</a></li>
                            <li><a className="hover:text-white" href="#">Careers</a></li>
                            <li><a className="hover:text-white" href="#">Press</a></li>
                            <li><a className="hover:text-white" href="#">Blog</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">Products</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a className="hover:text-white" href="#">Stock Images</a></li>
                            <li><a className="hover:text-white" href="#">Stock Video</a></li>
                            <li><a className="hover:text-white" href="#">Stock Audio</a></li>
                            <li><a className="hover:text-white" href="#">AI Generator</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">Support</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a className="hover:text-white" href="#">Help Center</a></li>
                            <li><a className="hover:text-white" href="#">Contact Us</a></li>
                            <li><a className="hover:text-white" href="#">Enterprise</a></li>
                            <li><a className="hover:text-white" href="#">Sell your content</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-gray-400">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><a className="hover:text-white" href="#">Terms of Use</a></li>
                            <li><a className="hover:text-white" href="#">Privacy Policy</a></li>
                            <li><a className="hover:text-white" href="#">License Agreement</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <span className="material-symbols-outlined text-primary">shutter_speed</span>
                        <span className="font-bold text-lg">ShutterStockClone</span>
                    </div>
                    <p className="text-sm text-gray-500">© 2023-2024 ShutterStockClone, Inc. All rights reserved.</p>
                </div>
            </footer>



        </div>
    );
}
