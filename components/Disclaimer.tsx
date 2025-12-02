
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">Disclaimer</h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">General Disclaimer</h3>
          <p>
            The information provided on BuzzCelebDaily is for general entertainment and informational purposes only. While we strive to provide up-to-date and accurate information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information contained on the website.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Affiliate Disclosure</h3>
          <p>
            BuzzCelebDaily participates in various affiliate marketing programs, which means we may get paid commissions on editorially chosen products purchased through our links to retailer sites. This comes at no extra cost to you. Our editorial content is not influenced by affiliate partnerships.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">External Links</h3>
          <p>
            Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with BuzzCelebDaily. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
          </p>

          <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2">Gossip & Rumors</h3>
          <p>
            Certain content on this site may be categorized as rumor, speculation, or "gossip". Such content should be treated as unverified unless explicitly stated otherwise. Opinions expressed by authors are their own.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
