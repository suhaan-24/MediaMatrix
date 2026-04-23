import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL, BACKEND_URL, getMediaUrl } from '../config';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { trackPageView } from '../utils/analytics';

export default function Search({ onLoginClick }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => { trackPageView('/search'); }, []);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState(new Set());
  const [typeFilter, setTypeFilter] = useState('all');
  const [picPage, setPicPage] = useState(1);
  const [dbPage, setDbPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const debounceRef = useRef(null);

  const toggleFavourite = (id, e) => {
    e.stopPropagation();
    setFavourites(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); showToast('Removed from favourites', 'info'); }
      else { next.add(id); showToast('Added to favourites!', 'success'); }
      return next;
    });
  };

  const performSearch = async (queryToSearch) => {
    setLoading(true);
    try {
      const url = queryToSearch 
        ? `${API_URL}/search?q=${encodeURIComponent(queryToSearch)}`
        : `${API_URL}/assets?limit=24`;
      const res = await fetch(url);
      const data = await res.json();
      let dbAssets = data.success ? data.data : [];

      const combined = [...dbAssets].filter(a => a?.fileUrl && a.fileUrl.trim() !== '');
      setAssets(combined);
    } catch (err) {
      console.error("Failed to fetch assets", err);
      showToast('Failed to load assets. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    
    if (debounceRef.current) clearTimeout(debounceRef.current);
    
    debounceRef.current = setTimeout(() => {
      setSearchParams(val ? { q: val } : {});
    }, 500);
  };


  const loadMore = async () => {
    setLoadingMore(true);
    try {
      const nextDbPage = dbPage + 1;
      const res = await fetch(`${API_URL}/assets?page=${nextDbPage}&limit=24`);
      const dbData = await res.json();
      
      let moreAssets = [];
      if (dbData.success && dbData.data) {
        moreAssets = dbData.data.filter(a => a?.fileUrl && a.fileUrl.trim() !== '');
      }

      if (moreAssets.length > 0) {
        setAssets(prev => [...prev, ...moreAssets]);
        setDbPage(nextDbPage);
      } else {
        showToast('No more assets to load.', 'info');
      }
    } catch (err) {
      showToast('Failed to load more assets.', 'error');
    } finally {
      setLoadingMore(false);
    }
  };

  const filteredAssets = typeFilter === 'all' ? assets : assets.filter(a => {
    if (typeFilter === 'image') return a.type === 'image';
    if (typeFilter === 'audio') return a.type?.includes('audio') || a.type?.includes('music');
    if (typeFilter === 'video') return a.type?.includes('video');
    return true;
  });

  useEffect(() => {
    const q = searchParams.get('q') || '';
    setSearchQuery(q);
    performSearch(q);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-white">

      <Navbar onLoginClick={onLoginClick} />
      <div className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark py-3">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-text-main-light dark:text-text-main-dark">{searchParams.get('q') ? `"${searchParams.get('q')}"` : "All Assets"}</h1>
            <span className="text-sm text-text-sub-light dark:text-text-sub-dark">{assets.length} results</span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium border border-border-light dark:border-border-dark rounded-lg hover:bg-surface-light dark:hover:bg-surface-dark bg-white dark:bg-surface-dark transition-colors whitespace-nowrap">
              <span className="material-icons text-base">filter_list</span>
              All Filters
            </button>
            <div className="h-6 w-px bg-border-light dark:bg-border-dark mx-1"></div>
            <div className="relative group">
              <button className="flex items-center gap-2 text-sm font-medium text-text-sub-light dark:text-text-sub-dark hover:text-primary transition-colors">
                Most Relevant
                <span className="material-icons text-base">expand_more</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-8">
        <aside className="w-64 hidden lg:block shrink-0 h-[calc(100vh-180px)] sticky top-36 overflow-y-auto custom-scrollbar pr-2">
          <div className="mb-6 border-b border-border-light dark:border-border-dark pb-4">
            <h3 className="text-sm font-semibold mb-3 flex justify-between items-center cursor-pointer">
              Image Type
              <span className="material-icons text-text-sub-light text-base">expand_less</span>
            </h3>
            <div className="space-y-2">
              {[{val:'all',label:'All Images'},{val:'image',label:'Photos'},{val:'audio',label:'Music / Audio'},{val:'video',label:'Video'}].map(f => (
                <label key={f.val} className="flex items-center gap-2 cursor-pointer group">
                  <input checked={typeFilter === f.val} onChange={() => setTypeFilter(f.val)} className="rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark" type="radio" name="typeFilter" />
                  <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">{f.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-6 border-b border-border-light dark:border-border-dark pb-4">
            <h3 className="text-sm font-semibold mb-3 flex justify-between items-center cursor-pointer">
              Orientation
              <span className="material-icons text-text-sub-light text-base">expand_less</span>
            </h3>
            <div className="flex gap-2">
              <button className="flex-1 flex flex-col items-center justify-center p-2 border border-border-light dark:border-border-dark rounded hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group">
                <div className="w-4 h-3 border-2 border-text-sub-light dark:border-text-sub-dark rounded-sm mb-1 group-hover:border-primary"></div>
                <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Landscape</span>
              </button>
              <button className="flex-1 flex flex-col items-center justify-center p-2 border border-border-light dark:border-border-dark rounded hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group">
                <div className="w-3 h-4 border-2 border-text-sub-light dark:border-text-sub-dark rounded-sm mb-1 group-hover:border-primary"></div>
                <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Portrait</span>
              </button>
              <button className="flex-1 flex flex-col items-center justify-center p-2 border border-border-light dark:border-border-dark rounded hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group">
                <div className="w-3 h-3 border-2 border-text-sub-light dark:border-text-sub-dark rounded-sm mb-1 group-hover:border-primary"></div>
                <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Square</span>
              </button>
            </div>
          </div>
          <div className="mb-6 border-b border-border-light dark:border-border-dark pb-4">
            <h3 className="text-sm font-semibold mb-3 flex justify-between items-center cursor-pointer">
              Color
              <span className="material-icons text-text-sub-light text-base">expand_less</span>
            </h3>
            <div className="grid grid-cols-6 gap-2">
              <button className="w-6 h-6 rounded-full bg-red-500 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-orange-500 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-yellow-400 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-green-500 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-blue-500 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-purple-500 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-pink-500 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-black hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-white border border-gray-300 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
              <button className="w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-blue-500 hover:ring-2 ring-primary ring-offset-1 dark:ring-offset-background-dark"></button>
            </div>
          </div>
          <div className="mb-6 border-b border-border-light dark:border-border-dark pb-4">
            <h3 className="text-sm font-semibold mb-3 flex justify-between items-center cursor-pointer">
              People
              <span className="material-icons text-text-sub-light text-base">expand_less</span>
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark" name="people" type="radio" />
                <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark">With People</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark" name="people" type="radio" />
                <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark">Without People</span>
              </label>
              <div className="mt-2 pl-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Number of people</span>
                  <input className="w-16 h-7 text-xs border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark px-2" placeholder="Any" type="number" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Age</span>
                  <select className="w-16 h-7 text-xs border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark px-1">
                    <option>All</option>
                    <option>Infants</option>
                    <option>Children</option>
                    <option>Teenagers</option>
                    <option>Adults</option>
                    <option>Seniors</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-sub-light dark:text-text-sub-dark">Ethnicity</span>
                  <select className="w-16 h-7 text-xs border border-border-light dark:border-border-dark rounded bg-surface-light dark:bg-surface-dark px-1">
                    <option>All</option>
                    <option>African</option>
                    <option>Asian</option>
                    <option>Caucasian</option>
                    <option>Hispanic</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-3 flex justify-between items-center cursor-pointer">
              AI Content
              <span className="material-icons text-text-sub-light text-base">expand_less</span>
            </h3>
            <label className="flex items-center gap-2 cursor-pointer group">
              <input className="rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark" type="checkbox" />
              <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">Exclude AI Generated</span>
            </label>
          </div>
        </aside>
        <div className="flex-1 min-w-0">
          <div className="flex gap-2 overflow-x-auto pb-4 mb-2 custom-scrollbar">
            <a className="px-4 py-2 bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap transition-colors" href="#">Snowy Forest</a>
            <a className="px-4 py-2 bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap transition-colors" href="#">Ice Mountains</a>
            <a className="px-4 py-2 bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap transition-colors" href="#">Cozy Cabin</a>
            <a className="px-4 py-2 bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap transition-colors" href="#">Winter Sports</a>
            <a className="px-4 py-2 bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap transition-colors" href="#">Christmas Lights</a>
            <a className="px-4 py-2 bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap transition-colors" href="#">Frozen Lake</a>
            <a className="px-4 py-2 bg-surface-light dark:bg-surface-dark hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full text-sm font-medium text-text-sub-light dark:text-text-sub-dark whitespace-nowrap transition-colors" href="#">Snowflake Macro</a>
          </div>
          <div className="masonry-grid">
            {loading ? (
              <>{[...Array(8)].map((_, i) => <div key={i} className="break-inside-avoid mb-6 skeleton" style={{ height: `${180 + (i % 3) * 60}px` }} />)}</>
            ) : filteredAssets.length === 0 ? (
              <div className="p-12 text-center text-gray-500 w-full col-span-full flex flex-col items-center gap-3">
                <span className="material-icons-outlined text-6xl text-gray-300">image_not_supported</span>
                <p className="text-lg font-semibold">No results found</p>
                <p className="text-sm">Try a different keyword or adjust your filters.</p>
              </div>
            ) : filteredAssets.map((asset) => (
              <div key={asset._id} onClick={() => navigate(`/details/${asset._id}`)} className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-zoom-in shadow-sm hover:shadow-lg transition bg-gray-100 dark:bg-gray-800">
                {/* MM-13: Always-visible media type badge */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="bg-black/70 text-white text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider backdrop-blur-sm">{asset.type?.includes('audio') ? 'Audio' : asset.type?.includes('video') ? 'Video' : 'Image'}</span>
                </div>
                {asset.type && (asset.type.includes('video') || asset.type.includes('audio')) ? (
                  <div className="p-8 flex flex-col items-center justify-center h-48 text-gray-500 relative bg-gray-900 border border-gray-800">
                    {asset.type.includes('video') && asset.fileUrl && (
                      <video src={getMediaUrl(asset.fileUrl)} className="absolute inset-0 w-full h-full object-cover opacity-80 z-0" loop muted playsInline></video>
                    )}
                    {(!asset.type.includes('video') || !asset.fileUrl) && asset.thumbnailUrl && <img src={getMediaUrl(asset.thumbnailUrl).replace('100x100', '600x600')} className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm mix-blend-screen" alt="thumb" loading="lazy" />}
                    <span className="material-icons-outlined text-5xl mb-3 z-10 text-white drop-shadow-lg">{asset.type.includes('video') ? 'videocam' : 'music_note'}</span>
                    <span className="text-sm font-bold text-gray-200 truncate w-full text-center px-4 z-10 drop-shadow-md pb-2">{asset.title}</span>
                    {asset.type.includes('audio') && asset.fileUrl && (
                      <audio controls src={getMediaUrl(asset.fileUrl)} className="mt-4 w-full h-8 z-10 opacity-80" onClick={(e) => e.stopPropagation()}></audio>
                    )}
                  </div>
                ) : (
                  <img alt={asset.title} className="w-full object-cover" loading="lazy" src={getMediaUrl(asset.fileUrl)} onError={(e) => { e.target.src='https://placehold.co/400x300/e5e7eb/9ca3af?text=Image+Not+Found'; }} />
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
          <div className="flex justify-center mt-12 mb-8">
            <button onClick={loadMore} disabled={loadingMore} className="px-8 py-3 rounded-full border border-gray-300 dark:border-gray-600 font-semibold text-sm hover:border-primary hover:text-primary transition dark:text-gray-300 disabled:opacity-50">
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        </div>
      </main>
      <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark py-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-text-sub-light dark:text-text-sub-dark">
          <p>© 2024 StockMarketplace Inc. All rights reserved.</p>
        </div>
      </footer>


    </div>
  );
}
