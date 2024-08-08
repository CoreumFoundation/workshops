import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const createClass = async(classData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/issue-token`, classData);
        return response.data;
    }

    catch(error) {
        console.error("Error creating fungible token", error);
        throw error;
    }
}

export const sendFT = async(sendData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/send-token`, sendData)
        return response.data;

    }

    catch(error) {
        console.error("Error sending fungible token", error);
        throw error

    }
}


export const clawBackFT = async(clawbackData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/clawback`, clawbackData);
        return response.data;

    }

    catch(error) {
        console.error("Clawback failed", error);
        throw error;
    }
}