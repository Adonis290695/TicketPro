import { Request, Response } from "express";

import { RegisterRequest } from "../interfaces/RegisterRequest";
import { LoginRequest } from "../interfaces/LoginRequest";

import {
    registrarUsuario,
    loginUsuario,
    obtenerUsuarioPorId,
    obtenerUsuarios,
    cambiarRolUsuario,
    eliminarUsuario as eliminarUsuarioService
} from "../services/authService";

import { authRequest } from "../interfaces/authRequest";

/*
 * REGISTRAR
 */

export async function registrar(
    req: Request,
    res: Response
) {

    const datos: RegisterRequest = req.body;

    const respuesta =
        await registrarUsuario(datos);

    res.json(respuesta);

}

/*
 * LOGIN
 */

export async function login(
    req: Request,
    res: Response
) {

    const datos: LoginRequest = req.body;

    const respuesta =
        await loginUsuario(datos);

    if (!respuesta.success) {

        return res
            .status(401)
            .json(respuesta);

    }

    res.json(respuesta);

}

/*
 * PERFIL
 */

export async function perfil(
    req: authRequest,
    res: Response
) {

    const usuario =
        await obtenerUsuarioPorId(
            req.usuario!.id
        );

    if (!usuario) {

        return res
            .status(404)
            .json({

                success: false,

                mensaje:
                    "Usuario no encontrado"

            });

    }

    res.json({

        success: true,

        usuario

    });

}

/*
 * LISTAR USUARIOS
 */

export async function listarUsuarios(
    req: Request,
    res: Response
) {

    const usuarios =
        await obtenerUsuarios();

    res.json({

        success: true,

        usuarios

    });

}

/*
 * CAMBIAR ROL
 */

export async function cambiarRol(
    req: authRequest,
    res: Response
) {

    const id =
        req.params.id as string;

    const { role } = req.body;

    /*
     * ID del administrador que está
     * realizando la petición.
     */

    const administradorId =
        req.usuario!.id;

    /*
     * No puede modificar su propio rol.
     */

    if (administradorId === id) {

        return res
            .status(400)
            .json({

                success: false,

                mensaje:
                    "No puedes cambiar tu propio rol de administrador."

            });

    }

    const resultado =
        await cambiarRolUsuario(
            id,
            role
        );

    if (!resultado.success) {

        return res
            .status(400)
            .json(resultado);

    }

    res.json(resultado);

}

/*
 * ELIMINAR USUARIO
 */

export async function eliminarUsuario(
    req: authRequest,
    res: Response
) {

    const id =
        req.params.id as string;

    /*
     * ID del administrador autenticado.
     */

    const administradorId =
        req.usuario!.id;

    /*
     * PROTECCIÓN:
     * el administrador no puede
     * eliminarse a sí mismo.
     */

    if (administradorId === id) {

        return res
            .status(400)
            .json({

                success: false,

                mensaje:
                    "No puedes eliminar tu propia cuenta de administrador."

            });

    }

    /*
     * Eliminamos al usuario.
     */

    const resultado =
        await eliminarUsuarioService(id);

    if (!resultado.success) {

        return res
            .status(404)
            .json(resultado);

    }

    res.json(resultado);

}