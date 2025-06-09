// src/components/FundingCard.jsx
import React, { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FaArrowLeft, FaShareAlt, FaDownload, FaCopy, FaRupeeSign } from 'react-icons/fa';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const FundingCard = ({ request, onCreateNew, darkMode }) => {
  const [copied, setCopied] = useState(false);
  const [qrStyle, setQrStyle] = useState({
    bgColor: '#ffffff',
    fgColor: '#000000',
    size: 200
  });

  const qrRef = useRef();
  const cardRef = useRef();

  const isUPI = request.paymentMethod === 'upi';
  const paymentInfo = isUPI ? request.upiId : `${request.accountDetails.accountHolder}\n${request.accountDetails.accountNumber}\n${request.accountDetails.ifscCode}`;

  const qrValue = isUPI ?
    `upi://pay?pa=${request.upiId}&pn=${encodeURIComponent(request.title)}&am=${request.amount}&cu=INR` :
    `bank:${request.accountDetails.accountNumber}@${request.accountDetails.ifscCode}?name=${encodeURIComponent(request.accountDetails.accountHolder)}&amount=${request.amount}`;

  const copyToClipboard = () => {
    const text = isUPI ? request.upiId : paymentInfo;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.fillStyle = qrStyle.bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `${request.title.replace(/\s+/g, '_')}_funding_qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  const shareRequest = async () => {
    try {
      const canvas = await html2canvas(cardRef.current);
      canvas.toBlob(async (blob) => {
        if (navigator.canShare && navigator.canShare({ files: [new File([blob], 'funding_card.png', { type: blob.type })] })) {
          const file = new File([blob], 'funding_card.png', { type: blob.type });
          await navigator.share({
            files: [file],
            title: `Support my ${request.title}`,
            text: `Please consider supporting my funding request.`,
          });
        } else {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'funding_card.png';
          link.click();
          URL.revokeObjectURL(url);
          alert('Your device does not support image sharing. The screenshot has been downloaded instead.');
        }
      });
    } catch (err) {
      console.error('Sharing failed:', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <button
        onClick={onCreateNew}
        className="flex items-center text-indigo-600 dark:text-indigo-400 font-medium mb-6 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
      >
        <FaArrowLeft className="mr-2" /> Create New Request
      </button>

      <div
        ref={cardRef}
        className={`rounded-2xl overflow-hidden shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
      >
        <div
          className="p-8 text-center"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
              : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
          }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{request.title}</h2>
          <p className="text-white/90 max-w-2xl mx-auto">{request.description}</p>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Funding Goal</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-300">Target Amount</span>
                  <span className="font-bold flex items-center"><FaRupeeSign /> {request.amount}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                    style={{ width: `${Math.min(100, (request.amountReceived / request.amount) * 100)}%` }}
                  ></div>
                </div>
                <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
                  ₹{request.amountReceived || 0} raised
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  {isUPI ? 'UPI Information' : 'Bank Information'}
                </h3>
                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                  <div className="flex justify-between items-center">
                    <span className="break-all">{paymentInfo}</span>
                    <button
                      onClick={copyToClipboard}
                      className="ml-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      <FaCopy />
                    </button>
                  </div>
                  {copied && (
                    <div className="text-green-600 dark:text-green-400 text-sm mt-2">
                      {isUPI ? 'UPI ID' : 'Bank details'} copied to clipboard!
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={shareRequest}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  <FaShareAlt /> Share
                </button>
                <button
                  onClick={downloadQR}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  <FaDownload /> Download QR
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <div
                ref={qrRef}
                className="p-6 bg-white rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <QRCodeSVG
                  value={qrValue}
                  size={qrStyle.size}
                  bgColor={qrStyle.bgColor}
                  fgColor={qrStyle.fgColor}
                  includeMargin={true}
                />
              </div>

              <div className="mt-6 w-full max-w-xs">
                <h3 className="text-lg font-semibold mb-3 text-center">QR Customization</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-1">Background</label>
                    <div className="flex gap-2">
                      {['#ffffff', '#f3f4f6', '#1f2937'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setQrStyle({ ...qrStyle, bgColor: color })}
                          className={`w-8 h-8 rounded-full border ${qrStyle.bgColor === color ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-1">Color</label>
                    <div className="flex gap-2">
                      {['#000000', '#4f46e5', '#7c3aed'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setQrStyle({ ...qrStyle, fgColor: color })}
                          className={`w-8 h-8 rounded-full border ${qrStyle.fgColor === color ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm mb-1">Size: {qrStyle.size}px</label>
                  <input
                    type="range"
                    min="100"
                    max="300"
                    value={qrStyle.size}
                    onChange={(e) => setQrStyle({ ...qrStyle, size: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-8 rounded-2xl shadow-md max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">How it works</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                `Share your QR code with potential supporters`,
                `Supporters scan the QR code with ${isUPI ? 'their UPI app (like PhonePe, GPay)' : 'their banking app'}`,
                `Donations go directly to your ${isUPI ? 'bank account via UPI' : 'bank account'}`
              ].map((text, idx) => (
                <li
                  key={idx}
                  className="flex items-start space-x-4 group"
                  aria-label={`Step ${idx + 1}: ${text}`}
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold text-lg select-none transition-colors group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800">
                    {idx + 1}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default FundingCard;
