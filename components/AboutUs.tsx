
import React from 'react';
import { MOCK_AUTHORS } from '../constants';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-black text-gray-900 dark:text-white mb-6">
            We Are <span className="text-brand-600">BuzzCelebDaily</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            The internet's leading destination for breaking entertainment news, exclusive celebrity scoops, and high-fashion red carpet coverage.
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
           <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                 Founded in 2024, BuzzCelebDaily was born from a simple idea: celebrity news should be accurate, respectful, yet unapologetically entertaining. We strive to bring you the stories that matter, separating the noise from the news.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                 From the front rows of Milan Fashion Week to the exclusive afterparties in Hollywood Hills, our team of dedicated insiders and editors work around the clock to keep you in the know.
              </p>
           </div>
           <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://picsum.photos/800/600?random=about" alt="Red Carpet" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                 <p className="text-white font-serif italic text-lg">"Where stars align and stories unfold."</p>
              </div>
           </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
           <h2 className="text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-12">Meet The Editors</h2>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {MOCK_AUTHORS.slice(0, 4).map(author => (
                 <div key={author.id} className="text-center group">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-gray-100 dark:border-gray-800 shadow-lg group-hover:scale-105 transition-transform">
                       <img src={author.avatarUrl} alt={author.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{author.name}</h3>
                    <p className="text-xs uppercase tracking-wider text-brand-600 dark:text-brand-400 font-bold mb-2">{author.role}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 px-2">{author.bio}</p>
                 </div>
              ))}
           </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 md:p-12 border border-gray-100 dark:border-gray-800">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                 <p className="text-3xl md:text-4xl font-black text-brand-600">5M+</p>
                 <p className="text-xs uppercase font-bold text-gray-500 mt-2">Monthly Readers</p>
              </div>
              <div>
                 <p className="text-3xl md:text-4xl font-black text-brand-600">50+</p>
                 <p className="text-xs uppercase font-bold text-gray-500 mt-2">Daily Articles</p>
              </div>
              <div>
                 <p className="text-3xl md:text-4xl font-black text-brand-600">24/7</p>
                 <p className="text-xs uppercase font-bold text-gray-500 mt-2">Live Coverage</p>
              </div>
              <div>
                 <p className="text-3xl md:text-4xl font-black text-brand-600">100%</p>
                 <p className="text-xs uppercase font-bold text-gray-500 mt-2">Fact Checked</p>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
