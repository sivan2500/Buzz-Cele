
import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
          <p className="mb-4">Last updated: {new Date().toLocaleDateString()}</p>
          
          <p className="mb-6">
            At BuzzCelebDaily, accessible from buzzcelebdaily.com, one of our main priorities is the privacy of our visitors. 
            This Privacy Policy document contains types of information that is collected and recorded by BuzzCelebDaily and how we use it.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Log Files</h2>
          <p className="mb-4">
            BuzzCelebDaily follows a standard procedure of using log files. These files log visitors when they visit websites. 
            All hosting companies do this and a part of hosting services' analytics. The information collected by log files include 
            internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, 
            and possibly the number of clicks. These are not linked to any information that is personally identifiable. 
            The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, 
            and gathering demographic information.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Cookies and Web Beacons</h2>
          <p className="mb-4">
            Like any other website, BuzzCelebDaily uses 'cookies'. These cookies are used to store information including visitors' 
            preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize 
            the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Google DoubleClick DART Cookie</h2>
          <p className="mb-4">
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site 
            visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline 
            the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – 
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">https://policies.google.com/technologies/ads</a>
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Advertising Partners</h2>
          <p className="mb-4">
            Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. 
            Each of our advertising partners has their own Privacy Policy for their policies on user data.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Google AdSense</li>
            <li>Ezoic</li>
            <li>Taboola</li>
          </ul>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Privacy Policies</h2>
          <p className="mb-4">
            You may consult this list to find the Privacy Policy for each of the advertising partners of BuzzCelebDaily.
          </p>
          <p className="mb-4">
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their 
            respective advertisements and links that appear on BuzzCelebDaily, which are sent directly to users' browser. 
            They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness 
            of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p className="mb-4">
            Note that BuzzCelebDaily has no access to or control over these cookies that are used by third-party advertisers.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Third Party Privacy Policies</h2>
          <p className="mb-4">
            BuzzCelebDaily's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult 
            the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their 
            practices and instructions about how to opt-out of certain options.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p className="mb-4">
            Under the CCPA, among other rights, California consumers have the right to request that a business that collects a 
            consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">GDPR Data Protection Rights</h2>
          <p className="mb-4">
            We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: 
            The right to access, The right to rectification, The right to erasure, The right to restrict processing, The right to object to processing, and The right to data portability.
          </p>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Children's Information</h2>
          <p className="mb-4">
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians 
            to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p className="mb-4">
            BuzzCelebDaily does not knowingly collect any Personal Identifiable Information from children under the age of 13. 
            If you think that your child provided this kind of information on our website, we strongly encourage you to contact us 
            immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
