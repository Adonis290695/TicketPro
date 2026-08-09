import { authRequest } from "../interfaces/authRequest";
import { Tickets } from "../interfaces/Tickets";
import { ticketsRequest } from "../interfaces/ticketsRequest";
import { crearTicket } from "../repositories/ticketsRepository";
import { obtenerEventosPorId as obtenerEventosPorIdRepository,
    actualizarEventoPorId as actualizarEventoPorIdRepository
} from "../repositories/eventRepository";
import { obtenerTicketsPorUsuario as obtenerTicketsPorUsuarioRepository } from "../repositories/ticketsRepository";

export async function crearTickets (datos:ticketsRequest, usuarioId:string) {

    const evento = await obtenerEventosPorIdRepository(datos.eventoId);
    if(!evento){
        return{
            success:false,
            mensaje:"Evento no encontrado."
        }
    }
    if(datos.cantidad <= 0){
        return{
            success:false,
            mensaje:"Cantidad invalida."
        }
    }
    if(evento.stockDisponible < datos.cantidad){
        return{
            success:false,
            mensaje:"No hay suficientes entradas"
        }
    }
    const precioUnitario = evento.precio;
    const precioTotal = datos.cantidad * precioUnitario;

    const nuevoStock = evento.stockDisponible - datos.cantidad;

    const datosActualizar = {
        stockDisponible : nuevoStock
    }; 
    
    await actualizarEventoPorIdRepository(evento._id.toString(), datosActualizar);

    const ticket: Tickets = {

        usuarioId,
        eventoId: evento._id.toString(),
        cantidad: datos.cantidad,
        precioUnitario,
        precioTotal,
        estado: "PAGADO",
        fechaCompra: new Date().toISOString()
    }

    const resultado = await crearTicket(ticket);
    
    return{
        success:true,
        mensaje:"Ticket comprado correctamente.",
        id: resultado.insertedId
    }
}

export async function obtenerTicketsPorUsuario(usuarioId:string) {

    const tickets = await obtenerTicketsPorUsuarioRepository(usuarioId);

    if (tickets.length === 0) {

        return {

            success: false,
            mensaje: "No tiene tickets comprados.",
            tickets: []

        };

    }

    const ticketsFormateados = tickets.map((ticket: any) => ({

        cantidad: ticket.cantidad,

        precioUnitario: ticket.precioUnitario,

        precioTotal: ticket.precioTotal,

        estado: ticket.estado,

        fechaCompra: ticket.fechaCompra,

        evento: {

            id: ticket.evento?._id,

            nombre: ticket.evento?.nombre,

            fecha: ticket.evento?.fecha,

            hora: ticket.evento?.hora,

            ubicacion: ticket.evento?.ubicacion,

            precio: ticket.evento?.precio

        }

    }));

    return {

        success: true,

        mensaje: "Tus tickets son:",

        tickets: ticketsFormateados

    };    
}