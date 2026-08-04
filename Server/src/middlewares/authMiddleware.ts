import { Request, Response, NextFunction } from "express";
import { authRequest } from "../interfaces/authRequest";
import jwt from "jsonwebtoken";

export function verificarToken ( req:authRequest, res:Response, next:NextFunction){
    
    const authHeader = req.headers.authorization;
    if(!authHeader){
        
        return res.status(401).json({
            success:false,
            mensaje:"Token no proporcionado"
        });

    }
    const token = authHeader.split(" ")[1];
    try {

        const payload = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as {
            id:string;
            email:string;
            role:"USER" | "ADMIN";            
        };
        req.usuario = payload;

        next();

    } catch {
        
        return res.status(401).json({
            success:false,
            mensaje:"Token invalido"
        });
    }
}
