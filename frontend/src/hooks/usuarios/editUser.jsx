import { useState} from 'react';

const EditarPerfil = () => {
  const apiUrl = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  const handleEditUser = async () => {
    try {
      const response = await fetch(apiUrl + "/profile/private", {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData),
      });

      const text = await response.text();
      const data = JSON.parse(text);
      //setProfileData(data.data);
      console.log("Perfil editado:", data.data);
    } catch (error) {
      console.log("Error al conectar con el servidor", error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Perfil</h2>

      <label className="block mb-2 font-medium">Correo</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value )}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <label className="block mb-2 font-medium">Contraseña</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
      />

      <button
        onClick={handleEditUser}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
      >
        Editar Perfil
      </button>
    </div>
  );
};

export default EditarPerfil;
