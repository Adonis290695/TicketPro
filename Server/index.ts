import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes";
import { connectDB } from "./src/config/database";
import eventRoutes from "./src/routes/eventRoutes";
import ticketsRoutes from "./src/routes/ticketsRoutes";
import adminRoutes from "./src/routes/adminRoutes";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", eventRoutes);
app.use("/api", ticketsRoutes);
app.use("/api/admin", adminRoutes);

async function iniciarServidor() {
    try {

        await connectDB();

        console.log("✅ MongoDB conectado");

        app.listen(process.env.PORT || 3000, () => {
            console.log("Servidor iniciado");
        });

    } catch (error) {

        console.error("Error conectando a MongoDB");

        console.error(error);

    }
}

iniciarServidor();