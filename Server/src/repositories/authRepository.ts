import { COLLECTIONS } from "../config/constants";
import { connectDB } from "../config/database";
import { user } from "../interfaces/User";
import { ObjectId } from "mongodb";

export async function guardarUsuario(usuario: user) {
    
    const db = await connectDB();

    const collection = db.collection<user>(COLLECTIONS.USERS);

    const resultado = await collection.insertOne(usuario);

    return resultado;
}

export async function buscarUsuarioPorEmail(email:string) {

    const db = await connectDB();
    const collection = db.collection<user>(COLLECTIONS.USERS);
    const resultado = await collection.findOne({email});
    return resultado;
    
}

export async function buscarUsuarioPorId(id:string){

    const db = await connectDB();

    const collection = db.collection<user>(COLLECTIONS.USERS);

    const usuario = await collection.findOne({
        _id:new ObjectId(id)
    });

    return usuario;

}

export async function contarUsuario() {    

    const db = await connectDB();
    const collection = db.collection<user>(COLLECTIONS.USERS);
    const totalUsuarios = await collection.countDocuments();
    return totalUsuarios;
    
}