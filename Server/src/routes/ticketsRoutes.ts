import { Router } from "express";
import { verificarToken } from "../middlewares/authMiddleware";
import { crearTicket } from "../controllers/ticketsController";
import { listarTicketsPorUsuario } from "../controllers/ticketsController";

const router = Router ();

router.post("/ticket",verificarToken,crearTicket);
router.get("/ticket",verificarToken,listarTicketsPorUsuario);

export default router;