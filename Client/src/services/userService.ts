import api from "./api";

export interface AdminUser {

    id: string;

    nombre: string;

    apellido: string;

    email: string;

    role: "USER" | "ADMIN";

}

/*
 * OBTENER USUARIOS
 */

export async function obtenerUsuarios(): Promise<AdminUser[]> {

    const response =
        await api.get("/auth/users");

    return response.data.usuarios;

}

/*
 * CAMBIAR ROL
 */

export async function cambiarRolUsuario(
    id: string,
    role: "USER" | "ADMIN"
) {

    const response =
        await api.patch(
            `/auth/users/${id}/role`,
            {
                role
            }
        );

    return response.data;

}

/*
 * ELIMINAR USUARIO
 */

export async function eliminarUsuario(
    id: string
) {

    const response =
        await api.delete(
            `/auth/users/${id}`
        );

    return response.data;

}