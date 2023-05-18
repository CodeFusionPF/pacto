import axios from 'axios';

export const getAllWallets = async () => {
  try {
    const response = await axios.get(`/wallets`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las wallets:', error);
    return [];
  }
};