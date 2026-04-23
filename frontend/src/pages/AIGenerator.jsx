import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useToast } from '../context/ToastContext';
import { trackPageView } from '../utils/analytics';

const STYLES = [
  { label: 'None', value: '' },
  { label: 'Photorealistic', value: 'photorealistic, ultra detailed, 8k' },
  { label: 'Cinematic', value: 'cinematic, dramatic lighting, film grain, movie still' },
  { label: 'Oil Painting', value: 'oil painting, impressionist, textured canvas, masterpiece' },
  { label: 'Anime', value: 'anime style, vibrant, studio ghibli, sharp lines' },
  { label: 'Watercolor', value: 'watercolor painting, soft edges, pastel colors' },
  { label: 'Neon Cyberpunk', value: 'cyberpunk, neon lights, futuristic, dark city' },
  { label: 'Minimalist', value: 'minimalist, flat design, clean, simple shapes' },
];

const SIZES = [
  { label: 'Square (1:1)', w: 1024, h: 1024 },
  { label: 'Landscape (16:9)', w: 1280, h: 720 },
  { label: 'Portrait (9:16)', w: 720, h: 1280 },
  { label: 'Wide (2:1)', w: 1280, h: 640 },
];

const SUGGESTIONS = [
  'A futuristic city at sunset with flying cars',
  'A cozy cabin in a snowy forest at night',
  'An astronaut riding a horse on Mars',
  'Abstract waves of color in deep space',
  'A samurai standing in a bamboo forest at dawn',
  'A magical library with floating books',
  'Underwater city with glowing bioluminescent creatures',
  'A robot painting a self-portrait in an art studio',
];

