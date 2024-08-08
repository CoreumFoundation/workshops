import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const createNFTClass = async (classData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create-class`, classData);
    return response.data;
  } catch (error) {
    console.error('Error creating NFT class:', error);
    throw error;
  }
};

export const mintNFT = async (nftData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/mint`, nftData);
    return response.data;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
};

export const updateNFTData = async (updateData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/update`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating NFT data:', error);
    throw error;
  }
};
