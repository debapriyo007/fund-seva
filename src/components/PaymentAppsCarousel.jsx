import React from 'react';

const logos = [
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2880px-Paytm_Logo_%28standalone%29.svg.png', alt: 'Paytm' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2880px-Google_Pay_Logo.svg.png', alt: 'Google Pay' },
  { src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/2880px-PhonePe_Logo.svg.png', alt: 'PhonePe' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/65/BHIM_SVG_Logo.svg/500px-BHIM_SVG_Logo.svg.png', alt: 'BHIM' },
  { src: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/dd/MobiKwik_logo.svg/2880px-MobiKwik_logo.svg.png', alt: 'MobiKwik' }
];

const PaymentAppsCarousel = () => {
  return (
    <div className="bg-gray-900 py-8 flex justify-center mt-24">
      {/* Container that centers and restricts width */}
      <div
        className="relative w-[70vw] max-w-5xl overflow-hidden"
        style={{
          // CSS mask fades edges left/right to transparent for smooth fade out
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        {/* Scrolling flex container */}
        <div
          className="flex items-center whitespace-nowrap animate-scroll"
          style={{ willChange: 'transform' }}
        >
          {/* Duplicate logos to enable infinite scrolling */}
          {logos.concat(logos).map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="h-10 mx-6 grayscale-0 transition duration-300 cursor-pointer select-none"
              loading="lazy"
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentAppsCarousel;
