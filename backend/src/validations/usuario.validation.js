"use strict";
import Joi from "joi";

export const usuarioBodyValidation = Joi.object({
    email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|gmail\.cl)$/)
    .required()
    .min(15)
    .max(30)
    .messages({
        "string.pattern.base": "El correo electrónico debe ser formato @gmail.com o @gmail.cl",
        "string.min": "El correo debe tener una extensión mínima de 15 caracteres",
        "string.max": "El correo electrónico debe tener una extensión máxima de 30 caracteres",
        "string.empty": "El correo electrónico es obligatorio"
    }),
    password:Joi.string()
    .pattern(/^[a-zA-Z0-9]*$/)
    .required()
    .min(10)
    .messages({
        "string password": "La contraseña es obligatoria",
        "string.min": "La contraseña es muy debil, minimo 10 caracteres",
        "string.base": "La contraseña debe ser tipo caracter",
        "string.pattern.base": "La contraseña no puede tener caracteres especiales"
    })


})