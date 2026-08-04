import { Router } from "express";
import { verificarToken } from "../middlewares/authMiddleware";
import { verificarAdmin } from "../middlewares/roleMiddleware";
import { crearEventoNuevo } from "../controllers/eventController";
import { listarEventos } from "../controllers/eventController";
import { listarEventosPorId } from "../controllers/eventController";
import { actualizarListarEventosPorId } from "../controllers/eventController";
import { eliminarEventos } from "../controllers/eventController";

const router = Router ();

router.post("/events",verificarToken,verificarAdmin,crearEventoNuevo);
router.get("/events",listarEventos);
router.get("/events/:id",listarEventosPorId);
router.patch("/events/:id",verificarToken,verificarAdmin,actualizarListarEventosPorId);
router.delete("/events/:id",verificarToken,verificarAdmin,eliminarEventos);

export default router;

