import { Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authRequest";

export function verificarAdmin(req:authRequest, res:Response, next:NextFunction){
    
    if(!req.usuario){
        return res.status(401).json({
            success:false,
            mensaje:"Usuario no encontrado."
        });
    }

    if(req.usuario.role !== "ADMIN"){
        return res.status(403).json({
            success:false,
            mensaje:"No tiene permisos para realizar esta acción"
        });
    }

    next();
    
}