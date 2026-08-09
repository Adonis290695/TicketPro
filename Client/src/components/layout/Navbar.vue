<template>

<nav class="bg-blue-600 text-white shadow-lg">

    <div class="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

        <!-- LOGO -->

        <RouterLink
            to="/"
            class="text-2xl font-bold hover:text-gray-200 transition"
        >
            TicketPro
        </RouterLink>


        <div class="flex items-center gap-6 font-medium">


            <!-- INICIO -->

            <RouterLink
                v-if="!authStore.isAdmin"
                to="/"
                class="hover:text-gray-200 transition"
            >
                Inicio
            </RouterLink>


            <!-- ========================= -->
            <!-- USUARIO -->
            <!-- ========================= -->

            <template
                v-if="
                    authStore.isAuthenticated &&
                    !authStore.isAdmin
                "
            >

                <RouterLink
                    to="/user/tickets"
                    class="hover:text-gray-200 transition"
                >
                    Mis Tickets
                </RouterLink>

            </template>


            <!-- ========================= -->
            <!-- ADMINISTRADOR -->
            <!-- ========================= -->

            <template v-if="authStore.isAdmin">

                <!-- Dashboard -->

                <RouterLink
                    to="/admin/dashboard"
                    class="hover:text-gray-200 transition"
                >
                    Dashboard
                </RouterLink>


                <!-- Estadísticas -->

                <RouterLink
                    to="/admin/statistics"
                    class="hover:text-gray-200 transition"
                >
                    Estadísticas
                </RouterLink>

                <!--Users-->

                <RouterLink
                    to="/admin/users"
                    class="hover:text-gray-200 transition"
                >
                    Usuarios
                </RouterLink>

                <!-- Administrar eventos -->

                <RouterLink
                    to="/admin/events"
                    class="hover:text-gray-200 transition"
                >
                    Administrar Eventos
                </RouterLink>


                <!-- Crear evento -->

                <RouterLink
                    to="/admin/create-event"
                    class="hover:text-gray-200 transition"
                >
                    Crear Evento
                </RouterLink>

            </template>


            <!-- ========================= -->
            <!-- INVITADO -->
            <!-- ========================= -->

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


            <!-- ========================= -->
            <!-- USUARIO AUTENTICADO -->
            <!-- ========================= -->

            <template v-else>

                <span class="font-semibold">

                    {{ authStore.usuario?.nombre }}

                </span>


                <button
                    @click="cerrarSesion"
                    class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded transition"
                >
                    Cerrar sesión
                </button>

            </template>

        </div>

    </div>

</nav>

</template>


<script setup lang="ts">

import {
    RouterLink,
    useRouter
} from "vue-router";

import {
    useAuthStore
} from "../../stores/authStores";


/*
|--------------------------------------------------------------------------
| ROUTER
|--------------------------------------------------------------------------
*/

const router = useRouter();


/*
|--------------------------------------------------------------------------
| STORE DE AUTENTICACIÓN
|--------------------------------------------------------------------------
*/

const authStore = useAuthStore();


/*
|--------------------------------------------------------------------------
| CERRAR SESIÓN
|--------------------------------------------------------------------------
*/

function cerrarSesion() {

    authStore.logout();

    router.push("/");

}

</script>