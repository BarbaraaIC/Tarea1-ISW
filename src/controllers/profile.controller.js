import { handleSuccess } from "../Handlers/responseHandlers.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;

  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}
export async function updateProfile(req, res) {

  try{
    const userID = req.user.id;
    const { email, password } = req.body;

    const user = await user.findById(userID);
      if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
      }

      user.email = email || user.email;
      user.password = password || user.password;


      await user.save();

      res.status(200).json({ message: "Perfil actualizado exitosamente", user });

  }catch(error){
    res.status(500).json({ message: "Error al actualizar perfil", error });
  }
}

export async function deleteProfile(req, res) {
  try{

  }catch(error){
    
  }
}