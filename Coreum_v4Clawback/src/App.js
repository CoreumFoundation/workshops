import React, { useState } from 'react';
import { createClass, sendFT, clawBackFT } from './api';
import './index.css'; // Ensure this imports Tailwind CSS
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import coreumLogo from './assets/coreum-logo.png'; // Import the Coreum logo

function App() {
  const [activeSection, setActiveSection] = useState('createClass');
  const [classData, setClassData] = useState({
    symbol: '',
    subunit: '',
    precision: 6,
    initial_amount: 0,
    description: ''
  });

  const [sendData, setSendData] = useState({
    to_address: '',
    amount: 0,
    denom: ''
  });

  const [clawbackData, setClawbackData] = useState({
    to_address: '',
    amount: 0,
    denom: ''
  });

  const handleClassDataChange = (e) => {
    setClassData({
      ...classData,
      [e.target.name]: e.target.value
    });
  };

  const handleSendDataChange = (e) => {
    setSendData({
      ...sendData,
      [e.target.name]: e.target.value
    });
  };

  const handleClawbackDataChange = (e) => {
    setClawbackData({
      ...clawbackData,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateClass = async () => {
    try {
      const response = await createClass(classData);
      console.log("Class created successfully:", response);
      toast.success(`Transaction Successful! TxHash: ${response.transaction_id}`);
    } catch (error) {
      console.error("Error creating class:", error);
      toast.error('Error creating class');
    }
  };

  const handleSendFT = async () => {
    if (!sendData.to_address || sendData.amount <= 0 || !sendData.denom) {
      toast.error('Please fill in all fields correctly.');
      return;
    }
    try {
      const response = await sendFT(sendData);
      console.log("Fungible token sent successfully:", response);
      toast.success(`Transaction Successful! TxHash: ${response.transaction_id}`);
    } catch (error) {
      console.error("Error sending fungible token:", error);
      toast.error('Error sending fungible token');
    }
  };

  const handleClawbackFT = async () => {
    if (!clawbackData.to_address || clawbackData.amount <= 0 || !clawbackData.denom) {
      toast.error('Please fill in all fields correctly.');
      return;
    }
    try {
      const response = await clawBackFT(clawbackData);
      console.log("Fungible token clawed back successfully:", response);
      toast.success(`Transaction Successful! TxHash: ${response.transaction_id}`);
    } catch (error) {
      console.error("Error clawing back fungible token:", error);
      toast.error('Error clawing back fungible token');
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'createClass':
        return (
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg mb-10 bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Create Token Class</h2>
            <input
              type="text"
              placeholder="Class Symbol"
              name="symbol"
              value={classData.symbol}
              onChange={handleClassDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="Subunit"
              name="subunit"
              value={classData.subunit}
              onChange={handleClassDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="number"
              placeholder="Precision"
              name="precision"
              value={classData.precision}
              onChange={handleClassDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="number"
              placeholder="Initial Amount"
              name="initial_amount"
              value={classData.initial_amount}
              onChange={handleClassDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={classData.description}
              onChange={handleClassDataChange}
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              onClick={handleCreateClass}
            >
              Create Class
            </button>
          </div>
        );
      case 'sendFT':
        return (
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg mb-10 bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Send Fungible Token</h2>
            <input
              type="text"
              placeholder="To Address"
              name="to_address"
              value={sendData.to_address}
              onChange={handleSendDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={sendData.amount}
              onChange={handleSendDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="Denom"
              name="denom"
              value={sendData.denom}
              onChange={handleSendDataChange}
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              onClick={handleSendFT}
            >
              Send Token
            </button>
          </div>
        );
      case 'clawbackFT':
        return (
          <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-lg mb-10 bg-opacity-90">
            <h2 className="text-3xl font-bold mb-6 text-gray-700">Clawback Fungible Token</h2>
            <input
              type="text"
              placeholder="To Address"
              name="to_address"
              value={clawbackData.to_address}
              onChange={handleClawbackDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              value={clawbackData.amount}
              onChange={handleClawbackDataChange}
              className="mb-3 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <input
              type="text"
              placeholder="Denom"
              name="denom"
              value={clawbackData.denom}
              onChange={handleClawbackDataChange}
              className="mb-6 p-3 w-full border border-gray-300 rounded-lg text-black"
            />
            <button
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
              onClick={handleClawbackFT}
            >
              Clawback Token
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-radial from-black via-gray-900 to-black flex flex-col items-center justify-center text-white font-space-grotesk">
      <ToastContainer position="top-right" />
      <div className="w-full flex items-center justify-between px-4">
        <img src={coreumLogo} alt="Coreum Logo" className="h-10 ml-4" />
      </div>
      <h1 className="text-5xl font-extrabold text-green-gradient mb-10 drop-shadow-lg">Fungible Token Management</h1>
      <div className="flex mb-10 space-x-4">
        <button
          className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'createClass' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveSection('createClass')}
        >
          Create Class
        </button>
        <button
          className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'sendFT' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveSection('sendFT')}
        >
          Send Token
        </button>
        <button
          className={`py-2 px-4 rounded-lg font-semibold ${activeSection === 'clawbackFT' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => setActiveSection('clawbackFT')}
        >
          Clawback Token
        </button>
      </div>
      {renderSection()}
    </div>
  );
}

export default App;
