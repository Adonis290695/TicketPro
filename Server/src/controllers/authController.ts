import { Request, Response } from "express";
import { RegisterRequest } from "../interfaces/RegisterRequest";
import { LoginRequest } from "../interfaces/LoginRequest";
import { registrarUsuario, loginUsuario } from "../services/authService";
import { authRequest } from "../interfaces/authRequest";
import { obtenerUsuarioPorId } from "../services/authService";




export async function registrar (req: Request, res: Response){
    
    const datos: RegisterRequest = req.body;

    const respuesta = await registrarUsuario(datos);

    res.json(respuesta);
}
export async function login(req: Request, res:Response) {
    
    const datos:LoginRequest = req.body;
    const respuesta = await loginUsuario(datos);

    if (!respuesta.success) {

        return res.status(401).json(respuesta);

    }

     res.json(respuesta);

}
export async function perfil(req: authRequest, res: Response) {

    const usuario = await obtenerUsuarioPorId(req.usuario!.id);

    if (!usuario) {

        return res.status(404).json({

            success: false,
            mensaje: "Usuario no encontrado"

        });

    }

    res.json({

        success: true,
        usuario

    });

}