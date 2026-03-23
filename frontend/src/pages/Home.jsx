import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import UploadModal from '../components/UploadModal';

export default function Home({ onLoginClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="w-full h-full min-h-screen bg-white">

      <div className="bg-primary text-white text-xs py-2 text-center font-medium">
        Get 10 royalty-free image downloads each month with a cost-saving subscription. <a className="underline ml-2 bg-white text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase hover:bg-gray-100" href="#">Buy now</a>
      </div>
      <nav className="bg-background-dark text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center space-x-2 cursor-pointer">
              <span className="material-icons-outlined text-primary text-3xl">shutter_speed</span>
              <span className="font-bold text-xl tracking-tight">ShutterStock</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <button className="hover:text-primary transition"><span className="material-icons-outlined text-xl">favorite_border</span></button>
              <button className="hover:text-primary transition"><span className="material-icons-outlined text-xl">shopping_cart</span></button>
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-gray-300 font-medium hidden sm:block">Hi, {user.name}</span>
                  <button onClick={() => setIsUploadOpen(true)} className="px-4 py-1.5 bg-primary hover:bg-primary-hover border border-primary text-white rounded text-xs transition font-bold flex items-center gap-1">
                    <span className="material-icons text-sm">cloud_upload</span> Upload
                  </button>
                  <button onClick={logout} className="px-4 py-1.5 border border-gray-600 rounded text-xs hover:border-gray-400 transition font-medium">Log out</button>
                </div>
              ) : (
                <button onClick={onLoginClick} className="px-4 py-1.5 border border-gray-600 rounded text-xs hover:border-gray-400 transition font-medium">Log in</button>
              )}
            </div>
          </div>
          <div className="hidden md:flex space-x-8 pb-3 text-xs text-gray-400 font-medium">
            <a className="hover:text-white flex items-center gap-1" href="#">Images <span className="material-icons-outlined text-[14px]">expand_more</span></a>
            <a className="hover:text-white flex items-center gap-1" href="#">Video <span className="material-icons-outlined text-[14px]">expand_more</span></a>
            <a className="hover:text-white flex items-center gap-1" href="#">Music <span className="material-icons-outlined text-[14px]">expand_more</span></a>
            <a className="hover:text-white flex items-center gap-1" href="#">Editorial <span className="material-icons-outlined text-[14px]">expand_more</span></a>
            <a className="hover:text-white flex items-center gap-1" href="#">3D <span className="material-icons-outlined text-[14px]">expand_more</span></a>
            <a className="text-primary hover:text-red-400 flex items-center gap-1" href="#">AI Generator <span className="bg-primary/20 text-primary px-1 rounded text-[9px] border border-primary/30">NEW</span></a>
          </div>
        </div>
      </nav>
      <header className="relative bg-black overflow-hidden h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 opacity-60">
          <img alt="Abstract gradient background" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEkzsiD7bvkwsa2dRtvXnSwkQt0h6sJEeTlTvZ0j03z8JvzGCtR_yUUVcsaFdbmDB4Ha3SIG9qCXAuZtk1p4_qsPzWtPyRAkDzPpH8tp9L7FulraNE_354-EsfFaZgjBGvLsxlf9f5Jd1mc48dlSrC-Md4ZBGM9ohhLF2pTL6B0f6Ze4u7BblJhTRaiS2EhZG2oHTz0rJB6aaFuVrekapV7vXN5z3sb4gLeGEHzwtF5zm5fIYxIgPbYQUcq8VzhJvr9B2Eg5pYPXE" />
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
            <input className="flex-grow px-4 h-full text-gray-800 placeholder-gray-400 focus:outline-none border-none focus:ring-0" placeholder="Start your next project" type="text" />
            <button className="px-4 text-gray-500 hover:text-gray-800 border-l border-gray-100 h-full flex items-center gap-1 text-xs">
              <span className="material-icons-outlined">image_search</span> Search by image
            </button>
            <button onClick={() => navigate('/search')} className="bg-primary hover:bg-primary-hover text-white h-full px-6 flex items-center justify-center transition">
              <span className="material-icons-outlined">search</span>
            </button>
          </div>
          <div className="mt-4 text-xs text-gray-400 flex justify-center gap-2">
            <span className="font-semibold text-gray-300">Trending:</span>
            <a className="hover:text-white underline" href="#">spring flowers</a>,
            <a className="hover:text-white underline" href="#">business meeting</a>,
            <a className="hover:text-white underline" href="#">abstract background</a>,
            <a className="hover:text-white underline" href="#">AI technology</a>
          </div>
        </div>
      </header>
      <section className="py-12 bg-surface-light dark:bg-surface-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8 dark:text-white">One Brand. Endless Possibilities.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/search" className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Premium Content" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJlsobH-yKrQcgXOCgCOciSRPzcL2HwQpmEBQMEyggtIqfMXYwJAvsPek25997mzoFHgPbLDQ8iMXBFOqHJXs30KSLeDHlPSD_2cw1lZZdLx-duLyBce4pa9mvT_S-QEeH-KtoHUBl0oWjoBo11vLDijpbueMMnUhQRol3Dy4AQLv3VyFqAyJn40jG4M3ce_2aKmx0HHEvbn1oQUhnQ57GOG5hlVgClV828z7wz2-V-bp7yza7Ac7bsuQhXeOfPgzso_DyxSMhuu8" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-light dark:text-white group-hover:text-primary transition">Premium Content</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Exclusive access</p>
              </div>
            </Link>
            <a className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20" href="#">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Custom Production" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZbkf-Y8CYVCWLF9PABk2wUDWbIUeaLITO3MIg71TZiJeSYSCMUAQg-nzuRLvn9O0bazCF_AsduYJ8XTM175Med0gf_7AoX9FwL7my9dvCmfpRkH8aIRM4ov1zKGyo85e-fp00ldwH8jjCOnfYoEefPjC0cLND3vUZtRVW36tEAGvD4XgP4OfLHbANXjvogCnSiFDSYJ-k6No3FFoBQVciDDZzd6FU0lP2z9PYJfS9l91sSLYlS2xjGP77-Hym2DZS0UGwCVBpOV8" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-light dark:text-white group-hover:text-primary transition">Custom Production</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tailored for you</p>
              </div>
            </a>
            <a className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20" href="#">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Generative AI" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMwqNWu7YJbI9XeSUp5u58OkJtlAaL2IUCh3ix1q_r4v42UsiPSZncreqb2_5r99Tx5nqU9olXdUwxOzf-CWTyruVJqtnAnW7DSERGFlkrbzJTaaiFagvBRWVOC_o17a38NHI8OPukidS0XT_mTGgqO_tfOWaegvZsX_zpAdlUdp_O96vXq05jHNz2Wy8hF92SzyzXR_a92lfR1XCAN2tkaWGMelUG879qfGQemBpU_6d-D-0gvXCotzhniWvhZScfXacc8FcU1W4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-text-light dark:text-white group-hover:text-primary transition">Generative AI</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Create instantly</p>
              </div>
            </a>
            <a className="group flex items-center space-x-4 bg-background-light dark:bg-background-dark p-4 rounded-lg shadow-sm hover:shadow-md transition border border-transparent dark:border-border-dark hover:border-primary/20" href="#">
              <div className="w-12 h-12 rounded overflow-hidden">
                <img alt="Rights-Cleared" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjoW0H8_Neboj7slLupNts6mYgrcyUyIZw7_i0bVIFjC8-daMRlOWhz5BHDiGGEJJb5I9RF_aAd4EdxPOyrUO26IfXL0WBoNoiC9duwUqpYq6hQ-izH0ycnCKAByOfl-985VQ6qET7ykVbaODv3HFcBJ2uPtx8-M6Aqs2UEv2VyIZMZPBvbwqnEaLFLuIu5He0qGUKQhDZA2gEoJ370_EvkySssjuJglQBaZK9E_KqNxGFNE6c-bqNvA3fBmI0rt9-0rMb93CaKEE" />
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
            <div onClick={() => navigate('/search')} className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="AI Image Generator" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC02MDavJf2hxe4_QMtTARTB3ClariQ-B6nMfAsTuVxwwrYaY9LQRdNT4MojR41w1pvHPZbGv1c0xBMSnFnAnnt4TgrSEchwV-9ARO_OnO4BOMw-eEWJ6Fe_kBPXL6VfvnAA99FBnvu5yqh0JuPvbkyUrFeTMVE-9GHNJUjLYbtAMRYe81yo8lbCa23tjmlRvXwhd3Vk895RrwCTRNSu8cJ-Cqovgy3M0tdQdaAswaF4p4TSKrHYxy4UTfG0MlV--NHT5HjiQXnJtQ" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">AI Image Generator</h3>
              </div>
            </div>
            <div className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="Images" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMPoMOspeeRklniMI0owto_pUd5xq_7ORMX0Mj1mKFdjvRVXVTjtSzj3A4d6RHyqZtUD-ZKfnZXI3qX5OzMxAuzdHWJJEIa-flKTRnNGBilOXTyIcO_LSWk3IDDOEhVE1UUsyNKFeYn4l2B_ZgxYz6vUZVsNlESXRBMtslqRHHM7zPkE6ZJAhbgtBFSKKxmMMfZOl2I9DgSHhoAkgl7xVxfMo_DdLDlDu1vTKgCmllp2SLscE0G11MEG4as5peUek98ZYuneuOf0Q" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">Images</h3>
              </div>
            </div>
            <div className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="Video" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhU3ubZKsRWykRgVxvDnPMGq8VSJFq0QegoymaE-baKVM2PY9zZ6LOpI9W9zdCPnOwmk5rP41T-Tp7RTxMqqPFuNYpxU4YeQyrNgSQsFi2hLNZmvGhbMCsANozymXOpW6jz-j1lFC8m1F8mib2Bm0Cv7KtzZtcyofUXrelN1I3VdhItq1B4VontKPYS29EhQVzvfJ4JkBJElVJd1gS8k7KpkjN2Cv0OO6QpzBjApXM8E5mwuxBuzUCmF1Dwosl68opKTEitVYbNiA" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-lg font-bold">Video</h3>
              </div>
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full">
                <span className="material-icons-outlined text-white">play_arrow</span>
              </div>
            </div>
            <div className="relative group h-80 rounded-xl overflow-hidden cursor-pointer">
              <img alt="Music" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj_fNVI3_ERvWu3RDjlmUcCA_LreU7VXrTwX3es8vXoBFvHt2jzg8dblYEM39vPniZG17I2bgUPIJ7IuJoQETPDySCAf7CIVIKed3g8mgeXtMkkS5iREeGsFuoNjGy9iCq14Qe8FThWRKdjSUSWNa67WL759KLs7THB0QOcGTIxKKJkqm4qCPurTSA3Zj1oo9rW9m44ZPkZndk2KTyBV2Or7i2XM9KUOVXaCCAtkjz2kzyq4dsuSx64sxknr4bH_NN_Lm6N9tcjz0" />
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
            <div onClick={() => navigate('/details')} className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-zoom-in">
              <img alt="Love hands" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTLdqnhBus1hZSxY5_VKH_tQq4m64WW_l--mHKsupGBtNa7FGn4caHcNPPwY1xXtULb12YtHL3SDGZ_uUvWPz7Oe7kHKvOAwqutv6uHzSbMAnW8wZdj6Kt6q7YRsg0dO5SQSThymXxHn7NhyTzhwyLRfU4nCAx52k7yCIVRUo1x96iRjiMq2Ezo6KOCtvjmI7f3UJXnooVE3k0vteplnviZFg6Fbc3SLiXvMi18GEIygpw6vhBP1j1LSsfH8UZv_z3xJdcbdCd5J0" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3">
                <div className="text-white text-xs font-medium">Add to collection</div>
                <div className="flex gap-2">
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">favorite</span></button>
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">download</span></button>
                </div>
              </div>
            </div>
            <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden bg-gray-900 text-white relative group cursor-pointer">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary rounded-full p-2"><span className="material-icons-outlined text-white">play_arrow</span></div>
                  <div>
                    <h4 className="text-sm font-bold">Cozy Winter</h4>
                    <p className="text-xs text-gray-400">By Hidden</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">2:23 / 95 BPM</span>
                </div>
                <div className="h-8 w-full flex items-center gap-0.5 opacity-60">
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-5 bg-white rounded-full"></div>
                  <div className="w-1 h-8 bg-white rounded-full"></div>
                  <div className="w-1 h-4 bg-white rounded-full"></div>
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <div className="w-1 h-2 bg-white rounded-full"></div>
                  <div className="w-1 h-5 bg-white rounded-full"></div>
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-5 bg-white rounded-full"></div>
                  <div className="w-1 h-8 bg-white rounded-full"></div>
                  <div className="w-1 h-4 bg-white rounded-full"></div>
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div onClick={() => navigate('/details')} className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-zoom-in">
              <img alt="Winter couple" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfQn5M42VHX95Ti814el9vTrz2GprLpV0IxTxdZcdCdKaGHkeuaMe8TiM43jIRhcIPW7Od4EOhmqBkkAxAotyOZ0TqSEeZ6YtauEB4lJ9ZfNpH5sZiGgI_X4T7bEKw5EgmCQiZ_4gwB_A-ej0RNpOE5ddW6UpO7zoZpUvGc1I23sUJylzr0uRBZ8r708F5rFhQUtte8ceyxGFzKqscfx2IWMEM5043-GHHnyReC1KOayTf_Maea2oTyN15bXs_L76RQeKxarXAx78" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3">
                <div className="text-white text-xs font-medium">Add to collection</div>
                <div className="flex gap-2">
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">favorite</span></button>
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">download</span></button>
                </div>
              </div>
            </div>
            <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-pointer">
              <img alt="Office building" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8jmqU3X8w7E0G5ON3O3FlNuKnSsObT01JfmW5P0ItKJRCq4nmbqCtTZ8e47IScKy7N3f8DW9BESk6QZvgak1DXfJOt6XzrlqaTBTwnt_724cx0CPoQP5tdGb-bz_ms6Zbx4cqRzk-SNVUo8UYrFO3wxZ8DIwR3ywxs5vuvAc7GGer7Ic7QX3XmTvRxfgcX575BreE_dhWMAqq5wCW0BF23Wv-xmWEDXwLvhf6b46ad9HdzIdY2y3bGPeRfrQ-DASMU-9RMMxM5-A" />
              <div className="absolute top-2 left-2 bg-black/60 px-1.5 py-0.5 rounded text-[10px] font-bold text-white uppercase flex items-center gap-1">
                <span className="material-icons-outlined text-[10px]">videocam</span> 4K
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full"><span className="material-icons-outlined text-white text-3xl">play_arrow</span></div>
              </div>
            </div>
            <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-zoom-in">
              <img alt="Snow mountains" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVKNzlscd9BhlR2-iA-62wSGfJj4T6Dz1n7JW2_8r_OEv0pNbmWhwYVo5TZ3CC3LXG4UJ93lAT1HYgLlK8AAbYwDg5J7WoOl8t7nv783HAw8umwB9bRVHAEYYgaJcod1a3ntMjocbNnosdUOdXxINPVVHAe0mq0ZOIrd9dwd3pA5AvjXrREfSEzOX3xgowWeMK29D0Tw03eDJgN4t-EtNQwmyw9Tt38_E22fjfXARJytO7eeMSBIb1gjmH5YMnZss-vkifZL811U0" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3">
                <div className="text-white text-xs font-medium">Add to collection</div>
                <div className="flex gap-2">
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">favorite</span></button>
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">download</span></button>
                </div>
              </div>
            </div>
            <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden bg-gray-800 text-white relative group cursor-pointer">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-gray-600 rounded-full p-2"><span className="material-icons-outlined text-white">play_arrow</span></div>
                  <div>
                    <h4 className="text-sm font-bold">Tech Flow</h4>
                    <p className="text-xs text-gray-400">By Titan Sound</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">2:21</span>
                </div>
                <div className="h-8 w-full flex items-center gap-0.5 opacity-60">
                  <div className="w-1 h-3 bg-white rounded-full"></div>
                  <div className="w-1 h-5 bg-white rounded-full"></div>
                  <div className="w-1 h-8 bg-white rounded-full"></div>
                  <div className="w-1 h-4 bg-white rounded-full"></div>
                  <div className="w-1 h-6 bg-white rounded-full"></div>
                  <div className="w-1 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-zoom-in">
              <img alt="Food minimalism" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJAkfWvaQlt6581l7BB4VT9q5YUGldqrsR9gotck6RMV46lhavlr2w4oSWmT8eNMl1ej70mQoWWqtAHhWn-tqMyfXVJ_dnP0pfIKwj6dsLSSOhf2M5EJ81zOEOAN8G5FZjTHMuOP2KNaiSWc8ii_g2RJT-G7Aadv8-p_mKreTCsEtBRWjqxonpo4besE5tcoR-VZMyQ6d8qrt1HL__6lJR3zvWdQVcVf88pW4_LM1Utcu4__9dIm114c9mrp1bYpYbVyeObaAd4Tk" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3">
                <div className="text-white text-xs font-medium">Add to collection</div>
                <div className="flex gap-2">
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">favorite</span></button>
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">download</span></button>
                </div>
              </div>
            </div>
            <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden group relative cursor-zoom-in">
              <img alt="Skiing" className="w-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRHu9fXY6Ouxk6YvADG6jzUGXCfIohbSEQZprvLVI6ISMWqmiAEBrgsT296RZ7yErDSioD1SU7hHQ3TH-YhG4D8ZxL620Gdsmwnc-cuRU_tIRNgH06uJy7EEJ0CJwjle3jtI01Wba159-394ZY7I0KhpdwIrb1Vqt8Ql5qxG37pxCVuqhaR6d3TBrb9DuvRQvTvMxNvGbnKp1DZndrvYBmt-g-fegvO-_SYsQZ9coe1geN0lPyTd0fVUd3quw9LMHQPPBuxJw1U8Y" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3">
                <div className="text-white text-xs font-medium">Add to collection</div>
                <div className="flex gap-2">
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">favorite</span></button>
                  <button className="bg-white/90 p-1.5 rounded hover:bg-white text-gray-800"><span className="material-icons-outlined text-sm">download</span></button>
                </div>
              </div>
            </div>
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
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAacTHqUBEXj1btuSFANYxQQV3NpcqomAAoHq1rsKZ5v1lWH62pnVFsbDrSJGy2Zg_ln2-b-X09gxGoNXGcYDr4FzVUFFeJhI4eAB3NDdqqnuhje2qZRNqhuMZ01oTiDOE_Vfv3heOLzWSuS-pugpCICwiU1Pts8pF271poG1a0ALz4OZjTGrKo5UrpxlxUC2ztXO-cZnZywTSVoFnAyicWC_LC_S7ll3W928hRQUQuAWmc-UbXTS_TdMxITNVQmI7Okr7w64KaxIA" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Images</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-blue-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfz1M0kMTUEPaskYnvwsUbeZq3-0piVPLouolVeO-ZYbdereYnX0lPuXpVqjrFZYVvfRxYDlpb5qQyRym12zRwnpRk3S7YkIDKi0hu-NYOutlm-mF8phB1OeFWFQgiKfBR8qTEbGLLwtsiRJrFqR6cn5LpqEox0XI3kNDTzAOemBsvOhFzUHakcgQYsz1WG_j8u5JJNEhFTZIJurCK7937lYV4Fl4lbi4Fg-8w5sEk4c9Pn1eeQYkv2LbnP3Uk9vW9ndw1lqrDaXI" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Video</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-yellow-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN4o2DrNDMdR_xWd1PgUGH6DK_4kcM0EpOMEoGe7PyX5xoI_extz5Ob8YAKB-L4rbPvAeiOeBbBaL3z-5vkwnfv3WrLIHv8X4v1tKLRuHGs2AsTFWZG6nIPi0JewOHlI5U-pN4HOep-gHofy8_iKIlS6l3Pvn7C1x_FegHjYrQDw7sqV44LrTFb3QRpDx7KKlNNdMeyW7UG8KMGh2wfoz_1PRMvIgnkrX-2VjZv2m50wWodIrXxc6ruk7SJBv_Km-sBL53AGsbDxU" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Music</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-purple-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOes13fFZt-NAknD0_WhEQwpsjUgPv1Qtiq-YaQHAmYQAEngJIIV16CY7sQSKmyVUqM3iT7uBWWmxz4YrlnpdPIAgmk8P0mBwQY-4B-8x9Bh5pXU-MaaK3r6_FPs-bolqBZMINztGaOH6pSPElwaeTFH74ZPSl2q_5GatdzPkHCjhEiSDNODf2kjCT__6S4yY3DvJaNsg8C6orNKGdMVMUM_wWActu1p64vV9TmKnVAOt83h34RT5oClm6GOiJisVXLsjOz8XRPBQ" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Sound effects</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-green-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNShsLKeMBtpI9VZavBwtKlrfaUb_XMPRYERHOw1bttToWUvdVZGzY8QdVilwQH3N-9QUD0JljAgngCy-Uywt2n3IzCZ2Yz_9ELeTe8cqpPZCuFR98UBtDMicxe0WpIN8QuJUi-_bnmha48g9k_QjZcXqvHNO6-WlHf1Uizg4i-T_Jw55iwATOtGfyvXUlOnMiLOeG5dY8fsw3O6dFw_8bjT6oWQj5E0YA-78Q_WSx5EyVi3ak9ZWfh_Pa8NlHaYEztOtcdWadGws" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">AI Image Generator</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-indigo-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgrJ1tLaLO3haNtp8FpFIleFsTywWlXPZC7oQSH9C6tm9B_HIuyFm2DbZmObVJ4nufzKaXulYhiI7_D_BxSmCfA0eTSK-rXyCxNaKkFuk4WlqrLlXnP43atGQjID-2mp2MkVQhwxoSU56-ukVhPgCKdaJVh-ORScpRiXeibNRQDb69hWjvqJ_qpPBBMVedu9DxY8Bkn65oAuDHofaNqKx7RwpC1ziKmQZ6dg6rdntJxtjRJ1FbjXduGlGAsBw_dodKLoN0xshUSjo" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Vectors</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-pink-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUgbIPH0xnYIyyVleTl_zqfWoA4MDyw0ExB_Dbl9OoiTKjBj-_Snlpq2b9zyNPcIF1VDvsQBcNo-cewdQ7NrABXwuhXhFcYmTEsaDDW7jxCrcg_Lscy1LgwPrtodlzft9CvWA6QEsRbK2bgnlSiqDUEX_kfk764NF_mlvH8C8BGhBSSdtYmBM1Cx4Z20Yg2Q8kAIXUqoyj_iwEAhvs2T6tdxl9fxkFaCeWcPFeN_rPKXXIem6Y9KUAfoxOedSlWAkAIHBEEla5kds" />
              </div>
              <span className="font-medium text-sm text-gray-900 dark:text-white group-hover:text-primary">Photos</span>
            </a>
            <a className="flex items-center space-x-3 group" href="#">
              <div className="w-12 h-12 rounded bg-orange-100 flex items-center justify-center overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_zA-pbtGobidwY4_5jY5rEyX4RfAi81JuoxGD5pH9OSAjuKiE-uaL__I7Kt_Lp4BZsMuACVK2JGQqs_Q64Lxi-mJJv9Xfk7NARuKHr8o5ssNlv-aYWFAt6yFn7AnO7lw_rhEmTYwKVCLJOlG5exC4MsUUe-y_55Mrg37CviwtHw09rcEL__ij9u-l3MlweBMVe2gsV11AAnRk3hBwmpYQHhnjM90Y84X3BaEF2Nqdr9xDZrCXFxl3s_OA_A1nJVQNNIweeyESXX4" />
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
              <img alt="Blossoming Spring" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA99hKZgGXhlKyRASRWX8H4UZcVH1jFdPefLZHECo0YpgeFC7rnqbbS-CUVpGMTz5sBWf_HTjF1alIyz6QcbRzc-Kmd-k5O7nhE76afHSZmPT4sLogJjjvIzXgHA06PsKLl-6a3zl5AomPZcZ-dApFzfGg45vInkqtWwtSOJBp__luuThyh-E_2bRZjYNnBDA7Yjqc64Muzhjc__pg3gU1QCQKQv8o8D08j9v3lZU2cc39ZZWSwr-uas0l9JHoVVgBzdMXGZizCe7k" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-center w-full pr-12">
                <h3 className="text-xl font-bold">Blossoming Spring</h3>
              </div>
            </div>
            <div className="relative group h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img alt="Moments in Motion" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4Qn1q4g6zQpf1_WT6WAb1IqA_pBKmzwVdmLZFZ_wA0N6ZZH8JKo4Y5r5R-PvxsVzjeCzRCy3qjD4vlIopeEp9QA_jNIbi_fLqtLXY66SfxtF2W-uCpBGxgBcgL0bjrYYb-aRb02DK7PuEmDZI4BjJzelXckDf4NCm7TtktBAs2mIvCMVdFtaOS4tbiMIrTtE781SjouyOnS4JeUDyuNXDpqyh0gqqOVuT5At_avmp8Z92okLkAoAR6uZ2xaCEHVcRFDUDZxRIaik" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-center w-full pr-12">
                <h3 className="text-xl font-bold">Moments in Motion</h3>
              </div>
            </div>
            <div className="relative group h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img alt="Paris Romance" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcXX_E8tyv_IDO6TsOMqaMQedNrILoKm0kN3TgxtDAEnCbRWrF1tJA3M1H29HFTzgj7kogGJNev_Nh_uL0myFVk4v46U3ACqSU9C9eGtcgejVXePsoJ_5dxnFTNM3SDvYZGfLP5Apze5l5858ViGi-OQ09Y1DOKdicmZc8pC_ZQx3caMFTQKNFo0zSkq7e3Qfml5Gr3B1Q3Q3M95ODFsxm969UbC0P01F79CcJfsZ2JkpuN4UaKm5HPWVwWpRUcRVvcTdbqlE-KMw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-center w-full pr-12">
                <h3 className="text-xl font-bold">Paris Romance</h3>
              </div>
            </div>
            <div className="relative group h-96 rounded-xl overflow-hidden cursor-pointer shadow-lg">
              <img alt="Gradient Vectors" className="w-full h-full object-cover group-hover:scale-105 transition duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6WGPR6jSwe07Z_bRCi97sSc3ehzcrAHYwyRdQnTWjf3OCKznfk_6ftbdI73rQKGNZQWr-_lmxDipWlwo6XC56M008Fw5AtzmVjVvrKM0XdtQWW1pe2YKIs98DLbAOiBMApu-CUda1CzQ6-ImI_gULJRO-QW2Zs6COXx-SO8hs69YnrEaFhrRBq0qxl26u33AIO2mgbLGOOd91LDKq_RSKUrz2xwpQ_ahi2pATnh_WZeKra4mFDnOyuqHlxAZ3-jUpAfwjj4U5Kqg" />
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
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA6iPkm1fBSynb1STpyeZ9SfrU9StlxB2n0d3z1ssyc71p1dIXS1hfDGn8mD2P8EjhkPrb3frnrDskqiAWJOWsOXaUDebRFgdjCgQ8h9a-RxaxXk98Gnkc-WhirAqWuhu4ZyA67BtIg73u0bpkFl0fUkcvk7s78imbLxyi7KSxDHuznwRqahQ4F3QW5tkekaV8nJ5G9X06WkNhu9Km_Im9uOLaL-0KIk7BwX84HHE3prBd5hTwEm6mLhEtDs8VOlB2xraaC8qeAU8" />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <h3 className="text-lg font-bold mb-2 dark:text-white">In The Wild: TurboSquid x House of Kardashian</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">TurboSquid is the world's premier 3D design resource. In the first installment of Shutterstock's digital series In The Wild, watch global creative studio Coffee &amp; TV use TurboSquid's premium 3D models to craft House of Kardashian's opening sequence.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article>
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgXFUCvkVpTc9TkC96aLl3xsWkXCXP8VwBUySzc0Udofgpfjs4MchOS5F3j2xcu21Uzvk4A9gOhVTP0ftj5b7I2ZHBL_Rvw2bHaPASnGGm32UZYP0dKzvyEJjlSDPxgwLZCdsUNaR8h6A1JbuXiC9qkMcSR5rEzCZ0wF8xLvcHFIZkcKeGa1SFzZelFplA5fRInIhYk2KAWhG9N6pA5FaCAmRZqGCvn7fonGI6MTMwrnguwPjkRfz8Ltx2vIyJCOTImrgIWHl_zWk" />
              </div>
              <h3 className="font-bold text-sm mb-2 dark:text-white">Shutterstock Pricing Plans, Demystified</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Elevate your creative projects by blending stock images, audio, and video using flexible pricing plans.</p>
            </article>
            <article>
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7ZxFjgLxTkr_x715by5Oasfa04iWJucS2UjpnStReR4tvzuGwfjBLz6yrL6yDNEuY3ROzCpwRu4tG5qzU_3v6w9cfkJtKcy6ZeZVpTfCYgFVoTkSygSZSf_iILzVToQaHPGMdtC2yQ4VaJrrqJk8sjWzJpeBZUkLqqDWf3Sm-Mh-Z3wAMoJSAkR2fER0hQbHSA2PbbJ662dhV8Jsqn28gPvypDZYZbx1flpWvx2c8vt04NCtoTLqRP7T-Gha2SuK-kjeMT97Prms" />
              </div>
              <h3 className="font-bold text-sm mb-2 dark:text-white">Introducing Indemnification for AI-Generated Images</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Shutterstock is the first to provide financial protections against legal liabilities, ensuring Enterprise customers use confidentially.</p>
            </article>
            <article>
              <div className="rounded-lg overflow-hidden mb-4 h-48">
                <img className="w-full h-full object-cover hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQx54zgdoNswNPEUl7iwB4pU51ugtQ1ZaoI0ZU2QJUYMith5-1Vd4od-HGGrj_Fb9yssE0FLx9mqV0Hu-bqq8PRe9xNCvMstnqUCQPLGTrvLMVjGjqXu8orMTLuG5pdG5llQ5Yb-24UyzzpGdIRggAFutC9AJJCm97vaz7eAqE9GMELF---2sGgqFnEd3GmX-Okv1BHDmZKF7nEzkUQX4UulUuFUCMU7Bw5_Vu2SBKf2fBC2EYex-pBMZ-UppwmLvB0COYkuILA8g" />
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
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHJsf6kj-RoIDZZQ4-mCKyqKpKGHoqLK0bqdDHQD5hpNHAiRn3FPA9aGZIYkkP4Ns7VSRWHpITe3ew-BV9XWTodJr0gfMV9V0zzNDmKh-I3DyASNLrlmK8IVGEgwDZBH5NIM-9i79wBteAxRcQnvany_yu-TMIUotNW-5dZhaLqtAXGYHj1w3SEXcbV-LhUf0KSHO9iR5Hern0deM9PPOxUft4riaEY-tdfcSjcuPDFQztRpbW-HGmBggPqvyr5LU1Q6gY5NuTJbE" />
              </div>
              <h4 className="font-bold text-sm dark:text-white">Free stock image of the week</h4>
              <p className="text-xs text-gray-500 mb-2">By Shift Drive</p>
              <a className="text-blue-500 text-xs font-semibold hover:underline" href="#">Download</a>
            </div>
            <div className="bg-white dark:bg-surface-dark p-4 rounded-lg shadow-sm">
              <div className="rounded overflow-hidden mb-4 h-40">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKxwV8OI8bV_1d3Y-viOcResbllz-hJVx8PYwVvAg41wPAEy4a-txWnz26VtjLeZhHlafwWlt_VzWgnMimNNoFCaXy7hu1QGumaYGKPLe-iJ6OwgsCa98jEHGCJqMpYDo2KXd8s88Awb4tFjEZ4k3m-4c0iJQGKTLxP31YUpSiJ2Z976gr_ztIZjgm_kwAB2ZXCw5noQC22O6rWk4YGtZSM8gR3LwYC45OXtlwSoCm1b5ebfQrnudtBgsY9eX15dt1l80SR2Er-rE" />
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
                <li><a className="hover:text-white transition" href="#">About us</a></li>
                <li><a className="hover:text-white transition" href="#">Careers</a></li>
                <li><a className="hover:text-white transition" href="#">Press/Media</a></li>
                <li><a className="hover:text-white transition" href="#">Investor relations</a></li>
                <li><a className="hover:text-white transition" href="#">Shutterstock blog</a></li>
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

      {isUploadOpen && <UploadModal onClose={() => setIsUploadOpen(false)} />}
    </div>
  );
}
