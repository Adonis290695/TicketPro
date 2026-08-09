<template>

    <Navbar />

    <section class="max-w-3xl mx-auto px-8 py-10">

        <div class="bg-white rounded-xl shadow-lg p-8">

            <h1 class="text-4xl font-bold mb-2">
                Crear Evento
            </h1>

            <p class="text-gray-500 mb-8">
                Completa la información del nuevo evento.
            </p>

            <form
                @submit.prevent="guardarEvento"
                class="space-y-6"
            >

                <div>

                    <label class="block font-semibold mb-2">

                        Nombre

                    </label>

                    <input
                        v-model="form.nombre"
                        type="text"
                        class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                </div>

                <div>

                    <label class="block font-semibold mb-2">

                        Descripción

                    </label>

                    <textarea
                        v-model="form.descripcion"
                        rows="4"
                        class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                </div>

                <div>

                    <label class="block font-semibold mb-2">

                        Ubicación

                    </label>

                    <input
                        v-model="form.ubicacion"
                        type="text"
                        class="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                </div>

                <div class="grid md:grid-cols-2 gap-6">

                    <div>

                        <label class="block font-semibold mb-2">

                            Fecha

                        </label>

                        <input
                            v-model="form.fecha"
                            type="date"
                            class="w-full border rounded-lg px-4 py-3"
                            required
                        />

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">

                            Hora

                        </label>

                        <input
                            v-model="form.hora"
                            type="time"
                            class="w-full border rounded-lg px-4 py-3"
                            required
                        />

                    </div>

                </div>

                <div class="grid md:grid-cols-2 gap-6">

                    <div>

                        <label class="block font-semibold mb-2">

                            Precio

                        </label>

                        <input
                            v-model.number="form.precio"
                            type="number"
                            min="1"
                            class="w-full border rounded-lg px-4 py-3"
                            required
                        />

                    </div>

                    <div>

                        <label class="block font-semibold mb-2">

                            Stock Total

                        </label>

                        <input
                            v-model.number="form.stockTotal"
                            type="number"
                            min="1"
                            class="w-full border rounded-lg px-4 py-3"
                            required
                        />

                    </div>

                </div>

                <div
                    v-if="mensaje"
                    class="bg-green-100 text-green-700 p-4 rounded-lg"
                >

                    {{ mensaje }}

                </div>

                <div
                    v-if="error"
                    class="bg-red-100 text-red-700 p-4 rounded-lg"
                >

                    {{ error }}

                </div>

                <div class="flex justify-end gap-4">

                    <RouterLink
                        to="/admin/events"
                        class="px-6 py-3 rounded-lg border"
                    >

                        Cancelar

                    </RouterLink>

                    <button
                        type="submit"
                        :disabled="loading"
                        class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg disabled:bg-gray-400"
                    >

                        {{ loading ? "Guardando..." : "Crear Evento" }}

                    </button>

                </div>

            </form>

        </div>

    </section>

</template>

<script setup lang="ts">

import { reactive, ref } from "vue";

import { useRouter, RouterLink } from "vue-router";

import Navbar from "../../components/layout/Navbar.vue";

import { crearEvento } from "../../services/eventService";

import type { EventRequest } from "../../interfaces/EventRequest";

const router = useRouter();

const loading = ref(false);

const mensaje = ref("");

const error = ref("");

const form = reactive<EventRequest>({

    nombre: "",

    descripcion: "",

    ubicacion: "",

    fecha: "",

    hora: "",

    precio: 0,

    stockTotal: 0

});

async function guardarEvento() {

    loading.value = true;

    mensaje.value = "";

    error.value = "";

    try {

        await crearEvento(form);

        mensaje.value = "Evento creado correctamente.";

        form.nombre = "";

        form.descripcion = "";

        form.ubicacion = "";

        form.fecha = "";

        form.hora = "";

        form.precio = 0;

        form.stockTotal = 0;

        setTimeout(() => {

            router.push("/admin/events");

        }, 1000);

    }

    catch (err: any) {

        error.value = err.response?.data?.mensaje ?? "Ocurrió un error al crear el evento.";

    }

    finally {

        loading.value = false;

    }

}

</script>