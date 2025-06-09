// src/components/FundingForm.jsx
import React, { useState } from 'react';
import { FaInfoCircle, FaQrcode, FaWallet, FaMobileAlt, FaRupeeSign } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FundingForm = ({ onSubmit, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    paymentMethod: 'upi',
    upiId: '',
    accountDetails: {
      accountNumber: '',
      ifscCode: '',
      accountHolder: ''
    },
    category: 'personal'
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || Number(formData.amount) <= 0) newErrors.amount = 'Amount must be greater than 0';
    if (formData.paymentMethod === 'upi') {
      if (!formData.upiId.trim()) newErrors.upiId = 'UPI ID is required';
    } else {
      if (!formData.accountDetails.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
      if (!formData.accountDetails.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
      if (!formData.accountDetails.accountHolder.trim()) newErrors.accountHolder = 'Account holder name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, accountDetails: { ...prev.accountDetails, [name]: value } }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(formData);
  };

  const categories = [
    { id: 'personal', name: 'Personal Need' },
    { id: 'education', name: 'Education' },
    { id: 'business', name: 'Business/Startup' },
    { id: 'charity', name: 'Charity' },
    { id: 'medical', name: 'Medical Expenses' },
    { id: 'wedding', name: 'Wedding Expenses' },
    { id: 'agriculture', name: 'Agriculture' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl p-6 md:p-8 shadow-xl ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
    >
      <h2 className="text-2xl font-bold mb-2">Create Funding Request</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-300">Fill in your details to generate a QR code for your donations</p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Funding Title</label>
            <div className="relative">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Eg: Help for books" className={`w-full px-4 py-3 pl-11 rounded-lg border focus:outline-none focus:ring-2 transition-colors placeholder-gray-500 ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaInfoCircle className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount Needed (₹)</label>
            <div className="relative">
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="1000.00" className={`w-full px-4 py-3 pl-11 rounded-lg border focus:outline-none focus:ring-2 transition-colors placeholder-gray-500 ${errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaRupeeSign className="text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Category</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {categories.map(category => (
              <div key={category.id} className="flex items-center">
                <input type="radio" id={category.id} name="category" value={category.id} checked={formData.category === category.id} onChange={handleChange} className="hidden peer" />
                <label htmlFor={category.id} className={`w-full py-2 px-3 text-center text-sm rounded-lg cursor-pointer transition-colors peer-checked:bg-indigo-100 peer-checked:text-indigo-700 peer-checked:font-medium peer-checked:border-indigo-500 border ${darkMode ? 'bg-gray-700 border-gray-600 text-gray-300 peer-checked:bg-indigo-900/30 peer-checked:border-indigo-500 peer-checked:text-indigo-300' : 'bg-gray-50 border-gray-300 text-gray-700'}`}>{category.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tell your story..." rows="4" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors placeholder-gray-500 ${errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`}></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Payment Method</label>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center">
              <input type="radio" id="upi" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} className="hidden peer" />
              <label htmlFor="upi" className={`w-full py-3 px-4 text-center rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2 ${formData.paymentMethod === 'upi' ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 border-2' : 'border border-gray-300 dark:border-gray-600'}`}><FaMobileAlt className="text-xl" /> UPI</label>
            </div>
            <div className="flex items-center">
              <input type="radio" id="bank" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleChange} className="hidden peer" />
              <label htmlFor="bank" className={`w-full py-3 px-4 text-center rounded-lg cursor-pointer transition-colors flex items-center justify-center gap-2 ${formData.paymentMethod === 'bank' ? 'bg-indigo-100 dark:bg-indigo-900/30 border-indigo-500 text-indigo-700 dark:text-indigo-300 border-2' : 'border border-gray-300 dark:border-gray-600'}`}><FaWallet className="text-xl" /> Bank Transfer</label>
            </div>
          </div>

          {formData.paymentMethod === 'upi' ? (
            <div>
              <label className="block text-sm font-medium mb-2">UPI ID</label>
              <div className="relative">
                <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} placeholder="yourname@upi" className={`w-full px-4 py-3 pl-11 rounded-lg border focus:outline-none focus:ring-2 transition-colors placeholder-gray-500 ${errors.upiId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMobileAlt className="text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
              <p className="text-xs mt-2 text-gray-500 dark:text-gray-400 flex items-center"><FaInfoCircle className="mr-2" /> Enter your UPI ID (e.g. name@upi)</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Account Number</label>
                <input type="text" name="accountNumber" value={formData.accountDetails.accountNumber} onChange={handleAccountChange} placeholder="Account number" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors placeholder-gray-500 ${errors.accountNumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">IFSC Code</label>
                <input type="text" name="ifscCode" value={formData.accountDetails.ifscCode} onChange={handleAccountChange} placeholder="IFSC code" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors placeholder-gray-500 ${errors.ifscCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                {errors.ifscCode && <p className="text-red-500 text-sm mt-1">{errors.ifscCode}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Account Holder Name</label>
                <input type="text" name="accountHolder" value={formData.accountDetails.accountHolder} onChange={handleAccountChange} placeholder="Account holder name" className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors placeholder-gray-500 ${errors.accountHolder ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-indigo-500 dark:focus:ring-indigo-400'} ${darkMode ? 'bg-gray-700 text-white' : 'bg-white'}`} />
                {errors.accountHolder && <p className="text-red-500 text-sm mt-1">{errors.accountHolder}</p>}
              </div>
            </div>
          )}
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300">
          Generate Funding QR
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FundingForm;