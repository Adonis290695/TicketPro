import { Event } from "../interfaces/Event";
import { EventRequest } from "../interfaces/EventRequest";
import { EventFilterRequest } from "../interfaces/EventFilterRequest";
import { crearEventoNuevo, obtenerEventos } from "../repositories/eventRepository";
import { obtenerEventos as obtenerEventosRepository} from "../repositories/eventRepository";
import { obtenerEventosPorId as obtenerEventosPorIdRepository } from "../repositories/eventRepository";
import { actualizarEventoPorId as actualizarEventoPorIdRepository } from "../repositories/eventRepository";
import { eliminarEvento as eliminarEventoRepository } from "../repositories/eventRepository";

export async function crearEvento(datos:EventRequest) {

    const evento = {
        ...datos,
        stockDisponible: datos.stockTotal
    }
    const respuesta = await crearEventoNuevo(evento);
    return{
        success:true,
        mensaje:"Evento creado correctamente",
        id: respuesta.insertedId
    }

}

export async function obtenereventos(filtros: EventFilterRequest) {
    
    const {page, limit} = filtros;

    if(page < 1){
        return{
            success:false,
            mensaje:"Pagina no encontrada."
        }
    }
    if(limit < 1){
        return{
            success:false,
            mensaje:"Limite no definido."
        }
    }
    if(limit > 100 ){
        return{
            success:false,
            mensaje:"El limite maximo es 100."
        }
    }

    const resultado = await obtenerEventosRepository(filtros);
    if(resultado.eventos.length === 0){
        return{
            success:true,
            mensaje:"No se encontraron eventos.",
            eventos:[]
        };
    }

    const totalPaginas = Math.ceil(resultado.total/limit);

    return {
        success:true,
        mensaje:"Eventos disponibles",
        pagina:page,
        limite:limit,
        total:resultado.total,
        totalpaginas:totalPaginas,
        eventos:resultado.eventos
    };
    
}

export async function obtenerEventosPorId(id:string) {

    const evento = await obtenerEventosPorIdRepository(id);
    if(!evento){
        return{
            success:false,
            mensaje:"Evento no encontrado."
        }
    }
    return {
        success:true,
        mensaje:"EL EVENTO ES: ",
        evento
    }
    
}

export async function actualizarEventoPorId(id: string, datos: Partial<EventRequest>){

    const evento = await obtenerEventosPorIdRepository(id);

    if (!evento) {
        return {
            success: false,
            mensaje: "Evento no encontrado"
        };
    }

    const datosActualizar: Partial<Event> = {
        ...datos
    };

    if (datos.stockTotal !== undefined) {

        datosActualizar.stockDisponible =
            evento.stockDisponible +
            (datos.stockTotal - evento.stockTotal);

    }

    const event = await actualizarEventoPorIdRepository(
        id,
        datosActualizar
    );

    return {
        success: true,
        mensaje: "Evento actualizado correctamente",
        event
    };

}

export async function eliminarEvento(id: string) {

    const evento = await obtenerEventosPorIdRepository(id);
    if(!evento){
        return {
            success:false,
            mensaje:"Evento no encontrado."
        }
    }
    const resultado = await eliminarEventoRepository(id);
    return{
        success:true,
        mensaje:"Evento eliminado.",
        resultado
    }
    
}