import { Router } from "express";

import {
    verificarToken
} from "../middlewares/authMiddleware";

import {
    verificarAdmin
} from "../middlewares/roleMiddleware";

import {
    registrar,
    login,
    perfil,
    listarUsuarios,
    cambiarRol,
    eliminarUsuario
} from "../controllers/authController";

const router = Router();

/*
 * REGISTRO
 */

router.post(
    "/register",
    registrar
);

/*
 * LOGIN
 */

router.post(
    "/login",
    login
);

/*
 * PERFIL
 */

router.get(
    "/me",
    verificarToken,
    perfil
);

/*
 * LISTAR USUARIOS
 */

router.get(
    "/users",
    verificarToken,
    verificarAdmin,
    listarUsuarios
);

/*
 * CAMBIAR ROL
 */

router.patch(
    "/users/:id/role",
    verificarToken,
    verificarAdmin,
    cambiarRol
);

/*
 * ELIMINAR USUARIO
 */

router.delete(
    "/users/:id",
    verificarToken,
    verificarAdmin,
    eliminarUsuario
);

export default router;