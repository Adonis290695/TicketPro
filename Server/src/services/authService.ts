import { user } from "../interfaces/User";
import { RegisterRequest } from "../interfaces/RegisterRequest";
import { LoginRequest } from "../interfaces/LoginRequest";
import {
    guardarUsuario,
    buscarUsuarioPorEmail,
    buscarUsuarioPorId
} from "../repositories/authRepository";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registrarUsuario(datos: RegisterRequest) {

    const usuarioExiste = await buscarUsuarioPorEmail(datos.email);

    if (usuarioExiste !== null) {

        return {
            success: false,
            mensaje: "El correo ya existe. Ingrese un nuevo correo"
        };

    }

    const passwordHash = await bcrypt.hash(datos.password, 10);

    const nuevoUsuario: user = {

        nombre: datos.nombres,
        apellido: datos.apellidos,
        email: datos.email,
        password: passwordHash,
        role: "USER"

    };

    const resultado = await guardarUsuario(nuevoUsuario);

    return {

        success: true,
        mensaje: "Usuario registrado correctamente",
        id: resultado.insertedId

    };

}

export async function loginUsuario(datos: LoginRequest) {

    const usuario = await buscarUsuarioPorEmail(datos.email);

    if (usuario === null) {

        return {

            success: false,
            mensaje: "Correo o contraseña incorrectos"

        };

    }

    const passwordCorrecto = await bcrypt.compare(datos.password, usuario.password);

    if (!passwordCorrecto) {

        return {

            success: false,
            mensaje: "Correo o contraseña incorrectos"

        };

    }

    const token = jwt.sign(

        {

            id: usuario._id,
            email: usuario.email,
            role: usuario.role

        },

        process.env.JWT_SECRET!,

        {

            expiresIn: "1h"

        }

    );

    return {

        success: true,
        mensaje: "Login correcto",
        token

    };

}

export async function obtenerUsuarioPorId(id: string) {

    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {

        return null;

    }

    return {

        id: usuario._id.toString(),
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        role: usuario.role

    };

}