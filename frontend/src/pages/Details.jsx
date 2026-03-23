import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; export default function Details() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full min-h-screen bg-white">

      <nav className="border-b border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark sticky top-0 z-50">
        <div className="bg-black text-white text-xs py-2 text-center font-medium">
          Get 10 royalty-free image downloads each month with a cost-saving subscription. <a className="underline text-white ml-2" href="#">Buy now</a>
        </div>
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-2xl font-bold text-primary tracking-tighter flex items-center gap-1">
              <span className="material-icons-outlined text-3xl">shutter_speed</span> shutterstock
            </Link>
            <div className="hidden lg:flex items-center gap-6 text-sm font-medium text-text-main-light dark:text-text-main-dark">
              <a className="hover:text-primary transition" href="#">Images</a>
              <a className="hover:text-primary transition" href="#">Video</a>
              <a className="hover:text-primary transition" href="#">Music</a>
              <a className="hover:text-primary transition" href="#">Editorial</a>
              <a className="hover:text-primary transition" href="#">3D</a>
            </div>
          </div>
          <div className="flex-1 max-w-xl mx-8 hidden md:block">
            <div className="relative">
              <input className="w-full h-10 pl-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-surface-light dark:bg-surface-dark text-sm focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Search for images, videos, music..." type="text" />
              <button className="absolute right-2 top-1.5 text-text-muted-light dark:text-text-muted-dark hover:text-primary">
                <span className="material-icons-outlined text-xl">search</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <button className="flex items-center gap-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary">
              <span className="material-icons-outlined">favorite_border</span>
            </button>
            <button className="flex items-center gap-1 text-text-muted-light dark:text-text-muted-dark hover:text-primary">
              <span className="material-icons-outlined">shopping_cart</span>
            </button>
            <Link to="/login" className="border border-text-main-light dark:border-gray-500 rounded px-4 py-1.5 hover:bg-surface-light dark:hover:bg-surface-dark transition">Log in</Link>
            <Link to="/subscription" className="bg-primary text-white rounded px-4 py-1.5 hover:bg-red-700 transition">Sign up</Link>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 text-sm text-text-muted-light dark:text-text-muted-dark">
          <div className="flex items-center gap-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/search" className="hover:underline">Photos</Link>
            <span>/</span>
            <a className="hover:underline" href="#">Nature</a>
            <span>/</span>
            <span className="text-text-main-light dark:text-text-white truncate max-w-xs">Aerial view of autumn forest landscape</span>
          </div>
          <div className="mt-2 sm:mt-0 font-mono text-xs">ID: 194827365</div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-2 sm:p-4 border border-border-light dark:border-border-dark flex items-center justify-center min-h-[500px] relative group overflow-hidden">
              <img alt="Aerial view of autumn forest with vibrant orange and red trees along a winding river" className="max-h-[700px] w-auto h-auto object-contain rounded shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPGHXqKPnLaM0Wr9xzP7OGr_VpkFkoj18q6QpxogHZNzTqSGNPXE5-iqMBJMcyHCLsgtjPr0cnVZXXWMnn-tHKHxLrTTPd9o1f1jUyPApTRW41fP9_SXDvksFW6MZa6QDYdHkJ31Tc5mvFf__-lwvpTgAgcQ8Y08pZIfrudqp7cD2RvKeBVxMgZO1-4L7rOf5iN0yvcyiQkvsQZYlKD6643rybDPjkA-gs2dCUUKRSGPXwGB6jrTdbsFGEoH1GYRRKL9y-B39YZwY" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 select-none">
                <div className="grid grid-cols-3 gap-12 rotate-[-15deg]">
                  <span className="text-4xl font-bold text-white/50">shutterstock</span>
                  <span className="text-4xl font-bold text-white/50">shutterstock</span>
                  <span className="text-4xl font-bold text-white/50">shutterstock</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button className="bg-black/70 hover:bg-black text-white p-2 rounded-full backdrop-blur-sm transition">
                  <span className="material-icons-outlined text-sm">crop_free</span>
                </button>
                <button className="bg-black/70 hover:bg-black text-white p-2 rounded-full backdrop-blur-sm transition">
                  <span className="material-icons-outlined text-sm">share</span>
                </button>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between border-b border-border-light dark:border-border-dark pb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                  A
                </div>
                <div>
                  <h3 className="font-semibold text-text-main-light dark:text-text-main-dark">AzureSkies Media</h3>
                  <button className="text-primary text-sm font-medium hover:underline">Follow</button>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-sm text-text-muted-light dark:text-text-muted-dark hover:text-primary transition">
                  <span className="material-icons-outlined text-lg">collections</span>
                  See portfolio
                </button>
              </div>
            </div>
            <div className="py-6">
              <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-2">Aerial view of autumn forest landscape with winding river</h1>
              <p className="text-text-muted-light dark:text-text-muted-dark leading-relaxed">
                Stunning drone shot capturing the vibrant colors of fall foliage in a dense forest, with a serene river curving through the landscape. High resolution nature photography suitable for backgrounds and editorial use.
              </p>
            </div>
          </div>
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-text-main-light dark:text-text-main-dark">Purchase this image</h2>
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded dark:bg-green-900 dark:text-green-200">Royalty-free</span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex border-b border-border-light dark:border-border-dark mb-4">
                  <button className="pb-2 border-b-2 border-primary font-medium text-text-main-light dark:text-text-main-dark text-sm px-4">Standard License</button>
                  <button className="pb-2 text-text-muted-light dark:text-text-muted-dark hover:text-text-main-light dark:hover:text-text-main-dark text-sm px-4 transition">Enhanced License</button>
                </div>
                <label className="flex items-center justify-between p-3 border border-border-light dark:border-border-dark rounded cursor-pointer bg-background-light dark:bg-background-dark hover:border-primary dark:hover:border-primary transition group">
                  <div className="flex items-center gap-3">
                    <input className="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="size" type="radio" />
                    <div>
                      <div className="font-semibold text-sm">Small</div>
                      <div className="text-xs text-text-muted-light dark:text-text-muted-dark">500 x 334 px • 72 dpi</div>
                    </div>
                  </div>
                  <div className="font-bold text-text-main-light dark:text-text-main-dark">$29</div>
                </label>
                <label className="flex items-center justify-between p-3 border border-border-light dark:border-border-dark rounded cursor-pointer bg-background-light dark:bg-background-dark hover:border-primary dark:hover:border-primary transition group">
                  <div className="flex items-center gap-3">
                    <input className="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="size" type="radio" />
                    <div>
                      <div className="font-semibold text-sm">Medium</div>
                      <div className="text-xs text-text-muted-light dark:text-text-muted-dark">1000 x 667 px • 300 dpi</div>
                    </div>
                  </div>
                  <div className="font-bold text-text-main-light dark:text-text-main-dark">$49</div>
                </label>
                <label className="flex items-center justify-between p-3 border-2 border-primary rounded cursor-pointer bg-red-50 dark:bg-red-900/10 transition group">
                  <div className="flex items-center gap-3">
                    <input checked="" className="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="size" type="radio" />
                    <div>
                      <div className="font-semibold text-sm">Large</div>
                      <div className="text-xs text-text-muted-light dark:text-text-muted-dark">4000 x 2668 px • 300 dpi</div>
                    </div>
                  </div>
                  <div className="font-bold text-text-main-light dark:text-text-main-dark">$79</div>
                </label>
                <label className="flex items-center justify-between p-3 border border-border-light dark:border-border-dark rounded cursor-pointer bg-background-light dark:bg-background-dark hover:border-primary dark:hover:border-primary transition group">
                  <div className="flex items-center gap-3">
                    <input className="w-4 h-4 text-primary focus:ring-primary border-gray-300" name="size" type="radio" />
                    <div>
                      <div className="font-semibold text-sm">Vector (EPS)</div>
                      <div className="text-xs text-text-muted-light dark:text-text-muted-dark">Scalable to any size</div>
                    </div>
                  </div>
                  <div className="font-bold text-text-main-light dark:text-text-main-dark">$99</div>
                </label>
              </div>
              <div className="space-y-3">
                <button onClick={() => navigate('/login')} className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 px-4 rounded shadow-sm transition flex items-center justify-center gap-2">
                  <span className="material-icons-outlined text-lg">download</span>
                  Download for $79
                </button>
                <p className="text-xs text-center text-text-muted-light dark:text-text-muted-dark">
                  Or <Link to="/subscription" className="text-primary hover:underline">subscribe &amp; save</Link> up to 60%
                </p>
                <button className="w-full border border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark text-text-main-light dark:text-text-main-dark font-medium py-2 px-4 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition flex items-center justify-center gap-2 text-sm">
                  <span className="material-icons-outlined text-lg">edit</span>
                  Edit this image
                </button>
              </div>
              <div className="mt-8 pt-6 border-t border-border-light dark:border-border-dark text-sm">
                <h4 className="font-bold mb-3">Image Details</h4>
                <div className="grid grid-cols-2 gap-y-2 text-text-muted-light dark:text-text-muted-dark">
                  <div>Stock Photo ID</div>
                  <div className="text-text-main-light dark:text-text-main-dark text-right">194827365</div>
                  <div>Date Uploaded</div>
                  <div className="text-text-main-light dark:text-text-main-dark text-right">Oct 24, 2023</div>
                  <div>Category</div>
                  <div className="text-text-main-light dark:text-text-main-dark text-right">Nature</div>
                  <div>Release Info</div>
                  <div className="text-text-main-light dark:text-text-main-dark text-right">Property release</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <h3 className="text-lg font-bold mb-4 text-text-main-light dark:text-text-main-dark">Keywords</h3>
          <div className="flex flex-wrap gap-2">
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Nature</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Landscape</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Autumn</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Forest</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Trees</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">River</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Aerial</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Drone</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Orange</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Scenery</a>
            <a className="px-3 py-1.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition" href="#">Wilderness</a>
            <a className="text-primary text-sm font-medium flex items-center px-2 hover:underline" href="#">Show more...</a>
          </div>
        </div>
        <div className="mt-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">Similar images</h2>
            <a className="text-primary font-medium text-sm hover:underline" href="#">See all</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Autumn forest detail" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzRu_-DtCbEJkXtO_tE6D6TYbKiwqyx-0mO_tefV0LDQqlldVi_6QHnM5Nl-xfUZl0_7yd6r5UIRqyCjgN4fah4zuDLvSxY3FDnfGczEa0wTZlNM_XkrHY-TSw7V7VqtyXs2MfngpVSj4P2T16b6x66f2fFKaLONb7P55Cst6y_tmNAzdB9PZoRyiLGHcJjrWK_KHat2TRj7UYM0G3lpVEglFhSIsForQ8X-hk6lLcIEIYmU6lPh7bzOqrk1q3G3OVNDAeBYGt66k" />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-xs font-medium">Forest detail</span>
              </div>
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Tree from below" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_L2Hu23IfNh_D2rZ9Vbhp8Gi32Namr0SLdQJOn1krquSTficTTzC8Np3um3rKqG7XJ8pEqOOf-VeVAjebBtwu3qjcmCKz22TuGWSwpJtrsjn8TI34rUkVNnzKIQVOFwqbYesC-qfSJ9XoArLubof55GUyJuYjUK-O5tGvPBtJCbVMkeTgEim1yQvSmCnw3gRsq4j5vbYjbcGRbSjlCoxiPlQnRxsvwEfnED8qMc9L7c-CT-Ce4qj0U71eI4vTh7vDxo8TtDDpOXo" />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-xs font-medium">Tree canopy</span>
              </div>
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Switzerland mountains" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8iS9vLw2OnLjog3fZNWMbNSFwqnSQ9AK-PJdNtr0t8iJEaD2k181PvjPruiyg-TvAmxB3xNQAAKsQEPcXS-kvX2URZ8CglZNaJtMHSS7rNnYgi4UcbiTolmTi5JHcaFTG4Rn-PeFPnyU2nDglKdXJ8OnNC-NGC206iHzPmr8sNTFgKn464sqcn1AiIcazDcTcn114_2LD2rPObXnGo1wR1pGBv86xTpfmTBDsEt5FBFbF_a4gFmIte--M677kAZWd0wlaF6TSyNA" />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-xs font-medium">Mountain lake</span>
              </div>
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Road through woods" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXdVQ9BwyOmodYNCZRDI3pobzFB2SOcRYshF5zYTX2HGf7XdBPmykW4D8xwJSYWJdny8FeIMTRZ5z5dJBiziXXU32SAcZO9WFTXShTHXSNOJKKRFSRoVBYZXS5rAZxkIpsPgE9yc09ALOxgn-qaG7JSKG11gH8RGKdhAxAylFyaw3dLCnHop_ZQMuuK_0c2Rwo_nQwcQgjyh9Z6juXErsdHe6fKhYZ5Uy01dMv7nVfr3YgS_TJu7loFEFsruEyeFc4vcEBpNZ8X6A" />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-xs font-medium">Forest road</span>
              </div>
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Autumn leaf closeup" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOgEDF78aSQ7J8z95zoiEPVu1KQ1fMCkjt5t-jqbX0oKdX4gdXDvP0mw-l7Z_tJv2WOaDweqmOnZGlu-00FCkb-9xyyBoR-Sk5TF_I5nph0GoDv_mq4uSj-uTGtG23LT1mty2e7wDyal01_Es9U95KwT2FpovIjOjO_XzCQpa4IIJRzpsgcZQYRJ_yp_a2FYmsaossYkUUKp53IVkcOM_J6Np2yYyeL4YF8K9_FFVLHAjikDOZU62vUmhdqC7UVLJfm6SUrrRIvuY" />
              <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-xs font-medium">Leaf macro</span>
              </div>
            </a>
          </div>
        </div>
        <div className="mt-12 mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-main-light dark:text-text-main-dark">More from this contributor</h2>
            <a className="text-primary font-medium text-sm hover:underline" href="#">See all</a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Hiker on mountain" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWFdwYR17-MxSy7uhI36kgtrMgcUWdiZAWQDT74w3jDL4lPM27sRnfM2Hfnmx2sdep5puobO4WoSCfG7T2hCzDcOKTh9WvOIGrg1r5ackCZJMOmIS09eUir-HDHjVOVd-SO2zrDfrDq_lExvGELutSHMdFk3zuDyYFnx5LilAOZwH5qqqYe1dyShVL7aQDT8OUjRKfqdEugToCM-oH0XPls6pS3SbWfhGaFlHlk-KJJpNIWvtyEkz3EqVDfpl9y8X-F8sLBl1xqxw" />
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Mountain range" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtZeUt_tgvBuGcEZKgFVTbK_z_vMoCYwkZ-4ana14R7o3RkQsy1mCrbWTkf1NdpVoGbvciX1BmRsw8XPBG3iATrmi3WSnWglVWr-uQEpRTi9l7rrpS1Z7d9JGBxgiG3fLS73yn7GpZ9KXEyXAJg_lGI4_hLGDJW1cho0tUv0MRi2OM6fJ5ro9wrLTfLJ1cPkYS6xVBwO5TyV41m5cLQfY2VG-_Oafi9dwxLiv0iXPw6TNDucu-VCMOzMtdeNN9KyznLPmOPxn1OxI" />
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Foggy mountain" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFKjpyUZVuLC3qGpRx1E-viRkg27N17fPBiBl-rWGm_06wYRRLrlrGhN1Xj2rofmrP9ChxzuRjfQjz8zvhrH0vKUGm4lOvDltBP6Hd7Auy55k1JrolvwygM8Vlj9WW_JdJWhN55qg71xisHTcua6mXFiiDCtFq3gem-vPozR-vRiuzi2lisSIdQpgFlk3uyXpakeUbpBC9PJJkNtVBiZ8gQ2tyO90FAHEZrx3qw28NokH8mn_V-_IDGDE7jpII-GZMchfIqx_HA7A" />
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Snowy peaks" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3alJViC5UzpNZTT_fcabVDvUIscr5GKsR2SUYKLLkPN-WqIdctmvCkScau9Iqh6F6b9DON18Cvdg-RzouyleQfafmcmFLjzeqcrZ3OFbEcrXYX1pbSyIDBvY5Ys4Og-gw9xHIzTOYTqj7sj7ff07fsQPgfJdlA-zk-icd-BIyKkUTP7yPyPycucxgUo2GLKCtSU5019k6msEvwL_cNlmMpMi5G5WSQ_VCSE-8Jalwcn5A5OliOYMP6KPXnSz7oxRk3Rj593LNg3Q" />
            </a>
            <a className="group relative block overflow-hidden rounded" href="#">
              <img alt="Valley view" className="w-full h-40 object-cover transform group-hover:scale-105 transition duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBN_TdNOaccERAoXRe_a-UdRKpDyKqQG57yVNOO7IzgVSwyp5ZsO3_UhP_ILnJRJ_lAzJ2IMKi16JRCvxbVGMls1Wg775ETvC_rnAjpjULla5j-yy25xoDjy7qSDaTa5XJZhC6_PAeNIp-i_4T70Bh0r-J_8zFlbWX3uzli-ZcRik1_xC-Fy3cnC6yaOsy7Ami9c_oSnv8LhP-QvUHROXvbeVzMDTgXOp1F7AUQKWDLugIdfjx4vh1D926-RuKOTW7opjc0MZcxX-Q" />
            </a>
          </div>
        </div>
      </main>
      <footer className="bg-surface-dark text-white py-12 mt-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Our Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a className="hover:text-white" href="#">About us</a></li>
                <li><a className="hover:text-white" href="#">Careers</a></li>
                <li><a className="hover:text-white" href="#">Press/Media</a></li>
                <li><a className="hover:text-white" href="#">Investor relations</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Apps</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a className="hover:text-white" href="#">iPhone app</a></li>
                <li><a className="hover:text-white" href="#">Android app</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Partner</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a className="hover:text-white" href="#">Sell your content</a></li>
                <li><a className="hover:text-white" href="#">Affiliate/Reseller</a></li>
                <li><a className="hover:text-white" href="#">Developers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a className="hover:text-white" href="#">Terms of use</a></li>
                <li><a className="hover:text-white" href="#">Privacy policy</a></li>
                <li><a className="hover:text-white" href="#">License agreement</a></li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="mb-4">
                <span className="material-icons-outlined text-3xl text-primary">shutter_speed</span>
                <span className="font-bold text-xl ml-1">shutterstock</span>
              </div>
              <div className="flex gap-4">
                <a className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600" href="#">X</a>
                <a className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600" href="#">f</a>
                <a className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-gray-600" href="#">in</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between text-xs text-gray-500">
            <p>© 2003-2024 Shutterstock, Inc. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a className="hover:text-white" href="#">English</a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}
