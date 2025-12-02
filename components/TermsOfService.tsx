
import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="mb-4"><strong>Welcome to BuzzCelebDaily!</strong></p>
          
          <p className="mb-6">
            These terms and conditions outline the rules and regulations for the use of BuzzCelebDaily's Website, located at buzzcelebdaily.com.
            By accessing this website we assume you accept these terms and conditions. Do not continue to use BuzzCelebDaily if you do not 
            agree to take all of the terms and conditions stated on this page.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">1. Cookies</h2>
          <p className="mb-4">
            We employ the use of cookies. By accessing BuzzCelebDaily, you agreed to use cookies in agreement with the BuzzCelebDaily's Privacy Policy.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">2. License</h2>
          <p className="mb-4">
            Unless otherwise stated, BuzzCelebDaily and/or its licensors own the intellectual property rights for all material on BuzzCelebDaily. 
            All intellectual property rights are reserved. You may access this from BuzzCelebDaily for your own personal use subjected to 
            restrictions set in these terms and conditions.
          </p>
          <p className="mb-4">You must not:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Republish material from BuzzCelebDaily</li>
            <li>Sell, rent or sub-license material from BuzzCelebDaily</li>
            <li>Reproduce, duplicate or copy material from BuzzCelebDaily</li>
            <li>Redistribute content from BuzzCelebDaily</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">3. User Content</h2>
          <p className="mb-4">
            Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. 
            BuzzCelebDaily does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect 
            the views and opinions of BuzzCelebDaily,its agents and/or affiliates. Comments reflect the views and opinions of the person who 
            post their views and opinions.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">4. Content Liability</h2>
          <p className="mb-4">
            We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all 
            claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene 
            or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">5. Disclaimer</h2>
          <p className="mb-4">
            To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our 
            website and the use of this website. Nothing in this disclaimer will:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <p className="mb-4">
            The news and articles provided on this site are for entertainment and informational purposes only. BuzzCelebDaily makes no representations as to accuracy, completeness, currentness, suitability, or validity of any information on this site and will not be liable for any errors, omissions, or delays in this information or any losses, injuries, or damages arising from its display or use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
