import { Collection, ObjectId } from "mongodb";
import { COLLECTIONS } from "../config/constants";
import { connectDB } from "../config/database";
import { Tickets } from "../interfaces/Tickets";


export async function crearTicket(ticket:Tickets) {
    
    const db = await connectDB();
    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);
    const resultado = await collection.insertOne(ticket);
    return resultado;
    
}

export async function obtenerTicketsPorUsuario(usuarioId:string) {

    const db = await connectDB();

    const ticketsCollection = db.collection<Tickets>(COLLECTIONS.TICKETS);

    const eventosCollection = db.collection(COLLECTIONS.EVENTS);

    const tickets = await ticketsCollection.find({

        usuarioId

    }).toArray();

    const resultado = [];

    for (const ticket of tickets) {

        const evento = await eventosCollection.findOne({

            _id: new ObjectId(ticket.eventoId)

        });

        resultado.push({

            ...ticket,

            evento

        });

    }

    return resultado;    
}

export async function contarTicketsVendidos() {

    const db = await connectDB();
    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);
    const totalTickets = await collection.aggregate([
        {
            $match: {
                estado: "PAGADO"
            }
        },
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$cantidad"
                }
            }
        }
    ]).toArray();

    return totalTickets.length > 0 ? totalTickets[0].total : 0;
    
}

export async function obtenerIngresosTotales() {

    const db = await connectDB ();
    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);
    const totalingresos = await collection.aggregate([
        {
            $match: {
                estado:"PAGADO"
            }
        },{
            $group: {
                _id: null,
                ingresos: {
                    $sum: "$precioTotal"
                }
            }
        }
    ]).toArray();

    return totalingresos.length > 0? totalingresos[0].ingresos : 0;

    
}

export async function obtenerUsuarioMasComprador() {

    const db = await connectDB();
    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);
    const usuarioComprador = await collection.aggregate([
        {
            $match:{
                estado:"PAGADO"
            }
        },
        {
            $group:{
                _id:"$usuarioId",
                ticketsComprados: {
                    $sum:"$cantidad"
                }
            }
        },
        {
            $sort:{
                ticketsComprados: -1
            }
        },
        {
            $limit: 1
        }
    ]).toArray();
    
    if(usuarioComprador.length === 0){
        return null;
    }

    return usuarioComprador[0];
    
}

export async function obtenerEventoMasVendido() {

    const db = await connectDB();

    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);

    const resultado = await collection.aggregate([
        {
            $match: {
                estado: "PAGADO"
            }
        },
        {
            $group: {
                _id: "$eventoId",
                ticketsVendidos: {
                    $sum: "$cantidad"
                },
                ingresos: {
                    $sum: "$precioTotal"
                }
            }
        },
        {
            $sort: {
                ticketsVendidos: -1,
                _id: 1
            }
        },
        {
            $limit: 1
        }
    ]).toArray();

    if(resultado.length === 0){
        return null;
    }

    return resultado[0];

}

export async function obtenerIngresosPorMes() {

    const db = await connectDB();

    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);

    const resultado = await collection.aggregate([
        {
            $match:{
                estado:"PAGADO"
            }
        },
        {
            $group:{
                _id:{
                    $substr:["$fechaCompra",0,7]
                },
                ingresos:{
                    $sum:"$precioTotal"
                }
            }
        },
        {
            $sort:{
                _id:1
            }
        }
    ]).toArray();

    return resultado;

}

export async function obtenerTopEventos(){

    const db = await connectDB();

    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);

    return await collection.aggregate([

        {
            $match:{
                estado:"PAGADO"
            }
        },

        {
            $group:{
                _id:"$eventoId",

                ticketsVendidos:{
                    $sum:"$cantidad"
                },

                ingresos:{
                    $sum:"$precioTotal"
                }
            }
        },

        {
            $sort:{
                ticketsVendidos:-1
            }
        },

        {
            $limit:5
        }

    ]).toArray();

}

export async function obtenerUltimasCompras(){

    const db = await connectDB();

    const collection = db.collection<Tickets>(COLLECTIONS.TICKETS);

    return await collection.find({

        estado:"PAGADO"

    })
    .sort({
        fechaCompra:-1
    })
    .limit(10)
    .toArray();

}