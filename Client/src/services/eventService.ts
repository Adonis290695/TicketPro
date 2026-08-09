import api from "./api";
import type { Event } from "../interfaces/Event";
import type { EventFilter } from "../interfaces/EventFilter";
import type { EventRequest } from "../interfaces/EventRequest";



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

export async function crearEvento(datos:EventRequest) {

    const token = localStorage.getItem("token");

    const response = await api.post(
        "/events",
        datos,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
    
}

export async function editarEvento(id: string, datos:EventRequest) {

    const token = localStorage.getItem("token");

    const response = await api.patch(
        `/events/${id}`,
        datos,
        {
            headers:{
                Authorization:`Bearer ${token}`
            }
        }
    );
    
    return response.data
    
}

export async function eliminarEvento(id:string) {

    const response = await api.delete(`/events/${id}`)

    return response.data
    
}
