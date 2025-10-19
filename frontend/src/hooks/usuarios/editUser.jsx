import { useState } from 'react';
import axios from 'axios';

const EditarPerfil = ({ user }) => {
const [formData, setFormData] = useState({
    correo: user?.correo || '',
    password: user?.password || '',
});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEditUser = (userData) => {
    setFormData({
        correo: userData.correo,
        password: userData.password,
    });
    setError('');
    setSuccess('');
    };

    const editUser = async () => {
    setLoading(true);
    try {
      const response = await axios.patch('/profile/private', formData);

        if (response.status === 200) {
        setSuccess('Perfil actualizado correctamente');
        setError('');
        } else {
        setError('Hubo un problema al actualizar el perfil');
        setSuccess('');
        }
    } catch (error) {
        console.log('Error al conectar con el servidor', error);
        setSuccess('');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Perfil</h2>

      <label className="block mb-2 font-medium">Correo</label>
      <input
        type="email"
        value={formData.correo}
        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <label className="block mb-2 font-medium">Contraseña</label>
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <button
        onClick={editUser}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        {loading ? 'Actualizando...' : 'Editar Perfil'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
};

export default EditarPerfil;
