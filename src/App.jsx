import React, { useState, useEffect } from 'react';
import FundingForm from './components/FundingForm';
import FundingCard from './components/FundingCard';
import Header from './components/Header';
import Footer from './components/Footer';
import Cards from './components/Cards';
import { FaRupeeSign, FaTrash } from 'react-icons/fa';

function App() {
  const [fundingRequests, setFundingRequests] = useState([]);
  const [activeRequest, setActiveRequest] = useState(null);

  // Load from localStorage on initial render
  useEffect(() => {
    const storedRequests = localStorage.getItem('fundingRequests');
    if (storedRequests) {
      setFundingRequests(JSON.parse(storedRequests));
    }
  }, []);

  // Save to localStorage whenever fundingRequests change
  useEffect(() => {
    localStorage.setItem('fundingRequests', JSON.stringify(fundingRequests));
  }, [fundingRequests]);

  const handleSubmit = (data) => {
    const newRequest = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      amountReceived: 0,
      donors: 0
    };
    const updatedRequests = [newRequest, ...fundingRequests];
    setFundingRequests(updatedRequests);
    setActiveRequest(newRequest);
  };

  const createNewRequest = () => setActiveRequest(null);

  const handleDelete = (id) => {
    const updatedRequests = fundingRequests.filter(request => request.id !== id);
    setFundingRequests(updatedRequests);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white transition-colors duration-300">
      <Header />

      <main className="container mx-auto px-4 py-8 pt-20">
        {!activeRequest ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 mt-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 drop-shadow-lg">
                Support Sapne | सपनों को साथ चाहिए
              </h1>
              <p className="text-md max-w-2xl mx-auto text-gray-300">
                Support your dreams effortlessly — एक QR कोड से, सीधा और आसान!
              </p>

              <Cards />
            </div>

            <FundingForm onSubmit={handleSubmit} darkMode={true} />
          </div>
        ) : (
          <FundingCard
            request={activeRequest}
            onCreateNew={createNewRequest}
            darkMode={true}
          />
        )}

        {fundingRequests.length > 0 && !activeRequest && (
          <div className="mt-16 max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-white">Recent Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fundingRequests.map(request => (
                <div
                  key={request.id}
                  className="cursor-pointer rounded-xl p-5 shadow-lg hover:shadow-purple-600/50 border border-gray-700 bg-gray-800 transition-transform duration-300 hover:scale-[1.02] relative overflow-hidden"
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-r-lg"
                    onClick={() => setActiveRequest(request)}
                  ></div>

                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className="font-semibold text-lg truncate"
                      onClick={() => setActiveRequest(request)}
                    >
                      {request.title}
                    </h3>
                    <span className="bg-indigo-900 text-indigo-300 text-sm font-medium px-2 py-1 rounded flex items-center">
                      <FaRupeeSign className="mr-1" />{request.amount}
                    </span>
                  </div>

                  <p
                    className="text-sm line-clamp-2 mb-4 text-gray-300"
                    onClick={() => setActiveRequest(request)}
                  >
                    {request.description}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                    <span>{request.donors} donors</span>
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="text-red-500 hover:text-red-400"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
