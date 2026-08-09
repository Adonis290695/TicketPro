<template>

    <Navbar />

    <section class="max-w-7xl mx-auto px-8 py-10">

        <div
            class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8"
        >

            <div>

                <h1 class="text-4xl font-bold">
                    Usuarios
                </h1>

                <p class="text-gray-500 mt-2">
                    Administra los usuarios registrados en el sistema.
                </p>

            </div>

            <div
                class="bg-blue-100 text-blue-700 px-5 py-3 rounded-lg"
            >

                Total:

                <span class="font-bold">
                    {{ usuariosFiltrados.length }}
                </span>

            </div>

        </div>


        <!-- BUSCADOR -->

        <div class="mb-6">

            <input
                v-model="buscar"
                type="text"
                placeholder="Buscar por nombre, apellido o correo..."
                class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

        </div>


        <!-- CARGANDO -->

        <div
            v-if="cargando"
            class="bg-white rounded-xl shadow p-16 flex flex-col items-center justify-center"
        >

            <div
                class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            ></div>

            <p class="mt-5 text-gray-500">
                Cargando usuarios...
            </p>

        </div>


        <!-- ERROR -->

        <div
            v-else-if="error"
            class="bg-red-100 text-red-700 rounded-xl p-6"
        >

            {{ error }}

        </div>


        <!-- TABLA -->

        <div
            v-else
            class="overflow-x-auto bg-white rounded-xl shadow"
        >

            <table class="min-w-full">

                <thead class="bg-gray-100">

                    <tr>

                        <th class="px-6 py-4 text-left">
                            Nombre
                        </th>

                        <th class="px-6 py-4 text-left">
                            Apellido
                        </th>

                        <th class="px-6 py-4 text-left">
                            Correo
                        </th>

                        <th class="px-6 py-4 text-center">
                            Rol
                        </th>

                        <th class="px-6 py-4 text-center">
                            Acción
                        </th>

                    </tr>

                </thead>


                <tbody>

                    <tr
                        v-for="usuario in usuariosFiltrados"
                        :key="usuario.id"
                        class="border-t hover:bg-gray-50"
                    >

                        <td class="px-6 py-4 font-semibold">
                            {{ usuario.nombre }}
                        </td>


                        <td class="px-6 py-4">
                            {{ usuario.apellido }}
                        </td>


                        <td class="px-6 py-4">
                            {{ usuario.email }}
                        </td>


                        <td class="px-6 py-4 text-center">

                            <span
                                :class="
                                    usuario.role === 'ADMIN'
                                        ? 'bg-purple-100 text-purple-700'
                                        : 'bg-blue-100 text-blue-700'
                                "
                                class="px-3 py-1 rounded-full text-sm font-semibold"
                            >

                                {{ usuario.role }}

                            </span>

                        </td>


                        <!-- ACCIONES -->

                        <td class="px-6 py-4">

                            <div
                                v-if="usuario.id === authStore.usuario?.id"
                                class="text-center"
                            >

                                <span
                                    class="text-gray-500 text-sm font-medium"
                                >

                                    Cuenta actual

                                </span>

                            </div>


                            <div
                                v-else
                                class="flex justify-center gap-3"
                            >

                                <!-- CAMBIAR ROL -->

                                <button
                                    @click="cambiarRol(usuario)"
                                    :disabled="cambiandoRol === usuario.id"
                                    class="bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition"
                                >

                                    {{
                                        cambiandoRol === usuario.id
                                            ? "Actualizando..."
                                            : usuario.role === "USER"
                                                ? "Hacer Admin"
                                                : "Hacer Usuario"
                                    }}

                                </button>


                                <!-- ELIMINAR -->

                                <button
                                    @click="eliminarUsuario(usuario)"
                                    :disabled="eliminandoUsuario === usuario.id"
                                    class="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition"
                                >

                                    {{
                                        eliminandoUsuario === usuario.id
                                            ? "Eliminando..."
                                            : "Eliminar"
                                    }}

                                </button>

                            </div>

                        </td>

                    </tr>


                    <!-- SIN RESULTADOS -->

                    <tr
                        v-if="usuariosFiltrados.length === 0"
                    >

                        <td
                            colspan="5"
                            class="text-center py-10 text-gray-500"
                        >

                            No se encontraron usuarios.

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </section>

</template>


<script setup lang="ts">

import { ref, computed, onMounted } from "vue";

import Navbar from "../../components/layout/Navbar.vue";

import { useAuthStore } from "../../stores/authStores";

import {
    obtenerUsuarios,
    cambiarRolUsuario,
    eliminarUsuario as eliminarUsuarioService
} from "../../services/userService";

