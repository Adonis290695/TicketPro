import api from "./api";

import type { LoginRequest } from "../interfaces/LoginRequest";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import type { authResponse } from "../interfaces/AuthResponse";

export async function login(datos: LoginRequest): Promise<authResponse> {

    const response = await api.post("/auth/login", datos);

    return response.data;

}

export async function register(datos: RegisterRequest): Promise<authResponse> {

    const response = await api.post("/auth/register", datos);

    return response.data;

}

export async function obtenerPerfil() {

    const token = localStorage.getItem("token");

    const response = await api.get("/auth/me", {

        headers: {

            Authorization: `Bearer ${token}`

        }

    });

    return response.data;

}