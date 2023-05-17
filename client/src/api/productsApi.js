import axios from 'axios';
// const API_URL = 'http://localhost:3001';

export const addProduct = async (product) => {
    try {
      const response = await axios.post(`/product`, product);
      const newProduct = response.data;
      return newProduct;
    } catch (error) {
      console.error('Error al crear el producto', error);
      throw error;
    }
};

export const getProductsByPage = async (page) => {
  try {
    const response = await axios.get(`/products?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Función para banear producto
export const banProduct = async (id) => {
  try {
      const response = await axios.put(`/product`, { "id": id });
      return response.data;
  } catch (error) {
      console.error('Error al bloquear producto:', error);
      alert('Error al bloquear producto');
  }
};