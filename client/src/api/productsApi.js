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

// Función para el listado de productos de la aplicación
// Trae todos los productos de la base de datos, excepto aquellos que no tengan stock o esten bloqueados
export const getProductsByPage = async (page) => {
  try {
    const response = await axios.get(`/products?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};


// Función para el panel del administrador
// Trae todos los productos de la base de datos, incluyendo aquellos que no tengan stock o esten bloqueados
export const getProductsToAdminByPage = async (page) => {
  const user_verified_token = localStorage.getItem("user_verified");

  try {
    const response = await axios.get(`/adminproducts?page=${page}`, {
      headers: {
        'Authorization': `token ${user_verified_token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Función para obtener todos los productos destacados
export const getDestacados = async () => {
  try {
    const response = await axios.get(`/productslabel?label=destacado`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los productos destacados:', error);
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