import { defineStore } from "pinia";
import { ref, computed } from "vue";

import type { PendingAction } from "../interfaces/PendingAction";
import type { LoginRequest } from "../interfaces/LoginRequest";
import type { RegisterRequest } from "../interfaces/RegisterRequest";
import type { User } from "../interfaces/User";

import {
    login as loginService,
    register as registerService,
    obtenerPerfil
} from "../services/authService";

export const useAuthStore = defineStore("auth", () => {

    const token = ref(localStorage.getItem("token") || "");

    const usuario = ref<User | null>(null);

    const pendingAction = ref<PendingAction | null>(null);

    const isAuthenticated = computed(() => usuario.value !== null);

    const isAdmin = computed(() => usuario.value?.role === "ADMIN");

    async function login(datos: LoginRequest) {

        const respuesta = await loginService(datos);

        token.value = respuesta.token;

        localStorage.setItem("token", respuesta.token);

        await cargarPerfil();

    }

    async function register(datos: RegisterRequest) {

        await registerService(datos);

        await login({

            email: datos.email,
            password: datos.password

        });

    }

    async function cargarPerfil() {

        const respuesta = await obtenerPerfil();

        usuario.value = respuesta.usuario;

    }

    async function inicializarSesion() {

        if (!token.value) return;

        try {

            await cargarPerfil();

        } catch {

            logout();

        }

    }

    function logout() {

        token.value = "";

        usuario.value = null;

        pendingAction.value = null;

        localStorage.removeItem("token");

    }

    function guardarPendingAction(action: PendingAction) {

        pendingAction.value = action;

    }

    function limpiarPendingAction() {

        pendingAction.value = null;

    }

    return {

        token,
        usuario,

        pendingAction,

        isAuthenticated,
        isAdmin,

        login,
        register,
        cargarPerfil,
        inicializarSesion,
        logout,

        guardarPendingAction,
        limpiarPendingAction

    };

});