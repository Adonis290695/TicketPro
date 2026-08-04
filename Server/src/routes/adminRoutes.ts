import { Router } from "express";
import { obtenerDashboard } from "../controllers/adminController";
import { verificarAdmin } from "../middlewares/roleMiddleware";
import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/dashboard", verificarToken, verificarAdmin, obtenerDashboard);

export default router;
