
import { handleErrorClient, handleErrorServer, handleSuccess } from "../Handlers/responseHandlers.js";
import { User } from "../entities/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export async function getPrivateProfile(req, res) {
  try{
    const userEmail = req.user.email;

    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ email: userEmail });

    if (!user) {
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }
    handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
      email: user.email,
      password: user.password,
    });
  }catch(error){
    console.error(error);
    return handleErrorClient(res, 500, "Error al obtener perfil");
}
}

export async function updateProfile(req, res) {
    try{
    console.log("Cuerpo de la solicitud:", req.body);
    const userID = req.user.id;
    const { email, password } = req.body;

      if (!email && !password) {
      return res.status(400).json({ message: "Debes colocar que quieres actualizar" });
      }
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: userID });

      if(!user){
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      if(email && email !== user.email){
        const emailExiste = await userRepository.findOneBy({ email });
        if(emailExiste){
          return res.status(409).json({ message: "El email ya está en uso" });
        }
        user.email = email;
      }

      if(password){
        user.password = password;
      }
      await userRepository.save(user);
      res.status(200).json({ message: "Perfil actualizado exitosamente", user });

  }catch(error){
    console.error(error);
    res.status(500).json({ message: "Error al actualizar perfil", error });
  }
}
export async function deleteProfile(req, res) {
  try{
    const userRepository = AppDataSource.getRepository(User);
    const userID = req.user.sub;
    const user = await userRepository.findOneBy({ id: userID });

    if(!user){
      return handleErrorClient(res, 404, "Usuario no encontrado");
    }

    await userRepository.remove(user);
    handleSuccess( res, 200, "Perfil eliminado exitosamente");

  }catch(error){
    handleErrorServer(res, 200, "Error al eliminar perfil");

  }
}