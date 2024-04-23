// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8000'; // Sesuaikan dengan URL API Anda

// Fungsi untuk mendapatkan data grup pengguna dari API
export const getGroups = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/api/groups/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching groups:', error);
    throw new Error('Failed to fetch groups');
  }
};
