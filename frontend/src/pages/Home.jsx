import { useState } from 'react';
import EditarPerfil from '@hooks/usuarios/editUser';
import { deleteUser } from '@hooks/usuarios/deleteUser';

const Home = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [profileData, setProfileData] = useState(null);
  const [showEdit, setShowEdit] = useState(false);

  const handleGetProfile = async () => {
    try {
      const response = await fetch(apiUrl + "/profile/private", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const text = await response.text();
      const data = JSON.parse(text);
      setProfileData(data.data);
      console.log("Datos del perfil obtenidos:", data.data);
    } catch (error) {
      console.error("Error al obtener perfil:", error.message);
    }
  };

  // abrir el formulario/ componente de edición
  const openEdit = () => {
    setShowEdit(true);
  };

  // recibir los datos actualizados desde EditarPerfil
  const handleEditSuccess = (updatedData) => {
    // asegurarse que updatedData sea un objeto plano (no evento)
    setProfileData(updatedData);
    setShowEdit(false);
  };

  const handleDelete = async () => {
    if (!profileData) return;
    try {
      await deleteUser(profileData.id || profileData._id || profileData.correo);
      setProfileData(null);
      alert("Perfil eliminado");
    } catch (error) {
      console.error("Error al eliminar perfil:", error);
      alert('No se pudo eliminar el perfil');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full max-w-2xl transform transition-all hover:scale-105">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
          Página de Inicio
        </h1>

        <button onClick={handleGetProfile} className="w-full mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-xl">
          Obtener Perfil
        </button>

        <div className="flex gap-4">
          <button
            onClick={openEdit}
            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-xl disabled:opacity-50"
            disabled={!profileData}
          >
            Editar Perfil
          </button>

          <button
            onClick={handleDelete}
            disabled={!profileData}
            className="flex-1 bg-red-600 text-white font-bold py-3 px-4 rounded-xl disabled:opacity-50"
          >
            Eliminar Perfil
          </button>
        </div>

        {showEdit && (
          <div className="mt-6">
            <EditarPerfil user={profileData} onSuccess={handleEditSuccess} />
          </div>
        )}

        {profileData && (
          <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
            <pre className="text-sm text-gray-700 overflow-auto">{JSON.stringify(profileData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
