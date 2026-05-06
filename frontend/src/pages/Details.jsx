import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { API_URL, BACKEND_URL, getMediaUrl } from '../config';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { trackPageView } from '../utils/analytics';

const SIZES = [
  { label: 'Small', dims: '500 × 334 px · 72 dpi', price: 29 },
  { label: 'Medium', dims: '1000 × 667 px · 300 dpi', price: 49 },
  { label: 'Large', dims: '4000 × 2668 px · 300 dpi', price: 79 },
  { label: 'Vector (EPS)', dims: 'Scalable to any size', price: 99 },
];

const SIMILAR_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400', label: 'Golden forest' },
  { src: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400', label: 'Mountain range' },
  { src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400', label: 'Desert dunes' },
  { src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=400', label: 'Ocean wave' },
  { src: 'https://images.unsplash.com/photo-1490750967868-88df5691cc21?w=400', label: 'Cherry blossom' },
];

const CONTRIBUTOR_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', label: 'Alpine view' },
  { src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400', label: 'Lake sunrise' },
  { src: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400', label: 'Architecture' },
  { src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400', label: 'Forest path' },
  { src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', label: 'Paris night' },
];

export default function Details({ onLoginClick }) {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(2);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => { trackPageView('/details'); }, []);

  useEffect(() => {
    if (asset) document.title = `${asset.title} — MediaMatrix`;
    return () => { document.title = 'MediaMatrix'; };
  }, [asset]);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true);
        if (id.startsWith('picsum-')) {
          const picId = id.split('-')[1];
          const res = await fetch(`https://picsum.photos/id/${picId}/info`);
          const data = await res.json();
          setAsset({ _id: id, title: `Photo by ${data.author}`, description: `A beautiful high-resolution photo by ${data.author}.`, type: 'image', fileUrl: data.download_url, uploader: { name: data.author } });
        } else if (id.startsWith('itunes-')) {
          const trackId = id.split('-')[1];
          const res = await fetch(`https://itunes.apple.com/lookup?id=${trackId}`);
          const data = await res.json();
          if (data.results?.[0]) {
            const t = data.results[0];
            setAsset({ _id: id, title: `${t.trackName} — ${t.artistName}`, description: `Preview from ${t.collectionName} by ${t.artistName}.`, type: 'audio', fileUrl: t.previewUrl, thumbnailUrl: t.artworkUrl100, uploader: { name: t.artistName } });
          }
        } else {
          const res = await fetch(`${API_URL}/assets/${id}`);
          const data = await res.json();
          if (data.success) setAsset(data.data);
        }
      } catch (err) {
        showToast('Failed to load asset details.', 'error');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchAsset();
  }, [id]);

  if (loading) return (
    <div className="w-full h-screen bg-white dark:bg-background-dark flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Loading asset...</p>
    </div>
  );

  if (!asset) return (
    <div className="w-full h-screen bg-white dark:bg-background-dark flex flex-col items-center justify-center gap-4">
      <span className="material-icons-outlined text-6xl text-gray-300">image_not_supported</span>
      <p className="text-gray-500 font-medium">Asset not found</p>
      <button onClick={() => navigate('/search')} className="mt-2 px-6 py-2 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-hover transition">Browse assets</button>
    </div>
  );

  const assetLabel = asset.type === 'image' ? 'image' : asset.type === 'video' ? 'video' : asset.type === 'audio' ? 'track' : 'asset';
  const keywords = asset.tags?.length ? asset.tags : ['Nature', 'Landscape', 'Photography', 'Art', 'Creative'];
  const selectedPrice = SIZES[selectedSize].price;

  const handleDownload = () => {
    if (!asset.fileUrl) { showToast('File not available for download', 'error'); return; }
    window.open(getMediaUrl(asset.fileUrl), '_blank');
    showToast('Download started!', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-background-dark">
      <div className="sticky top-0 z-50 shadow-md">
        <Navbar onLoginClick={onLoginClick} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 text-sm text-gray-500">
          <div className="flex items-center gap-2 flex-wrap">
            <Link to="/" className="hover:underline hover:text-primary transition">Home</Link>
            <span>/</span>
            <Link to="/search" className="hover:underline hover:text-primary transition">Search</Link>
            <span>/</span>
            <span className="capitalize text-gray-700 dark:text-gray-300">{asset.type}</span>
            <span>/</span>
            <span className="text-gray-900 dark:text-white truncate max-w-xs font-medium">{asset.title}</span>
          </div>
          <div className="mt-2 sm:mt-0 font-mono text-xs text-gray-400">ID: {String(asset._id).slice(-8)}</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Media preview */}
          <div className="w-full lg:w-2/3 min-w-0">
            <div className="bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[400px] relative overflow-hidden">
              {asset.type?.includes('audio') ? (
                <div className="flex flex-col items-center justify-center w-full min-h-[400px] bg-gray-900 rounded relative">
                  {asset.thumbnailUrl && <img src={getMediaUrl(asset.thumbnailUrl).replace('100x100', '600x600')} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" alt="thumb" />}
                  <span className="material-icons-outlined text-white text-8xl mb-6 z-10">music_note</span>
                  {asset.fileUrl && <audio controls src={getMediaUrl(asset.fileUrl)} className="w-3/4 z-10 opacity-90"></audio>}
                </div>
              ) : asset.type?.includes('video') ? (
                <div className="w-full min-h-[400px] bg-black rounded relative flex items-center justify-center">
                  {asset.fileUrl && <video controls src={getMediaUrl(asset.fileUrl)} className="absolute inset-0 w-full h-full object-contain z-10" />}
                </div>
              ) : (
                <img alt={asset.title} className="max-h-[600px] w-auto h-auto object-contain rounded relative z-10" loading="lazy" src={getMediaUrl(asset.fileUrl)} onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80'; }} />
              )}
              {/* Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 select-none z-20 rotate-[-15deg]">
                <span className="text-4xl font-bold text-white/60 tracking-widest">MediaMatrix</span>
              </div>
              {/* Action buttons */}
              <div className="absolute bottom-3 right-3 flex gap-2 z-30">
                <button onClick={() => showToast('Crop tool coming soon!', 'info')} className="bg-black/70 hover:bg-black text-white p-2 rounded-full backdrop-blur-sm transition" title="Crop">
                  <span className="material-icons-outlined text-sm">crop_free</span>
                </button>
                <button onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('Link copied!', 'success'); }} className="bg-black/70 hover:bg-black text-white p-2 rounded-full backdrop-blur-sm transition" title="Share">
                  <span className="material-icons-outlined text-sm">share</span>
                </button>
              </div>
            </div>

            {/* Uploader */}
            <div className="mt-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  {asset.uploader?.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{asset.uploader?.name || 'Unknown'}</h3>
                  <button 
                    onClick={() => {
                      setIsFollowing(!isFollowing);
                      showToast(isFollowing ? 'Unfollowed creator' : 'Following creator!', 'success');
                    }} 
                    className={`${isFollowing ? 'text-gray-500' : 'text-primary'} text-sm font-medium hover:underline`}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
              <button onClick={() => navigate(`/search?q=${encodeURIComponent(asset.uploader?.name || '')}`)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary transition">
                <span className="material-icons-outlined text-lg">collections</span> See portfolio
              </button>
            </div>

            {/* Title & description */}
            <div className="py-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{asset.title}</h1>
              <p className="text-gray-500 leading-relaxed">{asset.description || 'No description available for this asset.'}</p>
            </div>

            {/* Keywords */}
            <div className="mt-2">
              <h3 className="text-base font-bold mb-3 text-gray-900 dark:text-white">Keywords</h3>
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw) => (
                  <button key={kw} onClick={() => navigate(`/search?q=${encodeURIComponent(kw)}`)}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-sm hover:border-primary hover:text-primary transition">
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Purchase sidebar */}
          <div className="w-full lg:w-1/3 min-w-0">
            <div className="sticky top-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white capitalize">Purchase this {assetLabel}</h2>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded dark:bg-green-900 dark:text-green-200">Royalty-free</span>
              </div>

              {/* License tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
                <button className="pb-2 border-b-2 border-primary font-medium text-gray-900 dark:text-white text-sm px-4">Standard License</button>
                <button onClick={() => showToast('Enhanced License info coming soon!', 'info')} className="pb-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm px-4 transition">Enhanced License</button>
              </div>

              {/* Size options */}
              <div className="space-y-2 mb-6">
                {SIZES.map((sz, i) => (
                  <label key={sz.label} onClick={() => setSelectedSize(i)}
                    className={`flex items-center justify-between p-3 rounded cursor-pointer transition border ${selectedSize === i ? 'border-2 border-primary bg-red-50 dark:bg-red-900/10' : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-background-dark hover:border-primary/50'}`}>
                    <div className="flex items-center gap-3">
                      <input readOnly checked={selectedSize === i} className="w-4 h-4 accent-primary" name="size" type="radio" />
                      <div>
                        <div className="font-semibold text-sm text-gray-900 dark:text-white">{sz.label}</div>
                        <div className="text-xs text-gray-400">{sz.dims}</div>
                      </div>
                    </div>
                    <div className="font-bold text-gray-900 dark:text-white">${sz.price}</div>
                  </label>
                ))}
              </div>

              <div className="space-y-3">
                <button onClick={handleDownload} className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded shadow-sm transition flex items-center justify-center gap-2">
                  <span className="material-icons-outlined text-lg">download</span>
                  Download for ${selectedPrice}
                </button>
                <p className="text-xs text-center text-gray-400">
                  Or <Link to="/subscription" className="text-primary hover:underline">subscribe &amp; save</Link> up to 60%
                </p>
                <button onClick={() => showToast('Image editor coming soon!', 'info')} className="w-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm">
                  <span className="material-icons-outlined text-lg">edit</span>
                  Edit this {assetLabel}
                </button>
              </div>

              {/* Asset details */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm">
                <h4 className="font-bold mb-3 text-gray-900 dark:text-white">Asset Details</h4>
                <div className="grid grid-cols-2 gap-y-2 text-gray-500">
                  <div>Type</div>
                  <div className="text-gray-900 dark:text-white text-right capitalize">{asset.type}</div>
                  <div>Date Uploaded</div>
                  <div className="text-gray-900 dark:text-white text-right">{asset.createdAt ? new Date(asset.createdAt).toLocaleDateString() : 'N/A'}</div>
                  {asset.size && <><div>File Size</div><div className="text-gray-900 dark:text-white text-right">{(asset.size / 1024 / 1024).toFixed(1)} MB</div></>}
                  {asset.tags?.length > 0 && <><div>Tags</div><div className="text-gray-900 dark:text-white text-right">{asset.tags.slice(0, 3).join(', ')}</div></>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar images */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Similar images</h2>
            <button onClick={() => navigate('/search')} className="text-primary font-medium text-sm hover:underline">See all</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SIMILAR_IMAGES.map((img) => (
              <button key={img.src} onClick={() => navigate('/search')} className="group relative block overflow-hidden rounded w-full">
                <img alt={img.label} className="w-full h-40 object-cover group-hover:scale-105 transition duration-300" src={img.src} />
                <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                  <span className="text-white text-xs font-medium">{img.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* More from contributor */}
        <div className="mt-12 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">More from this contributor</h2>
            <button onClick={() => navigate(`/search?q=${encodeURIComponent(asset.uploader?.name || '')}`)} className="text-primary font-medium text-sm hover:underline">See all</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {CONTRIBUTOR_IMAGES.map((img) => (
              <button key={img.src} onClick={() => navigate('/search')} className="group relative block overflow-hidden rounded w-full">
                <img alt={img.label} className="w-full h-40 object-cover group-hover:scale-105 transition duration-300" src={img.src} />
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-950 text-white py-10 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-sm text-gray-400">
            <div>
              <h3 className="font-bold text-white mb-3">Company</h3>
              <ul className="space-y-2">
                {['About us', 'Careers', 'Press/Media', 'Blog'].map(t => <li key={t}><button onClick={() => showToast('Coming soon!', 'info')} className="hover:text-white transition">{t}</button></li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">Resources</h3>
              <ul className="space-y-2">
                {['Help Center', 'API Docs', 'Affiliate Program', 'Developers'].map(t => <li key={t}><button onClick={() => showToast('Coming soon!', 'info')} className="hover:text-white transition">{t}</button></li>)}
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-3">Legal</h3>
              <ul className="space-y-2">
                {['Terms of use', 'Privacy policy', 'Cookie policy', 'License agreement'].map(t => <li key={t}><button onClick={() => showToast('Coming soon!', 'info')} className="hover:text-white transition">{t}</button></li>)}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="material-icons-outlined text-primary text-2xl">shutter_speed</span>
                <span className="font-bold text-lg">MediaMatrix</span>
              </div>
              <p className="text-xs text-gray-500">© 2024 MediaMatrix. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
