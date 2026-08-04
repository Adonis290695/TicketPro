<template>

    <Navbar/>

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
            class="grid gap-6"
        >

            <div
                v-for="(ticket,index) in tickets"
                :key="index"
                class="bg-white rounded-lg shadow-lg p-6"
            >

                <h2 class="text-2xl font-bold mb-4">

                    Ticket #{{ index + 1 }}

                </h2>

                <div class="space-y-3">

                    <p>

                        <strong>Cantidad:</strong>

                        {{ ticket.cantidad }}

                    </p>

                    <p>

                        <strong>Precio Unitario:</strong>

                        S/. {{ ticket.precioUnitario }}

                    </p>

                    <p>

                        <strong>Precio Total:</strong>

                        S/. {{ ticket.precioTotal }}

                    </p>

                    <p>

                        <strong>Estado:</strong>

                        {{ ticket.estado }}

                    </p>

                    <p>

                        <strong>Fecha de Compra:</strong>

                        {{ ticket.fechaCompra }}

                    </p>

                    <p>

                        <strong>Evento ID:</strong>

                        {{ ticket.eventoId }}

                    </p>

                </div>

            </div>

        </div>

    </section>

</template>

<script setup lang="ts">

import { ref, onMounted } from "vue";

import Navbar from "../../components/layout/Navbar.vue";

import { obtenerMisTickets } from "../../services/ticketService";

import type { Tickets } from "../../interfaces/Tickets";

const tickets = ref<Tickets[]>([]);

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