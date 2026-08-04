import { Request, Response } from "express";
import { Event } from "../interfaces/Event";
import { EventRequest } from "../interfaces/EventRequest";
import { EventFilterRequest } from "../interfaces/EventFilterRequest";
import { crearEvento } from "../services/eventService";
import { obtenereventos } from "../services/eventService";
import { obtenerEventosPorId } from "../services/eventService";
import { actualizarEventoPorId } from "../services/eventService";
import { eliminarEvento } from "../services/eventService";

export async function crearEventoNuevo(req:Request, res:Response) {

    const datos : EventRequest = req.body;
    const nuevoEvento = await crearEvento(datos);
    res.json(nuevoEvento);

}

export async function listarEventos(req:Request, res:Response) {

    const page = req.query.page === undefined?1 :Number(req.query.page);
    const limit = req.query.limit === undefined?10:Number(req.query.limit);

    if(Number.isNaN(page) || Number.isNaN(limit)){
        return res.json({
            success:false, 
            mensaje:"Página o límite inválidos."
        })
    }    

    const filtros: EventFilterRequest = {
        page,
        limit,
        nombre: req.query.nombre as string | undefined,
        ubicacion: req.query.ubicacion as string | undefined,
    };

        const obtenerVariosEventos = await obtenereventos (filtros);
    res.json(obtenerVariosEventos);    
}

export async function listarEventosPorId(req:Request, res:Response) {

    const id = req.params.id as string;
    const obtenerVariosEventosPorId = await obtenerEventosPorId(id);
    res.json(obtenerVariosEventosPorId);

}

export async function actualizarListarEventosPorId(req:Request, res:Response) {
    
    const id = req.params.id as string;
    const datos : Partial <EventRequest> = req.body;
    const actualizarListadeEventoPorId = await actualizarEventoPorId(id,datos);
    res.json(actualizarListadeEventoPorId);
}

export async function eliminarEventos(req: Request, res:Response) {

    const id = req.params.id as string;
    const resultado = await eliminarEvento(id);
    res.json(resultado);
    
}


