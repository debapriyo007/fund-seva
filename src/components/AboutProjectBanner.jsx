import React from 'react';
import { FaGithub } from 'react-icons/fa';

const AboutProjectBanner = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-700 to-purple-800 p-6 rounded-xl shadow-lg max-w-5xl mx-auto my-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">About This Project</h2>
        <p className="text-gray-200 text-sm max-w-xl">
          Fund सेवा is a simple platform to create funding requests, generate QR codes, and receive direct support. Empower your dreams effortlessly — एक QR कोड से, सीधा और आसान !
        </p>
      </div>
      <a
        href="https://github.com/debapriyo007/fund-seva" // Replace with your actual GitHub repo link
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        <FaGithub className="text-2xl" />
        View on GitHub
      </a>
    </div>
  );
};

export default AboutProjectBanner;
