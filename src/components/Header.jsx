// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { FaRupeeSign, FaGithub, FaHandHoldingUsd } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-md'
          : 'py-4 bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
       <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3"
    >
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
        <FaRupeeSign className="text-white text-2xl" />
      </div>
      <h1 className="text-3xl font-bold text-white flex flex-col leading-tight">
        <span className='text-2xl'>Fund <span className=" text-2xl text-indigo-300 "> सेवा</span></span>
        
      </h1>
    </motion.div>

        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          href="https://github.com/debapriyo007"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all text-white font-medium text-xl"
        >
          <FaGithub className="text-2xl w-8 h-8" />
          {/* GitHub */}
        </motion.a>
      </div>
    </header>
  );
};

export default Header;
