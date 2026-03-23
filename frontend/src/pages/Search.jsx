import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; export default function Search() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full min-h-screen bg-white">

      <header className="sticky top-0 z-50 bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-primary font-bold text-2xl tracking-tighter">shutter<span className="text-text-main-light dark:text-white">stock</span></span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-text-sub-light dark:text-text-sub-dark">
              <a className="hover:text-primary transition-colors" href="#">Images</a>
              <a className="hover:text-primary transition-colors" href="#">Video</a>
              <a className="hover:text-primary transition-colors" href="#">Music</a>
              <a className="hover:text-primary transition-colors" href="#">Editorial</a>
              <a className="hover:text-primary transition-colors" href="#">AI Generator</a>
            </nav>
          </div>
          <div className="flex-1 max-w-2xl hidden md:flex">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-icons text-text-sub-light dark:text-text-sub-dark text-xl">search</span>
              </div>
              <input className="block w-full pl-10 pr-3 py-2.5 border border-border-light dark:border-border-dark rounded-full leading-5 bg-surface-light dark:bg-surface-dark placeholder-text-sub-light dark:placeholder-text-sub-dark focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm transition-all shadow-sm" placeholder="Search for images, vectors, videos..." type="text" />
              <button className="absolute inset-y-0 right-0 pr-1 flex items-center">
                <span className="bg-primary text-white p-1.5 rounded-full mr-1 hover:bg-red-600 transition-colors">
                  <span className="material-icons text-sm">arrow_forward</span>
                </span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary">
              <span className="material-icons">favorite_border</span>
            </button>
            <button className="text-text-sub-light dark:text-text-sub-dark hover:text-primary dark:hover:text-primary">
              <span className="material-icons">shopping_cart</span>
            </button>
            <Link to="/login" className="text-sm font-medium px-4 py-2 border border-border-light dark:border-border-dark rounded-full hover:bg-surface-light dark:hover:bg-surface-dark transition-colors">
              Log in
            </Link>
            <Link to="/subscription" className="text-sm font-medium px-4 py-2 bg-primary text-white rounded-full hover:bg-red-600 shadow-md transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </header>
      <div className="bg-background-light dark:bg-background-dark border-b border-border-light dark:border-border-dark py-3">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-text-main-light dark:text-text-main-dark">"Winter Landscape"</h1>
            <span className="text-sm text-text-sub-light dark:text-text-sub-dark">342,891 results</span>
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
              <label className="flex items-center gap-2 cursor-pointer group">
                <input checked="" className="rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark" type="checkbox" />
                <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">All Images</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark" type="checkbox" />
                <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">Photos</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark" type="checkbox" />
                <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">Vectors</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark" type="checkbox" />
                <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">Illustrations</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="rounded border-border-light dark:border-border-dark text-primary focus:ring-primary bg-surface-light dark:bg-surface-dark" type="checkbox" />
                <span className="text-sm text-text-sub-light dark:text-text-sub-dark group-hover:text-text-main-light dark:group-hover:text-text-main-dark transition-colors">3D Objects</span>
              </label>
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
        <div className="flex-1">
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
            <div onClick={() => navigate('/details')} className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer">
              <img alt="Dogs running in snow" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf_x-E-SegDSJGvvURd4Tfmc3Zh-rA9gNomBZhUdbEpC8xQFr2Db9Yxd0AQeZKxwgnQfA5nSKPZ-2Ry5w4FThdwN5eFXykr28UiFPa-eauOIkf0E0JY3Sy0wr9Dj8cuB-rvi2UN7lolBGO5ivxUZ0OrELw0YGUEZ7Zzlmoi5adgmVf11vAKu_s7oU1HnKzb1iJ0SpfqSo9bsxecwxtMIQ7zYVr-zJcyzYzZVtvNKWaB3xGwI1RUtKnFdVpoAX_w5v73F9vQoH_kk0" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors" title="Save to collection">
                    <span className="material-icons text-xl">favorite_border</span>
                  </button>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors" title="Add to cart">
                    <span className="material-icons text-xl">add_shopping_cart</span>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[70%] drop-shadow-md">
                    <p>Dogs Running Snow</p>
                    <p className="opacity-80 font-normal">By PetPhotog</p>
                  </div>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-sm transition-colors">
                    <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">file_download</span>
                  </button>
                </div>
              </div>
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                <span className="material-icons text-[10px] align-middle mr-0.5">photo_camera</span> Photo
              </div>
            </div>
            <div onClick={() => navigate('/details')} className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer">
              <img alt="Winter mountains landscape" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf8l7iJrfQwJmx4w7harKIQN8KAhxo8hxwV5vTVX0DoFKo0IF3hEquyfzweqp_n9fNEeDdQgqvtKKYj9Ixe0p0kH5KP1YuYXU4PH8JGA1Q9drVWv-ERZh2Bz16cuN2AXgS9tz1UYKhxbXy2LMuT9RKkyjAZsMPqTGFFCfKlnsp60MtSOtr5Q4cm1P_tsxZXwZpTt5TbfIlutRO0uulY-7p3OKGO3yBE8Za5oEEi0SESaIeG9MW9ok9diru7USIlZZgVpSKEaFWzjE" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">favorite_border</span>
                  </button>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">add_shopping_cart</span>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[70%] drop-shadow-md">
                    <p>Snowy Mountain Peak</p>
                    <p className="opacity-80 font-normal">By NatureRaw</p>
                  </div>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-sm transition-colors">
                    <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">file_download</span>
                  </button>
                </div>
              </div>
            </div>
            <div onClick={() => navigate('/details')} className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer">
              <img alt="Skiing downhill" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9_dl6V3gQbcqT0MWKWjVmTcgWOYYlfd7fw6UTaCZiiqEhTkywo59Ev2XFc240zmXWiZQxWEJe7z_E_q_HkX5wd0kNkKgMUCdtDGcvxPYmAXwGUCAYVlQlPzsYH7VPAVt-UUEPncFJoBOAl04iCeBhdWRsUHamAipvnT1mObmHxFAMjZlriZyNzcaV-7VR8JWy6L89_fP_XQf1REl3fjib6wcEYj9L9dfcl-QaCtGphxinh3vzfYDYp4mbEywYJB0gMRDMBObhvcg" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm flex items-center">
                <span className="material-icons text-[10px] align-middle mr-0.5">videocam</span> 4K
              </div>
              <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                00:15
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <button className="bg-white/20 backdrop-blur-sm p-4 rounded-full hover:bg-white/30 transition-colors">
                  <span className="material-icons text-white text-4xl">play_arrow</span>
                </button>
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[60%] drop-shadow-md">
                    <p>Skier Downhill Fast</p>
                    <p className="opacity-80 font-normal">By ActionCam</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-lg shadow-sm transition-colors">
                      <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">favorite_border</span>
                    </button>
                    <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-lg shadow-sm transition-colors">
                      <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div onClick={() => navigate('/details')} className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 cursor-pointer">
              <img alt="Woman drinking coffee in winter" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzt_QCBngrxMnnX5XBIbl16Ww0A1eLGk1QiRngqAnGv-oaXvFzDt12maRH_9Zrg-V5-OKEQJojWuoCa0JpQXEFdaa0TtClF0R_V6GBysng3kL-w_l7dBRzs-LmBrvDRq_9fbCjL_j5EfdvCMh9tpUfHN0ZUsJFOGW0iuHEIFYZTIEXH03ux-Hm2DP6yc-nMlcKBXLZvSE9F0b4OPAb7WKztSRL_GpNqWU9zeixJxMnjxfnNt8i2i5PrYJxKa8fckgIf9ZhiB03Dx0" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">favorite_border</span>
                  </button>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">add_shopping_cart</span>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[70%] drop-shadow-md">
                    <p>Winter Coffee Cozy</p>
                    <p className="opacity-80 font-normal">By LifestylePix</p>
                  </div>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-sm transition-colors">
                    <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">file_download</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img alt="Abstract ice texture" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCydS25P_qcHdYGyUuqADjH1YfiMQ7g4R9JZXF_3tDpRKjJ4dbCcs-Uf4E6uDTGbwDl0BZ92Nr87cgfHrBHGDpccDP1bbcxjUJfTbsKwottUjkHBBIeH58Qa9c8lcza_1rukT8d8lsVDE1F6yCq29GxvKG2mcikja2rMctfmRNoCP-rZ0E7_ZZQbcyQ3UhRj2cYj1K7UpJPSIES-jPvNNUsp0hZDYI-KgJ0K1-ZnBiGPz6VSE0GeNlxGxRa5v6_nEBohZab6qoANCc" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">favorite_border</span>
                  </button>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">add_shopping_cart</span>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[70%] drop-shadow-md">
                    <p>Ice Texture Blue</p>
                    <p className="opacity-80 font-normal">By TextureLabs</p>
                  </div>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-sm transition-colors">
                    <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">file_download</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img alt="Snowy pine trees from above" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOhnQNMMYKbyU0JLlQ1RUv3wV_S3VCDVAFizSXwToPD5ZkCqSD3Ulc2O40F4vf1TfmW4r6MfydytymscUt5MoIzYwALKofxxG9ENE6ECq2R0CPQRt9Jh9at4PzyDniz3j7poM54mnZCM3BqHnSSeKHH86rTk9dNmXMd0sLrvWGbVtcgIZ0FNqfRCbrOvNKuFBYflGZ5FTUolhCrmBc7u5dHtq7RHixZ_w5fe3p0hXZfuU3vxDiPfhdcmDG8zYPw0uoznBWttYo4SU" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">favorite_border</span>
                  </button>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">add_shopping_cart</span>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[70%] drop-shadow-md">
                    <p>Aerial Pine Forest</p>
                    <p className="opacity-80 font-normal">By DroneViews</p>
                  </div>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-sm transition-colors">
                    <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">file_download</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img alt="Couple walking in winter forest" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtFjzVakEt1Jw8R3c1oYZiZIF-dowxMfUToiFCvYhrnk_47EQsPjVLyKZTcJYvW3bIM5ZuxaZp_F_lg_ju5S1sEJzd0zEhg0wIfwMidKtwWK9i87JKX5d2CbrB4ynQPFgNmOhJI2OCPnLMPiPxRDY5anCtNOr6NYfGrLHLwtdHScboBmfozF9LMmyENjWvxLkrGl8t-w67rvp_ZhGkNoQMoXtj1uPB5nVS-HY6GaItndPN3VQ-PLkgwr9NYTqRdepQFSl14aR0TkE" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">favorite_border</span>
                  </button>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">add_shopping_cart</span>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[70%] drop-shadow-md">
                    <p>Couple Winter Walk</p>
                    <p className="opacity-80 font-normal">By AuthenticLife</p>
                  </div>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-sm transition-colors">
                    <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">file_download</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="masonry-item relative group rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img alt="Abstract blue and white shapes" className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuARQu9utucBXMzjo5wfdqLJLd-o8HEFallAZ0agRt4pHohRn24dSy1pf79KhaYt3FKYcJzrb8NdI57DmvY6K_RKl5oXS0ghhpvM2-yK08WABQwDEIdjMS3b_ZzrdFAIXrWdaUuyh6ONa1S7-AXPeVqi-7Nytrwj-nN3nmJl8p6OX4Lb6wERn0mODwqt0ZAyhYTwh4RmfRktFGbyJehrPC-cZPyCX7p_EB09kg23D6SfmE-rl0oc41GSdWVaxNcyQwYCv7fVbsYdqVw" />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded backdrop-blur-sm">
                <span className="material-icons text-[10px] align-middle mr-0.5">gesture</span> Vector
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3">
                <div className="flex justify-end gap-2">
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">favorite_border</span>
                  </button>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black text-text-main-light dark:text-text-main-dark p-2 rounded-lg shadow-sm transition-colors">
                    <span className="material-icons text-xl">add_shopping_cart</span>
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-white text-xs font-medium truncate max-w-[70%] drop-shadow-md">
                    <p>Abstract Winter Flow</p>
                    <p className="opacity-80 font-normal">By VectorArt</p>
                  </div>
                  <button className="bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black p-2 rounded-full shadow-sm transition-colors">
                    <span className="material-icons text-xl text-text-main-light dark:text-text-main-dark">file_download</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-12 mb-8">
            <nav className="flex items-center gap-2">
              <a className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-sub-light dark:text-text-sub-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors disabled:opacity-50" href="#">
                <span className="material-icons text-base">arrow_back</span>
              </a>
              <a className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-medium" href="#">1</a>
              <a className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors" href="#">2</a>
              <a className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors" href="#">3</a>
              <span className="text-text-sub-light dark:text-text-sub-dark px-2">...</span>
              <a className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-main-light dark:text-text-main-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors" href="#">15</a>
              <a className="w-10 h-10 flex items-center justify-center rounded-lg border border-border-light dark:border-border-dark text-text-sub-light dark:text-text-sub-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors" href="#">
                <span className="material-icons text-base">arrow_forward</span>
              </a>
            </nav>
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
