import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, BACKEND_URL, getMediaUrl } from '../config';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { trackPageView } from '../utils/analytics';

export default function Home({ onLoginClick }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => { trackPageView('/'); }, []);
  const [searchQuery, setSearchQuery] = useState('');
  const [assets, setAssets] = useState([]);
  const [favourites, setFavourites] = useState(new Set());
  const imageInputRef = useRef(null);

  const handleSearchByImage = () => {
    imageInputRef.current?.click();
  };
  const handleImageFileSelected = () => {
    showToast('Visual search is coming soon!', 'info');
    if (imageInputRef.current) imageInputRef.current.value = '';
  };
  const toggleFavourite = (id, e) => {
    e.stopPropagation();
    setFavourites(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast('Removed from favourites', 'info'); }
      else { next.add(id); showToast('Added to favourites!', 'success'); }
      return next;
    });
  };
  const handleComingSoon = (feature) => (e) => {
    e.preventDefault();
    showToast(`${feature} — coming soon!`, 'info');
  };

  // Fetch from Search API or master Asset API
  const fetchAssets = async () => {
    try {
      // 1. Fetch from Local Database
      const url = searchQuery 
        ? `${API_URL}/search?q=${encodeURIComponent(searchQuery)}`
        : `${API_URL}/assets?limit=12`;
      const res = await fetch(url);
      const data = await res.json();
      let dbAssets = data.success ? data.data : [];

      // Only use real backend assets and filter out broken URLs natively
      const combined = [...dbAssets].filter(a => a?.fileUrl && a.fileUrl.trim() !== '');
      setAssets(combined);
    } catch (err) {
      console.error("Failed to fetch assets", err);
      showToast('Failed to load assets. Please try again.', 'error');
    }
  };

  React.useEffect(() => {
    fetchAssets();
  }, []);

  return (
    <div className="w-full h-full min-h-screen bg-white">

      <div className="bg-primary text-white text-xs py-2 text-center font-medium">
        Get 10 royalty-free image downloads each month with a cost-saving subscription. <a className="underline ml-2 bg-white text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase hover:bg-gray-100" href="#">Buy now</a>
      </div>
      <Navbar onLoginClick={onLoginClick} />
      <header className="relative bg-black overflow-hidden h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-60">
          <img alt="Abstract gradient background" className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1920&q=80" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
        </div>
        <div className="relative z-10 w-full max-w-5xl px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight drop-shadow-lg">This is where great work starts</h1>
          <div className="flex justify-center flex-wrap gap-6 text-gray-300 text-xs font-medium mb-4">
            <button className="flex items-center gap-1 hover:text-white transition group"><span className="material-icons-outlined text-lg group-hover:text-primary">image</span> Images</button>
            <button className="flex items-center gap-1 hover:text-white transition group"><span className="material-icons-outlined text-lg group-hover:text-primary">videocam</span> Video</button>
            <button className="flex items-center gap-1 hover:text-white transition group"><span className="material-icons-outlined text-lg group-hover:text-primary">article</span> Editorial</button>
            <button className="flex items-center gap-1 hover:text-white transition group"><span className="material-icons-outlined text-lg group-hover:text-primary">music_note</span> Music</button>
            <button className="flex items-center gap-1 hover:text-white transition group"><span className="material-icons-outlined text-lg group-hover:text-primary">auto_awesome</span> AI Generator</button>
          </div>
          <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-2xl h-14">
            <button className="px-4 text-gray-600 border-r border-gray-200 h-full flex items-center gap-1 text-sm font-medium hover:bg-gray-50 bg-gray-50">
              All images <span className="material-icons-outlined text-sm">expand_more</span>
            </button>
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${encodeURIComponent(searchQuery)}`)} className="flex-grow px-4 h-full text-gray-800 placeholder-gray-400 focus:outline-none border-none focus:ring-0" placeholder="Start your next project" type="text" />
            <button onClick={handleSearchByImage} aria-label="Search by image" className="px-4 text-gray-500 hover:text-gray-800 border-l border-gray-100 h-full flex items-center gap-1 text-xs">
              <span className="material-icons-outlined">image_search</span> Search by image
            </button>
            <input ref={imageInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageFileSelected} />
            <button onClick={() => navigate(`/search?q=${encodeURIComponent(searchQuery)}`)} className="bg-primary hover:bg-primary-hover text-white h-full px-6 flex items-center justify-center transition">
              <span className="material-icons-outlined">search</span>
            </button>
          </div>
          <div className="mt-4 text-xs text-gray-400 flex justify-center gap-2">
            <span className="font-semibold text-gray-300">Trending:</span>
            <a className="hover:text-white underline" href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=spring+flowers'); }}>spring flowers</a>,
            <a className="hover:text-white underline" href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=business+meeting'); }}>business meeting</a>,
            <a className="hover:text-white underline" href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=abstract+background'); }}>abstract background</a>,
            <a className="hover:text-white underline" href="#" onClick={(e) => { e.preventDefault(); navigate('/search?q=AI+technology'); }}>AI technology</a>
          </div>
          <button onClick={() => navigate('/search')} className="mt-6 px-8 py-3 bg-primary hover:bg-primary-hover text-white font-bold rounded-full text-sm transition shadow-lg shadow-red-200/30">Start exploring</button>
        </div>
      </header>
      <section className="py-12 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">One Brand. Endless Possibilities.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/search" className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Premium Content" className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=120&q=80" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-light dark:text-white group-hover:text-primary transition">Premium Content</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Exclusive access</p>
              </div>
            </Link>
            <a className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20" href="#">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Custom Production" className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=120&q=80" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-light dark:text-white group-hover:text-primary transition">Custom Production</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tailored for you</p>
              </div>
            </a>
            <a className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20" href="#">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Generative AI" className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=120&q=80" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-light dark:text-white group-hover:text-primary transition">Generative AI</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Create instantly</p>
              </div>
            </a>
            <a className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20" href="#">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Rights-Cleared" className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=120&q=80" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-light dark:text-white group-hover:text-primary transition">Rights-Cleared Datasets</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Safe for commercial use</p>
              </div>
            </a>
          </div>
        </div>
      </section>
      <section className="py-16 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Content at Your Fingertips</h2>
            <button onClick={() => navigate('/subscription')} className="text-sm font-medium border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-gray-300">See pricing</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div onClick={() => navigate('/ai-generator')} className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="AI Image Generator" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">AI Image Generator</h3>
              </div>
            </div>
            <div className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="Images" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">Images</h3>
              </div>
            </div>
            <div className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1536240478700-b869ad10f039?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">Video</h3>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                <span className="material-icons-outlined text-white">play_arrow</span>
              </div>
            </div>
            <div className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="Music" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">Music</h3>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                <span className="material-icons-outlined text-white">music_note</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold dark:text-white mb-6">Explore popular and handpicked visuals</h2>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              <button className="flex-shrink-0 flex items-center gap-1 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-xs font-medium hover:border-primary hover:text-primary transition dark:text-gray-300 dark:hover:text-primary">
                <span className="material-icons-outlined text-sm">search</span> Valentine's day
              </button>
              <button className="flex-shrink-0 flex items-center gap-1 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-xs font-medium hover:border-primary hover:text-primary transition dark:text-gray-300 dark:hover:text-primary">
                <span className="material-icons-outlined text-sm">search</span> Spring flowers
              </button>
              <button className="flex-shrink-0 flex items-center gap-1 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-xs font-medium hover:border-primary hover:text-primary transition dark:text-gray-300 dark:hover:text-primary">
                <span className="material-icons-outlined text-sm">search</span> Winter landscape
              </button>
              <button className="flex-shrink-0 flex items-center gap-1 px-4 py-1.5 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-background-dark text-xs font-medium hover:border-primary hover:text-primary transition dark:text-gray-300 dark:hover:text-primary">
                <span className="material-icons-outlined text-sm">search</span> Abstract background
              </button>
              <div className="ml-auto flex items-center gap-4 text-xs font-bold text-gray-500">
                <button className="text-black dark:text-white border-b-2 border-black dark:border-white pb-1">Handpicked content</button>
                <button className="hover:text-black dark:hover:text-white transition">Most Popular</button>
              </div>
            </div>
          </div>
          <div className="masonry-grid">
            {assets.map((asset) => (
              <div key={asset._id} onClick={() => navigate(`/details/${asset._id}`)} className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-zoom-in shadow-sm hover:shadow-lg transition bg-gray-100 dark:bg-gray-800">
                {asset.type && (asset.type.includes('video') || asset.type.includes('audio')) ? (
                  <div className="p-8 flex flex-col items-center justify-center h-48 text-gray-500 relative bg-gray-900 border border-gray-800">
                    {asset.type.includes('video') && asset.fileUrl && (
                      <video src={getMediaUrl(asset.fileUrl)} className="absolute inset-0 w-full h-full object-cover opacity-80 z-0" loop muted playsInline></video>
                    )}
                    {(!asset.type.includes('video') || !asset.fileUrl) && asset.thumbnailUrl && <img src={getMediaUrl(asset.thumbnailUrl).replace('100x100', '600x600')} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm mix-blend-screen" alt="thumb"/>}
                    <span className="material-icons-outlined text-5xl mb-3 z-10 text-white drop-shadow-lg">{asset.type.includes('video') ? 'videocam' : 'music_note'}</span>
                    <span className="text-sm font-bold text-gray-200 truncate w-full text-center px-4 z-10 drop-shadow-md pb-2">{asset.title}</span>
                    {asset.type.includes('audio') && asset.fileUrl && (
                      <audio controls src={getMediaUrl(asset.fileUrl)} className="mt-4 w-full h-8 z-10 opacity-80" onClick={(e) => e.stopPropagation()}></audio>
                    )}
                  </div>
                ) : (
                  <img alt={asset.title} className="w-full object-cover" src={getMediaUrl(asset.fileUrl)} />
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-4 mix-blend-multiply"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded font-medium uppercase tracking-wider backdrop-blur-sm">{asset.type}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="text-white text-sm font-bold drop-shadow-md truncate max-w-[60%]">{asset.title}</div>
                    <div className="flex gap-2">
                      <button aria-label="Toggle favourite" onClick={(e) => toggleFavourite(asset._id, e)} className={`p-1.5 rounded shadow transition ${favourites.has(asset._id) ? 'bg-primary text-white' : 'bg-white/90 hover:bg-white text-gray-800'}`}><span className="material-icons-outlined text-sm">{favourites.has(asset._id) ? 'favorite' : 'favorite_border'}</span></button>
                      <button aria-label="Download asset" onClick={(e) => { e.stopPropagation(); if (asset.fileUrl) { window.open(getMediaUrl(asset.fileUrl), '_blank'); } showToast('Download started!', 'success'); }} className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800 shadow"><span className="material-icons-outlined text-sm">download</span></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button onClick={() => navigate('/search')} className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold text-sm hover:border-primary hover:text-primary transition dark:text-gray-300">See more images</button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-background-light dark:bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Your stories aren't one-dimensional, neither is our content library</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-red-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Images</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1536240478700-b869ad10f039?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Video</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-yellow-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Music</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-purple-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Sound effects</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-green-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">AI Image Generator</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-indigo-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Vectors</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-pink-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Photos</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-orange-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=100&q=80" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Templates</span>
            </a>
          </div>
        </div>
      </section>
      <section className="py-16 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold dark:text-white">Curated collections backed by AI</h2>
            <button className="text-sm font-medium border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition dark:text-gray-300">See all collections</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative group h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img alt="Blossoming Spring" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1490750967868-88df5691cc21?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-center w-full pr-12">
                <h3 className="text-xl font-bold">Blossoming Spring</h3>
              </div>
            </div>
            <div className="relative group h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img alt="Moments in Motion" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-center w-full pr-12">
                <h3 className="text-xl font-bold">Moments in Motion</h3>
              </div>
            </div>
            <div className="relative group h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img alt="Paris Romance" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-center w-full pr-12">
                <h3 className="text-xl font-bold">Paris Romance</h3>
              </div>
            </div>
            <div className="relative group h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img alt="Gradient Vectors" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-center w-full pr-12">
                <h3 className="text-xl font-bold">Gradient Vectors</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-background-light dark:bg-background-dark border-t border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-8">Trusted by the world's largest companies</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
            <span className="text-xl font-black text-gray-800 dark:text-white">epa<span className="font-light">images</span></span>
            <span className="text-xl font-black text-gray-800 dark:text-white bg-gray-200 dark:bg-gray-700 px-2">LIFE</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white border border-gray-800 dark:border-white p-1">BFA</span>
            <span className="text-xl font-bold text-gray-800 dark:text-white">...</span>
            <span className="text-xl font-serif italic text-gray-800 dark:text-white">itv</span>
            <span className="text-sm font-bold bg-gray-800 text-white dark:bg-white dark:text-black px-1">Celebrity</span>
          </div>
          <div className="mt-12">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Need a personalized package for your business?</p>
            <button className="bg-primary hover:bg-primary-hover text-white px-8 py-2.5 rounded-full font-bold text-sm transition shadow-md shadow-red-200 dark:shadow-none">Request a Quote</button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">Creative and Marketing Guidance</h2>
          <div className="bg-white dark:bg-background-dark rounded-xl overflow-hidden shadow-sm mb-8 flex flex-col md:flex-row">
            <div className="md:w-1/2 h-64 md:h-auto">
              <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1553481187-be93c21490a9?w=800&q=80" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-lg font-bold mb-2 dark:text-white">In The Wild: TurboSquid x House of Kardashian</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">TurboSquid is the world's premier 3D design resource. In the first installment of Shutterstock's digital series In The Wild, watch global creative studio Coffee &amp; TV use TurboSquid's premium 3D models to craft House of Kardashian's opening sequence.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article>
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80" />
              </div>
              <h3 className="font-bold text-sm mb-2 dark:text-white">Shutterstock Pricing Plans, Demystified</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Elevate your creative projects by blending stock images, audio, and video using flexible pricing plans.</p>
            </article>
            <article>
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80" />
              </div>
              <h3 className="font-bold text-sm mb-2 dark:text-white">Introducing Indemnification for AI-Generated Images</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Shutterstock is the first to provide financial protections against legal liabilities, ensuring Enterprise customers use confidentially.</p>
            </article>
            <article>
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src="https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&q=80" />
              </div>
              <h3 className="font-bold text-sm mb-2 dark:text-white">What is a Color Scheme? Definitions and Examples</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Learn what a color scheme is, explore key types like Monochromatic, Complementary, Analogous, Triadic and Neutral.</p>
            </article>
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold text-sm hover:border-primary hover:text-primary transition dark:text-gray-300">Visit our blog</button>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-[#151515]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start gap-12">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">A weekly dose of inspiration, just for you</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Sign up and get a free image or photo every week</p>
            <button className="bg-primary hover:bg-primary-hover text-white px-10 py-3 rounded-full font-bold text-sm shadow-lg shadow-red-200 dark:shadow-none transition">Get Started</button>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm">
              <div className="rounded overflow-hidden mb-4 h-40">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80" />
              </div>
              <h4 className="font-bold text-sm dark:text-white">Free stock image of the week</h4>
              <p className="text-xs text-gray-500 mb-2">By Shift Drive</p>
              <a className="text-blue-500 text-xs font-semibold hover:underline" href="#">Download</a>
            </div>
            <div className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm">
              <div className="rounded overflow-hidden mb-4 h-40">
                <img className="w-full h-full object-cover" loading="lazy" src="https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=800&q=80" />
              </div>
              <h4 className="font-bold text-sm dark:text-white">Free stock vector of the week</h4>
              <p className="text-xs text-gray-500 mb-2">By Azurhino</p>
              <a className="text-blue-500 text-xs font-semibold hover:underline" href="#">Download</a>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-background-dark text-gray-400 text-xs py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 border-b border-gray-800 pb-8 text-center text-[10px] text-gray-500">
            We have more than <span className="text-white">600,000,000 assets</span> on Shutterstock.com as of December 31, 2023.
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6 text-white">
                <span className="material-icons-outlined text-primary text-2xl">shutter_speed</span>
                <span className="font-bold text-lg tracking-tight">ShutterStock</span>
              </div>
              <button className="border border-gray-600 rounded px-3 py-1.5 flex items-center gap-2 text-white hover:border-gray-400 transition mb-6">
                <span className="material-icons-outlined text-sm">language</span> English <span className="material-icons-outlined text-sm">expand_more</span>
              </button>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[10px]">Our company</h4>
              <ul className="space-y-2">
                <li><a onClick={handleComingSoon('About us')} className="hover:text-white transition cursor-pointer">About us</a></li>
                <li><a onClick={handleComingSoon('Careers')} className="hover:text-white transition cursor-pointer">Careers</a></li>
                <li><a onClick={handleComingSoon('Press/Media')} className="hover:text-white transition cursor-pointer">Press/Media</a></li>
                <li><a onClick={handleComingSoon('Investor relations')} className="hover:text-white transition cursor-pointer">Investor relations</a></li>
                <li><a onClick={handleComingSoon('Shutterstock blog')} className="hover:text-white transition cursor-pointer">Shutterstock blog</a></li>
              </ul>
              <h4 className="font-bold text-white mt-6 mb-4 uppercase tracking-wider text-[10px]">Partner</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition" href="#">Sell your content</a></li>
                <li><a className="hover:text-white transition" href="#">Affiliate/Reseller</a></li>
                <li><a className="hover:text-white transition" href="#">Developers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[10px]">Brands</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition" href="#">Envato</a></li>
                <li><a className="hover:text-white transition" href="#">Giphy</a></li>
                <li><a className="hover:text-white transition" href="#">Pond5</a></li>
                <li><a className="hover:text-white transition" href="#">TurboSquid</a></li>
                <li><a className="hover:text-white transition" href="#">PremiumBeat</a></li>
              </ul>
              <h4 className="font-bold text-white mt-6 mb-4 uppercase tracking-wider text-[10px]">Mobile Apps</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition" href="#">iOS App</a></li>
                <li><a className="hover:text-white transition" href="#">Android App</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[10px]">Products &amp; Services</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition" href="#">Images</a></li>
                <li><a className="hover:text-white transition" href="#">Video</a></li>
                <li><a className="hover:text-white transition" href="#">Music</a></li>
                <li><a className="hover:text-white transition" href="#">Editorial</a></li>
                <li><a className="hover:text-white transition" href="#">3D Models</a></li>
                <li><a className="hover:text-white transition" href="#">AI Tools</a></li>
                <li><a className="hover:text-white transition" href="#">Creative Flow</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-[10px]">Legal</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition" href="#">Terms of service</a></li>
                <li><a className="hover:text-white transition" href="#">Privacy policy</a></li>
                <li><a className="hover:text-white transition" href="#">License agreements</a></li>
                <li><a className="hover:text-white transition" href="#">Cookie preferences</a></li>
                <li><a className="hover:text-white transition" href="#">Accessibility</a></li>
              </ul>
              <h4 className="font-bold text-white mt-6 mb-4 uppercase tracking-wider text-[10px]">Contact us</h4>
              <ul className="space-y-2">
                <li><a className="hover:text-white transition" href="#">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="mb-4 md:mb-0">© 2003-2024 Shutterstock, Inc.</p>
            <div className="flex space-x-4">
              <a className="hover:text-white" href="#"><span className="text-lg font-bold">f</span></a>
              <a className="hover:text-white" href="#"><span className="text-lg font-bold">t</span></a>
              <a className="hover:text-white" href="#"><span className="text-lg font-bold">in</span></a>
              <a className="hover:text-white" href="#"><span className="text-lg font-bold">yt</span></a>
              <a className="hover:text-white" href="#"><span className="text-lg font-bold">ig</span></a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
