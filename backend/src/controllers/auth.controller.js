import { loginUser } from "../services/auth.service.js";
import { createUser } from "../services/user.service.js";
import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { usuarioBodyValidation } from "../validations/usuario.validation.js";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../services/user.service.js";

export async function login(req, res) {
  const user = await findUserByEmail(req.body.email);
  if(!user){
    throw new Error("Credenciales incorrectas");
  }
  if(user && !(await bcrypt.compare(req.body.password, user.password))){
    return handleErrorClient(res, 401, "Credenciales incorrectas");

  }
  const data = await loginUser(req.body.email, req.body.password);
  handleSuccess(res, 200, "Login exitoso", data);
}

export async function register(req, res) {
  try {
    const data = req.body;

    const { error } = usuarioBodyValidation.validate(data);
    if(error){
      return handleErrorClient(res,400, error.details[0].message);
    }
    
    if (!data.email || !data.password) {
      return handleErrorClient(res, 400, "Email y contraseña son requeridos");
    }
    
    const newUser = await createUser(data);
    delete newUser.password; // Nunca devolver la contraseña
    handleSuccess(res, 201, "Usuario registrado exitosamente", newUser);
  } catch (error) {
    if (error.code === '23505') { // Código de error de PostgreSQL para violación de unique constraint
      handleErrorClient(res, 409, "El email ya está registrado");
    } else {
      handleErrorServer(res, 500, "Error interno del servidor", error.message);
    }
  }
}
