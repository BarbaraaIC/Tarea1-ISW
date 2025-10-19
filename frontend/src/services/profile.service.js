import axios from './root.service.js';

export async function getProfile() {
    try {
        const response = await axios.get('/profile/private');
        return response.data;
    } catch (error) {
        return error.response?.data || { message: 'Error al obtener perfil' };
    }
}

export async function editProfile(){
    try{
        const response = await axios.patch('/profile/private');
    }catch(error){

    }
}

export async function deleteProfile(){
    try{
        const response = await axios.delete('/profile/private');

    }catch(error){

    }
}