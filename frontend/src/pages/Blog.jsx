import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { trackPageView } from '../utils/analytics';
import { useNavigate } from 'react-router-dom';

export default function Blog({ onLoginClick }) {
  const navigate = useNavigate();
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    trackPageView('/blog');
    document.title = selectedBlog ? `${selectedBlog.title} — MediaMatrix` : 'Blog — MediaMatrix';
  }, [selectedBlog]);

  const blogs = [
    {
      id: 1,
      title: "The Future of AI-Generated Images in Marketing",
      category: "AI Technology",
      date: "May 5, 2026",
      author: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
      excerpt: "Explore how generative AI is transforming the way brands create visual content and what it means for the future of creative workflows.",
      content: "Generative AI is no longer a futuristic concept; it is a present-day reality that is fundamentally reshaping the marketing landscape. Brands are now leveraging advanced models to generate high-quality, hyper-realistic images in seconds, significantly reducing the time and cost associated with traditional photo shoots.\n\nThis shift allows marketing teams to iterate rapidly, testing multiple visual concepts for ad campaigns without breaking the budget. For example, a single product can be seamlessly placed into dozens of different environments—from a sunlit beach to a futuristic cyberpunk cityscape—in a matter of minutes.\n\nHowever, this new power comes with its own set of challenges, including maintaining brand consistency and navigating the complex web of copyright and licensing. As we move further into 2026, the brands that succeed will be those that learn to seamlessly integrate AI tools into their existing creative workflows, using them not as a replacement for human creativity, but as a powerful amplifier."
    },
    {
      id: 2,
      title: "Mastering the Dark Theme Aesthetic",
      category: "Design Trends",
      date: "May 2, 2026",
      author: "David Chen",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80",
      excerpt: "Dark mode isn't just a trend—it's a fundamental shift in UI design. Learn the principles of creating high-contrast, beautiful dark interfaces.",
      content: "Designing for dark mode requires more than simply inverting colors. It demands a nuanced understanding of contrast, depth, and visual hierarchy. When executed correctly, a dark theme can reduce eye strain, conserve battery life on OLED screens, and create a sleek, premium feel that users absolutely love.\n\nOne of the most common mistakes designers make is using pure black (#000000) for backgrounds. Instead, opting for deep grays (like #111111 or #1A1A1A) provides a softer baseline that allows for subtle shadows and elevation cues. Furthermore, text should rarely be pure white; a slightly dimmed white or light gray ensures readability without causing harsh glare.\n\nBy mastering these subtle balances and utilizing vibrant accent colors (like our signature MediaMatrix red), designers can create dark interfaces that are both aesthetically stunning and highly functional."
    },
    {
      id: 3,
      title: "Top 10 Stock Photography Trends for 2026",
      category: "Photography",
      date: "April 28, 2026",
      author: "Elena Rodriguez",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80",
      excerpt: "From authentic, candid moments to hyper-realistic AI compositions, discover the visuals that are dominating the digital landscape this year.",
      content: "The world of stock photography is evolving faster than ever. As audiences become increasingly sophisticated, they are rejecting staged, inauthentic imagery in favor of visuals that feel raw, genuine, and representative of the real world.\n\nTrend #1: Unfiltered Authenticity. Brands are looking for images shot on smartphones or with a documentary style that captures real people in real situations. The glossy, perfectly lit studio shots of the 2010s are officially out.\n\nTrend #2: Sustainability Visualized. With climate change at the forefront of global consciousness, imagery depicting eco-friendly practices, renewable energy, and sustainable living is in unprecedented demand.\n\nTrend #3: The AI-Human Collaboration. Rather than replacing photographers, AI is being used to enhance their work—generating impossible backgrounds or expanding the canvas of traditional photographs. Understanding these trends is critical for both creators looking to sell their work and marketers looking to engage their audiences."
    },
    {
      id: 4,
      title: "Understanding Image Licensing and Rights",
      category: "Business",
      date: "April 15, 2026",
      author: "Marcus Thorne",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80",
      excerpt: "A comprehensive guide to royalty-free, editorial, and commercial image licensing to keep your projects legally safe.",
      content: "Navigating the world of image licensing can be a minefield for the uninitiated. A single mistake—using an editorial image for a commercial ad, or failing to secure a model release—can result in devastating legal and financial consequences.\n\nRoyalty-Free (RF) is the most common license type you will encounter on platforms like MediaMatrix. It means that once you purchase the license, you can use the image multiple times across various projects without paying additional royalties. However, it does not mean the image is free, nor does it grant you exclusive rights.\n\nEditorial Use Only means the image cannot be used to sell or promote a product, service, or concept. These images are strictly for news, reporting, or educational purposes. Understanding the nuances of these licenses ensures that your creative projects are not only beautiful but legally bulletproof."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#111111] text-white">
      <Navbar onLoginClick={onLoginClick} />
      
      {selectedBlog ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
          <button onClick={() => setSelectedBlog(null)} className="flex items-center text-gray-400 hover:text-white transition mb-8 group">
            <span className="material-icons-outlined mr-2 group-hover:-translate-x-1 transition-transform">arrow_back</span>
            Back to all articles
          </button>
          
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary/20 text-primary px-3 py-1 text-xs font-bold uppercase tracking-wider rounded">
                {selectedBlog.category}
              </span>
              <span className="text-gray-500 text-sm font-medium">{selectedBlog.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{selectedBlog.title}</h1>
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                {selectedBlog.author.charAt(0)}
              </div>
              <span>Written by <strong className="text-white">{selectedBlog.author}</strong></span>
            </div>
          </div>

          <div className="w-full h-80 md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-2xl">
            <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-invert prose-lg max-w-none text-gray-300">
            {selectedBlog.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">{paragraph}</p>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800 text-center">
            <h3 className="text-xl font-bold mb-4">Enjoyed this article?</h3>
            <div className="flex justify-center gap-4">
              <button className="bg-[#1A1A1A] hover:bg-gray-800 border border-gray-700 px-6 py-2 rounded-full transition flex items-center gap-2">
                <span className="material-icons-outlined text-sm">share</span> Share
              </button>
              <button onClick={() => setSelectedBlog(null)} className="bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-full transition">
                Read more articles
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">MediaMatrix Blog</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Insights, inspiration, and trends from the world of creative visual content and artificial intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {blogs.map(blog => (
              <article key={blog.id} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl overflow-hidden hover:border-primary/50 transition group cursor-pointer" onClick={() => setSelectedBlog(blog)}>
                <div className="h-64 overflow-hidden relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-bold uppercase tracking-wider rounded text-white">
                    {blog.category}
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-sm text-primary font-bold mb-2">{blog.date}</div>
                  <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition">{blog.title}</h2>
                  <p className="text-gray-400 leading-relaxed mb-6">{blog.excerpt}</p>
                  <div className="text-sm font-bold text-white border-b border-white inline-block pb-1 group-hover:text-primary group-hover:border-primary transition">
                    Read article
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      <footer className="bg-background-dark text-gray-400 text-xs py-12 border-t border-gray-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <img src="/image.png" alt="MediaMatrix Logo" className="h-8 object-contain mx-auto mb-4" />
          <p className="mb-4">© 2003-2026 MediaMatrix, Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