import type { AdminUser } from "../../services/userService";


/*
 * STORE DE AUTENTICACIÓN
 */

const authStore = useAuthStore();


/*
 * LISTA DE USUARIOS
 */

const usuarios = ref<AdminUser[]>([]);


/*
 * BUSCADOR
 */

const buscar = ref("");


/*
 * ESTADO DE CARGA
 */

const cargando = ref(false);


/*
 * MENSAJE DE ERROR
 */

const error = ref("");


/*
 * USUARIO AL QUE SE LE ESTÁ
 * CAMBIANDO EL ROL
 */

const cambiandoRol = ref<string | null>(null);


/*
 * USUARIO QUE SE ESTÁ ELIMINANDO
 */

const eliminandoUsuario = ref<string | null>(null);


/*
 * FILTRAR USUARIOS
 */

const usuariosFiltrados = computed(() => {

    const texto =
        buscar.value
            .toLowerCase()
            .trim();

    if (!texto) {

        return usuarios.value;

    }

    return usuarios.value.filter(usuario =>

        usuario.nombre
            .toLowerCase()
            .includes(texto)

        ||

        usuario.apellido
            .toLowerCase()
            .includes(texto)

        ||

        usuario.email
            .toLowerCase()
            .includes(texto)

    );

});


/*
 * CARGAR USUARIOS
 */

async function cargarUsuarios() {

    cargando.value = true;

    error.value = "";

    try {

        usuarios.value =
            await obtenerUsuarios();

    } catch (err) {

        console.error(err);

        error.value =
            "No se pudieron cargar los usuarios.";

    } finally {

        cargando.value = false;

    }

}
/*
 * CAMBIAR ROL
 */

async function cambiarRol(
    usuario: AdminUser
) {

    /*
     * Protección adicional en el frontend.
     *
     * El backend también tiene esta protección,
     * por lo que aquí simplemente evitamos
     * realizar la petición.
     */

    if (
        usuario.id ===
        authStore.usuario?.id
    ) {

        return;

    }


    const nuevoRol:
        "USER" | "ADMIN" =
        usuario.role === "USER"
            ? "ADMIN"
            : "USER";


    const confirmar =
        confirm(
            `¿Deseas cambiar el rol de ${usuario.nombre} ${usuario.apellido} a ${nuevoRol}?`
        );


    if (!confirmar) {

        return;

    }


    cambiandoRol.value =
        usuario.id;


    try {

        const resultado =
            await cambiarRolUsuario(
                usuario.id,
                nuevoRol
            );


        if (!resultado.success) {

            alert(
                resultado.mensaje ||
                "No se pudo actualizar el rol."
            );

            return;

        }


        /*
         * Actualizamos el usuario
         * directamente en la lista.
         */

        usuario.role =
            nuevoRol;


    } catch (err) {

        console.error(err);

        alert(
            "Ocurrió un error al actualizar el rol."
        );

    } finally {

        cambiandoRol.value = null;

    }

}


/*
 * ELIMINAR USUARIO
 */

async function eliminarUsuario(
    usuario: AdminUser
) {

    /*
     * Protección adicional en el frontend.
     *
     * Un administrador nunca puede
     * eliminar su propia cuenta.
     */

    if (
        usuario.id ===
        authStore.usuario?.id
    ) {

        alert(
            "No puedes eliminar tu propia cuenta de administrador."
        );

        return;

    }


    /*
     * Confirmación antes de eliminar.
     */

    const confirmar =
        confirm(
            `¿Deseas eliminar al usuario "${usuario.nombre} ${usuario.apellido}"?`
        );


    if (!confirmar) {

        return;

    }


    eliminandoUsuario.value =
        usuario.id;


    try {

        const resultado =
            await eliminarUsuarioService(
                usuario.id
            );


        if (!resultado.success) {

            alert(
                resultado.mensaje ||
                "No se pudo eliminar el usuario."
            );

            return;

        }


        /*
         * Eliminamos al usuario
         * de la lista del frontend.
         *
         * No necesitamos volver a consultar
         * todos los usuarios.
         */

        usuarios.value =
            usuarios.value.filter(
                usuarioActual =>
                    usuarioActual.id !== usuario.id
            );


        alert(
            resultado.mensaje ||
            "Usuario eliminado correctamente."
        );


    } catch (err) {

        console.error(err);

        alert(
            "Ocurrió un error al eliminar el usuario."
        );

    } finally {

        eliminandoUsuario.value = null;

    }

}


/*
 * CARGAR USUARIOS AL ENTRAR
 * A LA PÁGINA
 */

onMounted(() => {

    cargarUsuarios();

});

</script>