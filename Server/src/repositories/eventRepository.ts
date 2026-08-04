import { COLLECTIONS } from "../config/constants";
import { connectDB } from "../config/database";
import { Event } from "../interfaces/Event";
import { EventFilterRequest } from "../interfaces/EventFilterRequest";
import { ObjectId } from "mongodb";



export async function crearEventoNuevo(evento:Event) {
    
    const db = await connectDB ();
    const collection = db.collection(COLLECTIONS.EVENTS);
    const resultado = await collection.insertOne(evento);
    return resultado; 
}

export async function obtenerEventos(filtros: EventFilterRequest) {

    const db = await connectDB ();
    const collection = db.collection(COLLECTIONS.EVENTS);
    const {page, limit, nombre, ubicacion} = filtros;
    const query: any = {};
    if(nombre){
        query.nombre = {
            $regex: nombre,
            $options: "i"
        };
    }
    if(ubicacion){
        query.ubicacion = {
            $regex: ubicacion,
            $options: "i"
        } 
    }
    const skip = ( page - 1 ) * limit;
        const resultado = await collection
    .find(query)
    .skip(skip)
    .limit(limit)
    .toArray();
    const total = await collection.countDocuments(query);
    return {
        eventos: resultado,
        total
    }
}

export async function obtenerEventosPorId(id:string){

    const db = await connectDB ();
    const collection = db.collection<Event>(COLLECTIONS.EVENTS);
    const evento = await collection.findOne({
        _id: new ObjectId(id)
    });
    return evento;
}

export async function actualizarEventoPorId(id:string, datos:Partial<Event>){

    const db = await connectDB();
    const collection = db.collection(COLLECTIONS.EVENTS);
    const eventoActualizado = await collection.updateOne(
        {
            _id: new ObjectId(id)
        },
        {
            $set: datos
        }
    );
    return eventoActualizado;
    
}

export async function eliminarEvento(id:string) {
    
    const db = await connectDB();
    const collection = db.collection(COLLECTIONS.EVENTS);
    const resultado = await collection.deleteOne({
        _id: new ObjectId(id)
    })
    return resultado;
}

export async function contarEventos() {

    const db = await connectDB();
    const collection = db.collection<Event>(COLLECTIONS.EVENTS);
    const totalEventos = await collection.countDocuments();
    return totalEventos;    
}

export async function obtenerEventosPorMes() {

    const db = await connectDB();

    const collection = db.collection<Event>(COLLECTIONS.EVENTS);

    const resultado = await collection.aggregate([
        {
            $group: {
                _id: {
                    $substr: ["$fecha", 0, 7]
                },
                cantidad: {
                    $sum: 1
                }
            }
        },
        {
            $sort: {
                _id: 1
            }
        }
    ]).toArray();

    return resultado;

}

export async function obtenerProximosEventos(){

    const db = await connectDB();

    const collection = db.collection<Event>(COLLECTIONS.EVENTS);

    const hoy = new Date().toISOString().split("T")[0];

    return await collection.find({

        fecha:{
            $gte:hoy
        }

    })
    .sort({

        fecha:1

    })
    .limit(5)
    .toArray();

}