import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI!;
const dbName = process.env.DB_NAME!;

let db: Db;

export async function connectDB(): Promise<Db> {

    if (db) {
        return db;
    }

    const client = new MongoClient(uri);

    await client.connect();

    db = client.db(dbName);

    return db;
    
}