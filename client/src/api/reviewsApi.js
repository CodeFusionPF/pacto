import axios from 'axios';

// Función para guardar una review en la base de datos
export const addReview = async (review) => {
    try {
      const response = await axios.post(`/review`, review);
      const newReviewId = response.data;
      return newReviewId;
    } catch (error) {
      console.error('Error al registrar la review', error);
      alert('Error al registrar la review');
      return null;
    }
};

// Función para obtener todas las reviews de la base de datos
export const getAllReviews = async () => {
  try {
    const response = await axios.get(`/reviews`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reviews:', error);
    alert('Error al obtener reviews');
    return [];
  }
}

// Función para obtener todas las reviews de un vendedor
export const getVendorReviews = async (vendorId, page) => {
  try {
    const response = await axios.get(`/vendorReviews?id=${vendorId}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reviews:', error);
    alert('Error al obtener reviews');
    return [];
  }
}

// Función para obtener las calificaciones del vendedor
export const getVendorRatings = async (vendorId) => {
  try {
    const response = await axios.get(`/rating?id=${vendorId}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las calificaciones:', error);
    alert('Error al obtener las calificaciones');
    return [];
  }
}