export default function AIGenerator({ onLoginClick }) {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [size, setSize] = useState(SIZES[0]);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);
  const [history, setHistory] = useState([]);
  const [seed, setSeed] = useState(Math.floor(Math.random() * 99999));
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => { trackPageView('/ai-generator'); }, []);

  const enhancePrompt = (p, s) => {
    const base = p.trim();
    const styleTag = s || '';
    // auto-add quality boosters if not already in prompt
    const quality = 'highly detailed, sharp focus, high quality';
    return [base, styleTag, quality].filter(Boolean).join(', ');
  };

  const buildUrl = (p, s, sz, sd) => {
    const enhanced = enhancePrompt(p, s);
    const encoded = encodeURIComponent(enhanced);
    return `https://image.pollinations.ai/prompt/${encoded}?width=${sz.w}&height=${sz.h}&seed=${sd}&nologo=true&model=flux-schnell&enhance=true`;
  };

  const startCooldown = (seconds) => {
    setCooldown(seconds);
    const interval = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const generate = async () => {
    if (!prompt.trim()) { showToast('Please enter a prompt first', 'error'); return; }
    if (cooldown > 0) { showToast(`Please wait ${cooldown}s before generating again`, 'info'); return; }

    const newSeed = Math.floor(Math.random() * 99999);
    setSeed(newSeed);
    setLoading(true);
    setImageUrl(null);
    setImageBlob(null);

    const url = buildUrl(prompt, style, size, newSeed);

    try {
      const res = await fetch(url);

      if (res.status === 429) {
        showToast('Rate limit reached — please wait 15 seconds and try again', 'error');
        startCooldown(15);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        showToast(`Generation failed (${res.status}) — please try again`, 'error');
        setLoading(false);
        return;
      }

      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      setImageBlob(blob);
      setImageUrl(blobUrl);
      setHistory(prev => [{ url: blobUrl, prompt, style: style || 'None', size: size.label }, ...prev].slice(0, 8));
      startCooldown(5);
    } catch (err) {
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        showToast('Network error — check your internet connection', 'error');
      } else {
        showToast('Generation failed — please try again', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  const download = () => {
    if (!imageBlob && !imageUrl) return;
    const blobUrl = imageBlob ? URL.createObjectURL(imageBlob) : imageUrl;
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = `mediamatrix-ai-${seed}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (imageBlob) URL.revokeObjectURL(blobUrl);
    showToast('Image saved to your device!', 'success');
  };

  return (
    <div className="w-full min-h-screen bg-background-dark text-white">
      <Navbar onLoginClick={onLoginClick} />

      {/* Hero */}
      <div className="border-b border-gray-800 bg-gradient-to-br from-gray-900 via-background-dark to-gray-900 py-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary px-3 py-1 rounded-full text-xs font-bold mb-4">
          <span className="material-icons-outlined text-sm">auto_awesome</span> Powered by Flux AI · Free
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-white via-gray-200 to-primary bg-clip-text text-transparent">
          AI Image Generator
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto">
          Turn any text prompt into a stunning image in seconds. No credits, no limits.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* ── Left: Controls ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Prompt */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Your Prompt</label>
            <textarea
              rows={4}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe the image you want to create..."
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none transition"
            />
            <p className="text-[10px] text-gray-600 mt-1">Press Enter to generate</p>
          </div>

          {/* Quick suggestions */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Try a suggestion</label>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.slice(0, 4).map(s => (
                <button key={s} onClick={() => setPrompt(s)}
                  className="text-[11px] bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-primary/50 text-gray-300 px-2 py-1 rounded-full transition">
                  {s.length > 30 ? s.slice(0, 30) + '…' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Art Style</label>
            <div className="grid grid-cols-2 gap-2">
              {STYLES.map(st => (
                <button key={st.label}
                  onClick={() => setStyle(st.value)}
                  className={`text-xs px-3 py-2 rounded-lg border transition text-left ${style === st.value ? 'border-primary bg-primary/10 text-primary' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500'}`}>
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Aspect Ratio</label>
            <div className="grid grid-cols-2 gap-2">
              {SIZES.map(sz => (
                <button key={sz.label}
                  onClick={() => setSize(sz)}
                  className={`text-xs px-3 py-2 rounded-lg border transition ${size.label === sz.label ? 'border-primary bg-primary/10 text-primary' : 'border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-500'}`}>
                  {sz.label}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={loading || cooldown > 0}
            className="w-full py-3 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition flex items-center justify-center gap-2 text-sm shadow-lg shadow-red-900/30">
            {loading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Generating…</>
              : cooldown > 0
              ? <><span className="material-icons-outlined text-lg">timer</span> Wait {cooldown}s</>
              : <><span className="material-icons-outlined text-lg">auto_awesome</span> Generate Image</>}
          </button>
        </div>

        {/* ── Right: Output ── */}
        <div className="lg:col-span-3 space-y-4">
          <div className="rounded-xl border border-gray-800 overflow-hidden bg-gray-900 min-h-[400px] flex items-center justify-center relative">
            {loading && (
              <div className="flex flex-col items-center gap-4 text-gray-500 p-12">
                <div className="w-12 h-12 border-4 border-gray-700 border-t-primary rounded-full animate-spin"></div>
                <p className="text-sm">Creating your image…</p>
                <p className="text-xs text-gray-600 text-center max-w-xs">Usually takes 3–8 seconds</p>
              </div>
            )}
            {!loading && !imageUrl && (
              <div className="flex flex-col items-center gap-3 text-gray-600 p-12">
                <span className="material-icons-outlined text-6xl">image</span>
                <p className="text-sm">Your generated image will appear here</p>
              </div>
            )}
            {!loading && imageUrl && (
              <img src={imageUrl} alt={prompt} className="w-full h-auto object-contain" />
            )}
          </div>

          {imageUrl && !loading && (
            <div className="flex gap-3">
              <button onClick={download}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2">
                <span className="material-icons-outlined text-lg">download</span> Download
              </button>
              <button onClick={generate}
                className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white text-sm font-medium rounded-lg transition flex items-center justify-center gap-2">
                <span className="material-icons-outlined text-lg">refresh</span> Regenerate
              </button>
            </div>
          )}

          {/* Prompt display */}
          {imageUrl && (
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-3">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Prompt used</p>
              <p className="text-xs text-gray-300">{prompt}{style ? ` · ${STYLES.find(s => s.value === style)?.label}` : ''} · {size.label}</p>
            </div>
          )}

          {/* History */}
          {history.length > 1 && (
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">This Session</p>
              <div className="grid grid-cols-4 gap-2">
                {history.slice(1).map((item, i) => (
                  <button key={i} onClick={() => setImageUrl(item.url)}
                    className="aspect-square rounded-lg overflow-hidden border border-gray-800 hover:border-primary/50 transition">
                    <img src={item.url} alt={item.prompt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
