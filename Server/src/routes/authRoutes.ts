import { Router } from "express";
import { verificarToken } from "../middlewares/authMiddleware";
import { registrar } from "../controllers/authController";
import { login, perfil } from "../controllers/authController";


const router = Router();



router.post("/register",registrar);
router.post("/login",login);
router.get("/me",verificarToken, perfil);

export default router;