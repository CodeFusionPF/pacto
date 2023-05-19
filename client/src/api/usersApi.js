import axios from 'axios';


// Función para banear usuario
export const banUser = async (id) => {
    const user_verified_token = localStorage.getItem("user_verified");
    try {
        const response = await axios.put(`/banuser`, { "id": id }, {
            headers: {
              'Authorization': `token ${user_verified_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al bloquear usuario:', error);
        alert('Error al bloquear usuario');
    }
};

// Función para obtener todos los usuarios de la página actual
export const getAllUsers = async (page) => {
    const user_verified_token = localStorage.getItem("user_verified");
    try {
        const response = await axios.get(`/users?page=${page}`, {
            headers: {
              'authorization': `token ${user_verified_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        alert('Error al obtener usuarios');
        return [];
    }
};