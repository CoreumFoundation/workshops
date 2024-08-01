import React, { useState } from 'react';
import { createNFTClass, mintNFT, updateNFTData } from './api';
import './index.css'; // Ensure this imports Tailwind CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import coreumLogo from './assets/coreum-logo.png'; // Import the Coreum logo

function App() {
  const [activeSection, setActiveSection] = useState('createClass');
  const [classData, setClassData] = useState({
    classSymbol: '',
    className: '',
    classDescription: ''
  });

  const [nftData, setNFTData] = useState({
    classSymbol: '',
    nftID: '',
    name: '',
    description: ''
  });

  const [updateData, setUpdateData] = useState({
    nftID: '',
    name: '',
    description: ''
  });

  const handleCreateClass = async () => {
    try {
      const response = await createNFTClass(classData);
      console.log('NFT class created:', response);
      toast.success(`Transaction Successful! TxHash: ${response.transaction_id}`);
    } catch (error) {
      console.error('Error creating NFT class:', error);
      toast.error('Error creating NFT class');
    }
  };

  const handleMintNFT = async () => {
    try {
      const response = await mintNFT(nftData);
      console.log('NFT minted:', response);
      toast.success(`Transaction Successful! TxHash: ${response.transaction_id}`);
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Error minting NFT');
    }
  };

  const handleUpdateNFTData = async () => {
    try {
      const response = await updateNFTData(updateData);
      console.log('NFT data updated:', response);
      toast.success(`Transaction Successful! TxHash: ${response.transaction_id}`);
    } catch (error) {
      console.error('Error updating NFT data:', error);
      toast.error('Error updating NFT data');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'createClass':
        return (
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg mb-10 bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Create NFT Class</h2>
            <input
              type="text"
              placeholder="Class Symbol"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setClassData({ ...classData, classSymbol: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class Name"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setClassData({ ...classData, className: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class Description"
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setClassData({ ...classData, classDescription: e.target.value })}
            />
            <button
              className="w-full bg-greenish text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              onClick={handleCreateClass}
            >
              Create Class
            </button>
          </div>
        );
      case 'mintNFT':
        return (
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg mb-10 bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Mint NFT</h2>
            <input
              type="text"
              placeholder="Class Symbol"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setNFTData({ ...nftData, classSymbol: e.target.value })}
            />
            <input
              type="text"
              placeholder="NFT ID"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setNFTData({ ...nftData, nftID: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setNFTData({ ...nftData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setNFTData({ ...nftData, description: e.target.value })}
            />
            <button
              className="w-full bg-greenish text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              onClick={handleMintNFT}
            >
              Mint NFT
            </button>
          </div>
        );
      case 'updateNFT':
        return (
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Update NFT Data</h2>
            <input
              type="text"
              placeholder="Class ID"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setUpdateData({ ...updateData, classID: e.target.value })}
            />
            <input
              type="text"
              placeholder="NFT ID"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setUpdateData({ ...updateData, nftID: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg text-black"
              onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
            />
            <button
              className="w-full bg-greenish text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              onClick={handleUpdateNFTData}
            >
              Update NFT Data
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-greenish-black flex flex-col items-center justify-center text-white">
      <ToastContainer position="top-right" />
      <div className="w-full bg-greenish text-white py-2 flex items-center justify-between px-4">
        <img src={coreumLogo} alt="Coreum Logo" className="h-10 mr-4" />
        <marquee className="text-xl font-semibold">#BuildOnCoreum</marquee>
      </div>
      <h1 className="text-5xl font-extrabold text-greenish mb-10 drop-shadow-lg">NFT Management</h1>
      <div className="flex mb-10 space-x-4">
        <button
          className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'createClass' ? 'bg-greenish text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveSection('createClass')}
        >
          Create Class
        </button>
        <button
          className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'mintNFT' ? 'bg-greenish text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveSection('mintNFT')}
        >
          Mint NFT
        </button>
        <button
          className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'updateNFT' ? 'bg-greenish text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveSection('updateNFT')}
        >
          Update NFT
        </button>
      </div>
      {renderSection()}
    </div>
  );
}

export default App;
