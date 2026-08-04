import api from "./api";
import type { Event } from "../interfaces/Event";
import type { EventFilter } from "../interfaces/EventFilter";



export async function obtenerEventos(
    filtros: EventFilter,
    page = 1,
    limit = 10
):Promise<Event[]> {

    const response = await api.get(`/events`,{
        params:{
            nombre: filtros.nombre,
            ubicacion: filtros.ubicacion,
            page,
            limit
        }
    });

    return response.data.eventos;
    
}

export async function obtenerEventoPorId(id: string): Promise<Event> {
    
    const response = await api.get(`/events/${id}`);

    return response.data.evento;    
}
