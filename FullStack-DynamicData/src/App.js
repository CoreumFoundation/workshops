import React, { useState } from 'react';
import { createNFTClass, mintNFT, updateNFTData } from './api';
import './index.css'; // Ensure this imports Tailwind CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    classID: '',
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
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setClassData({ ...classData, classSymbol: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class Name"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setClassData({ ...classData, className: e.target.value })}
            />
            <input
              type="text"
              placeholder="Class Description"
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setClassData({ ...classData, classDescription: e.target.value })}
            />
            <button
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
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
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setNFTData({ ...nftData, classSymbol: e.target.value })}
            />
            <input
              type="text"
              placeholder="NFT ID"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setNFTData({ ...nftData, nftID: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setNFTData({ ...nftData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setNFTData({ ...nftData, description: e.target.value })}
            />
            <button
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
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
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setUpdateData({ ...updateData, classID: e.target.value })}
            />
            <input
              type="text"
              placeholder="NFT ID"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setUpdateData({ ...updateData, nftID: e.target.value })}
            />
            <input
              type="text"
              placeholder="Name"
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Description"
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg"
              onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
            />
            <button
              className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600"
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
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center py-10" style={{ backgroundImage: 'url("/background.jpg")' }}>
      <ToastContainer />
      <div className="w-full bg-green-800 text-white py-2">
        <marquee className="text-xl font-semibold">updateDynamicNftData</marquee>
      </div>
      <h1 className="text-5xl font-extrabold text-green-900 mb-10 drop-shadow-lg">NFT Management</h1>
      
      <div className="flex mb-10 space-x-4">
        <button className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'createClass' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setActiveSection('createClass')}>
          Create Class
        </button>
        <button className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'mintNFT' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setActiveSection('mintNFT')}>
          Mint NFT
        </button>
        <button className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'updateNFT' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setActiveSection('updateNFT')}>
          Update NFT
        </button>
      </div>

      {renderSection()}
    </div>
  );
}

export default App;
