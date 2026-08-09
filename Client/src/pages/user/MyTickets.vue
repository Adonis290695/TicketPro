<template>

    <Navbar />

    <section class="max-w-7xl mx-auto px-8 py-10">

        <h1 class="text-4xl font-bold mb-8">

            Mis Tickets

        </h1>

        <div
            v-if="cargando"
            class="text-center py-20"
        >

            <h2 class="text-2xl font-bold">

                Cargando tickets...

            </h2>

        </div>

        <div
            v-else-if="tickets.length === 0"
            class="text-center py-20"
        >

            <h2 class="text-2xl font-bold">

                No tienes tickets comprados.

            </h2>

        </div>

        <div
            v-else
            class="grid gap-8"
        >

            <div
                v-for="(ticket,index) in tickets"
                :key="index"
                class="bg-white rounded-xl shadow-lg border overflow-hidden"
            >

                <div
                    class="bg-blue-600 text-white px-6 py-4 flex justify-between items-center"
                >

                    <h2 class="text-2xl font-bold">

                        {{ ticket.evento.nombre }}

                    </h2>

                    <span
                        class="bg-green-500 px-4 py-1 rounded-full text-sm font-bold"
                    >

                        {{ ticket.estado }}

                    </span>

                </div>

                <div
                    class="grid md:grid-cols-2 gap-8 p-6"
                >

                    <div class="space-y-3">

                        <p>

                            <strong>📅 Fecha:</strong>

                            {{ ticket.evento.fecha }}

                        </p>

                        <p>

                            <strong>🕒 Hora:</strong>

                            {{ ticket.evento.hora }}

                        </p>

                        <p>

                            <strong>📍 Lugar:</strong>

                            {{ ticket.evento.ubicacion }}

                        </p>

                    </div>

                    <div class="space-y-3">

                        <p>

                            <strong>🎟 Cantidad:</strong>

                            {{ ticket.cantidad }}

                        </p>

                        <p>

                            <strong>💰 Precio Unitario:</strong>

                            S/. {{ ticket.precioUnitario }}

                        </p>

                        <p>

                            <strong>💵 Total Pagado:</strong>

                            S/. {{ ticket.precioTotal }}

                        </p>

                        <p>

                            <strong>🛒 Fecha Compra:</strong>

                            {{ ticket.fechaCompra }}

                        </p>

                    </div>

                </div>

            </div>

        </div>

    </section>

</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";

import Navbar from "../../components/layout/Navbar.vue";

import { obtenerMisTickets } from "../../services/ticketService";

import type { TicketDetalle } from "../../interfaces/TicketDetalle";

const tickets = ref<TicketDetalle[]>([]);

const cargando = ref(true);

async function cargarTickets(){

    try{

        const respuesta = await obtenerMisTickets();

        tickets.value = respuesta.tickets;

    }catch(error){

        console.error(error);

    }finally{

        cargando.value = false;

    }

}

onMounted(() => {

    cargarTickets();

});

</script>