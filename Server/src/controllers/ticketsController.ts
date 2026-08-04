import { Response} from "express"; 
import { authRequest } from "../interfaces/authRequest";
import { ticketsRequest } from "../interfaces/ticketsRequest";
import { crearTickets } from "../services/ticketsService";
import { obtenerTicketsPorUsuario } from "../services/ticketsService";

export async function crearTicket(req:authRequest, res:Response) {
    
    const datos : ticketsRequest = req.body;
    const usuarioId = req.usuario!.id;
    const resultado = await crearTickets(datos, usuarioId);
    res.json(resultado);
}
export async function listarTicketsPorUsuario(req: authRequest, res:Response) {

    const usuarioId = req.usuario!.id;
    const resultado = await obtenerTicketsPorUsuario(usuarioId);
    res.json(resultado);
}


