<template>
    <div class="max-w-3xl mx-auto mt-10 bg-white shadow rounded-lg p-6">

        <h1 class="text-3xl font-bold mb-6">
            Editar Evento
        </h1>

        <form @submit.prevent="guardarCambios" class="space-y-4">

            <div>
                <label class="block font-semibold mb-1">
                    Nombre
                </label>

                <input
                    v-model="evento.nombre"
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    required
                >
            </div>

            <div>
                <label class="block font-semibold mb-1">
                    Descripción
                </label>

                <textarea
                    v-model="evento.descripcion"
                    class="w-full border rounded px-3 py-2"
                    rows="4"
                    required
                ></textarea>
            </div>

            <div>
                <label class="block font-semibold mb-1">
                    Ubicación
                </label>

                <input
                    v-model="evento.ubicacion"
                    type="text"
                    class="w-full border rounded px-3 py-2"
                    required
                >
            </div>

            <div class="grid grid-cols-2 gap-4">

                <div>
                    <label class="block font-semibold mb-1">
                        Fecha
                    </label>

                    <input
                        v-model="evento.fecha"
                        type="date"
                        class="w-full border rounded px-3 py-2"
                        required
                    >
                </div>

                <div>
                    <label class="block font-semibold mb-1">
                        Hora
                    </label>

                    <input
                        v-model="evento.hora"
                        type="time"
                        class="w-full border rounded px-3 py-2"
                        required
                    >
                </div>

            </div>

            <div class="grid grid-cols-2 gap-4">

                <div>
                    <label class="block font-semibold mb-1">
                        Precio
                    </label>

                    <input
                        v-model.number="evento.precio"
                        type="number"
                        min="1"
                        class="w-full border rounded px-3 py-2"
                        required
                    >
                </div>

                <div>
                    <label class="block font-semibold mb-1">
                        Stock Total
                    </label>

                    <input
                        v-model.number="evento.stockTotal"
                        type="number"
                        min="1"
                        class="w-full border rounded px-3 py-2"
                        required
                    >
                </div>

            </div>

            <button
                type="submit"
                class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
                Guardar Cambios
            </button>

        </form>

    </div>
</template>

<script setup lang="ts">

import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { EventRequest } from "../../interfaces/EventRequest";

import {
    obtenerEventoPorId,
    editarEvento
} from "../../services/eventService";

const route = useRoute();

const router = useRouter();

const evento = reactive<EventRequest>({

    nombre: "",

    descripcion: "",

    ubicacion: "",

    fecha: "",

    hora: "",

    precio: 0,

    stockTotal: 0

});

async function cargarEvento() {

    const id = route.params.id as string;

    const respuesta = await obtenerEventoPorId(id);

    evento.nombre = respuesta.nombre;

    evento.descripcion = respuesta.descripcion;

    evento.ubicacion = respuesta.ubicacion;

    evento.fecha = respuesta.fecha;

    evento.hora = respuesta.hora;

    evento.precio = respuesta.precio;

    evento.stockTotal = respuesta.stockTotal;

}

async function guardarCambios() {

    const id = route.params.id as string;

    const respuesta = await editarEvento(id, evento);

    alert(respuesta.mensaje);

    router.push("/admin/events");

}

onMounted(() => {

    cargarEvento();

});

</script>