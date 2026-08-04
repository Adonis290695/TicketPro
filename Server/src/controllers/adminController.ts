import { Request, Response } from "express";
import { obtenerDashboardAdmin } from "../services/adminService";

export async function obtenerDashboard(req:Request, res:Response) {

    const resultado = await obtenerDashboardAdmin();

    res.json(resultado);
    
}