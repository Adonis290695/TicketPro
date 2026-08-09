<template>

    <Navbar />

    <section class="max-w-7xl mx-auto px-8 py-10">

        <div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">

            <div>

                <h1 class="text-4xl font-bold">

                    Gestión de Eventos

                </h1>

                <p class="text-gray-500 mt-2">

                    Administra todos los eventos del sistema.

                </p>

            </div>

            <RouterLink
                to="/admin/create-event"
                class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >

                + Crear Evento

            </RouterLink>

        </div>

        <div class="mb-6">

            <input
                v-model="buscar"
                type="text"
                placeholder="Buscar evento..."
                class="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

        </div>

        <div class="overflow-x-auto bg-white rounded-xl shadow">

            <table class="min-w-full">

                <thead class="bg-gray-100">

                    <tr>

                        <th class="px-6 py-4 text-left">Evento</th>

                        <th class="px-6 py-4 text-left">Fecha</th>

                        <th class="px-6 py-4 text-left">Hora</th>

                        <th class="px-6 py-4 text-left">Ubicación</th>

                        <th class="px-6 py-4 text-center">Precio</th>

                        <th class="px-6 py-4 text-center">Stock</th>

                        <th class="px-6 py-4 text-center">Acciones</th>

                    </tr>

                </thead>

                <tbody>

                    <tr
                        v-for="evento in eventosFiltrados"
                        :key="evento._id"
                        class="border-t hover:bg-gray-50"
                    >

                        <td class="px-6 py-4 font-semibold">

                            {{ evento.nombre }}

                        </td>

                        <td class="px-6 py-4">

                            {{ evento.fecha }}

                        </td>

                        <td class="px-6 py-4">

                            {{ evento.hora }}

                        </td>

                        <td class="px-6 py-4">

                            {{ evento.ubicacion }}

                        </td>

                        <td class="px-6 py-4 text-center">

                            S/. {{ evento.precio }}

                        </td>

                        <td class="px-6 py-4 text-center">

                            {{ evento.stockDisponible }} / {{ evento.stockTotal }}

                        </td>

                        <td class="px-6 py-4">

                            <div class="flex justify-center gap-3">

                                <RouterLink
                                    :to="`/admin/edit-event/${evento._id}`"
                                    class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg"
                                >

                                    Editar

                                </RouterLink>

                                <button
                                    @click="eliminarEvento(evento)"
                                    class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                >

                                    Eliminar

                                </button>

                            </div>

                        </td>

                    </tr>

                    <tr v-if="eventosFiltrados.length===0">

                        <td
                            colspan="7"
                            class="text-center py-10 text-gray-500"
                        >

                            No se encontraron eventos.

                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    </section>

</template>

<script setup lang="ts">

import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";

import Navbar from "../../components/layout/Navbar.vue";

import { obtenerEventos, eliminarEvento as eliminarEventoService } from "../../services/eventService";

import type { Event } from "../../interfaces/Event";

const buscar = ref("");

const eventos = ref<Event[]>([]);

const eventosFiltrados = computed(() => {

    return eventos.value.filter(evento =>

        evento.nombre.toLowerCase().includes(buscar.value.toLowerCase()) ||

        evento.ubicacion.toLowerCase().includes(buscar.value.toLowerCase())

    );

});

async function cargarEventos() {

    try {

        eventos.value = await obtenerEventos(

            {

                nombre: "",

                ubicacion: ""

            },

            1,

            100

        );

    } catch (error) {

        console.error(error);

    }

}

async function eliminarEvento(evento: Event) {

    const confirmar = confirm(

        `¿Deseas eliminar el evento "${evento.nombre}"?`

    );

    if (!confirmar) {

        return;

    }
    
    try {

        const respuesta = await eliminarEventoService(evento._id);
        
        alert(respuesta.mensaje);

        await cargarEventos();

    } catch (error) {

        console.error(error);

        alert("Ocurrrio un error al eliminar el evento.");
    }

    

}

onMounted(() => {

    cargarEventos();

});

</script>