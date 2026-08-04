<template>

<nav class="bg-blue-600 text-white shadow-lg">

    <div class="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        <RouterLink
            to="/"
            class="text-2xl font-bold hover:text-gray-200 transition"
        >
            TicketPro
        </RouterLink>

        <div class="flex items-center gap-6 font-medium">

            <RouterLink
                v-if="!authStore.isAdmin"
                to="/"
                class="hover:text-gray-200 transition"
            >
                Inicio
            </RouterLink>

            <!-- Usuario -->

            <template v-if="authStore.isAuthenticated && !authStore.isAdmin">

                <RouterLink
                    to="/user/tickets"
                    class="hover:text-gray-200 transition"
                >
                    Mis Tickets
                </RouterLink>

            </template>

            <!-- Administrador -->

            <template v-if="authStore.isAdmin">

                <RouterLink
                    to="/admin/dashboard"
                    class="hover:text-gray-200 transition"
                >
                    Dashboard
                </RouterLink>

                <RouterLink
                    to="/admin/events"
                    class="hover:text-gray-200 transition"
                >
                    Administrar Eventos
                </RouterLink>

                <RouterLink
                    to="/admin/create-event"
                    class="hover:text-gray-200 transition"
                >
                    Crear Evento
                </RouterLink>

            </template>

            <!-- Invitado -->

            <template v-if="!authStore.isAuthenticated">

                <RouterLink
                    to="/login"
                    class="hover:text-gray-200 transition"
                >
                    Login
                </RouterLink>

                <RouterLink
                    to="/register"
                    class="hover:text-gray-200 transition"
                >
                    Registro
                </RouterLink>

            </template>

            <!-- Usuario logueado -->

            <template v-else>

                <span class="font-semibold">

                    {{ authStore.usuario?.nombre }}

                </span>

                <button
                    @click="cerrarSesion"
                    class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition"
                >
                    Cerrar sesión
                </button>

            </template>

        </div>

    </div>

</nav>

</template>

<script setup lang="ts">

import { RouterLink, useRouter } from "vue-router";

import { useAuthStore } from "../../stores/authStores";

const router = useRouter();

const authStore = useAuthStore();

function cerrarSesion() {

    authStore.logout();

    router.push("/");

}

</script>