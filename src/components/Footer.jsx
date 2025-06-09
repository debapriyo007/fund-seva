// src/components/Footer.jsx
import React from 'react';
import { FaGithub, FaTwitter, FaInstagram, FaRupeeSign , FaHandHoldingUsd} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-16 py-8 bg-gray-900 text-white">
        
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                <FaRupeeSign className="text-white" />
              </div>
              <h3 className="text-lg font-bold">Fund सेवा</h3>
            </div>
            <p className="mt-2 text-sm text-gray-400 max-w-md">
              Empowering dreams through simple, direct funding with QR codes. Made for India.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com/debapriyo007" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <FaGithub />
              </a>
              <a href="https://x.com/Debapri28540147" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/debu_21_21/" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <hr className="my-6 border-gray-700" />

        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Fund सेवा. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
