<template>

    <Navbar />

    <section class="max-w-7xl mx-auto px-8 py-10">

        <!-- ========================================================= -->
        <!-- TÍTULO -->
        <!-- ========================================================= -->

        <div class="mb-10">

            <div class="flex items-center gap-3">

                <div
                    class="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg"
                >

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >

                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M3 13h4v8H3v-8zm7-10h4v18h-4V3zm7 6h4v12h-4V9z"
                        />

                    </svg>

                </div>

                <div>

                    <h1 class="text-4xl font-bold text-gray-800">

                        Panel de Administración

                    </h1>

                    <p class="text-gray-500 mt-1">

                        Resumen general del sistema y actividad reciente.

                    </p>

                </div>

            </div>

        </div>


        <!-- ========================================================= -->
        <!-- CARDS PRINCIPALES -->
        <!-- ========================================================= -->

        <div
            v-if="dashboard"
            class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >

            <!-- USUARIOS -->

            <div
                class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

                <div class="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full"></div>

                <div class="absolute -right-10 -bottom-10 w-36 h-36 bg-white/5 rounded-full"></div>

                <div class="relative p-6">

                    <div class="flex items-center justify-between">

                        <div>

                            <p class="text-blue-100 text-sm font-medium">

                                Usuarios

                            </p>

                            <p class="text-4xl font-bold mt-2">

                                {{ dashboard.Usuarios }}

                            </p>

                        </div>

                        <div
                            class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m4-4a4 4 0 100-8 4 4 0 000 8zm6 0a3 3 0 100-6 3 3 0 000 6z"
                                />

                            </svg>

                        </div>

                    </div>

                    <div class="mt-5 text-sm text-blue-100">

                        Usuarios registrados

                    </div>

                </div>

            </div>


            <!-- EVENTOS -->

            <div
                class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

                <div class="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full"></div>

                <div class="absolute -right-10 -bottom-10 w-36 h-36 bg-white/5 rounded-full"></div>

                <div class="relative p-6">

                    <div class="flex items-center justify-between">

                        <div>

                            <p class="text-purple-100 text-sm font-medium">

                                Eventos

                            </p>

                            <p class="text-4xl font-bold mt-2">

                                {{ dashboard.Eventos }}

                            </p>

                        </div>

                        <div
                            class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />

                            </svg>

                        </div>

                    </div>

                    <div class="mt-5 text-sm text-purple-100">

                        Eventos registrados

                    </div>

                </div>

            </div>


            <!-- TICKETS -->

            <div
                class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

                <div class="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full"></div>

                <div class="absolute -right-10 -bottom-10 w-36 h-36 bg-white/5 rounded-full"></div>

                <div class="relative p-6">

                    <div class="flex items-center justify-between">

                        <div>

                            <p class="text-emerald-100 text-sm font-medium">

                                Tickets Vendidos

                            </p>

                            <p class="text-4xl font-bold mt-2">

                                {{ dashboard.Tickets }}

                            </p>

                        </div>

                        <div
                            class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 5h4a2 2 0 012 2v2a2 2 0 110 4v2a2 2 0 01-2 2h-4M9 5H5a2 2 0 00-2 2v2a2 2 0 110 4v2a2 2 0 002 2h4m0-12v14"
                                />

                            </svg>

                        </div>

                    </div>

                    <div class="mt-5 text-sm text-emerald-100">

                        Entradas comercializadas

                    </div>

                </div>

            </div>


            <!-- INGRESOS -->

            <div
                class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

                <div class="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full"></div>

                <div class="absolute -right-10 -bottom-10 w-36 h-36 bg-white/5 rounded-full"></div>

                <div class="relative p-6">

                    <div class="flex items-center justify-between">

                        <div>

                            <p class="text-orange-100 text-sm font-medium">

                                Ingresos

                            </p>

                            <p class="text-3xl font-bold mt-2">

                                S/. {{ dashboard.Ingresos }}

                            </p>

                        </div>

                        <div
                            class="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3 1.343 3 3-1.343 3-3 3m0-14V3m0 18v-2m9-7h-2M5 12H3"
                                />

                            </svg>

                        </div>

                    </div>

                    <div class="mt-5 text-sm text-orange-100">

                        Ingresos generados

                    </div>

                </div>

            </div>

        </div>


        <!-- ========================================================= -->
        <!-- MEJOR CLIENTE / EVENTO MÁS VENDIDO -->
        <!-- ========================================================= -->

        <div
            v-if="dashboard"
            class="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
        >

            <!-- MEJOR CLIENTE -->

            <div
                class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >

                <div
                    class="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-5 text-white"
                >

                    <div class="flex items-center gap-3">

                        <div
                            class="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM4 21a8 8 0 0116 0"
                                />

                            </svg>

                        </div>

                        <div>

                            <h2 class="text-xl font-bold">

                                Mejor Cliente

                            </h2>

                            <p class="text-blue-100 text-sm">

                                Cliente con mayor actividad

                            </p>

                        </div>

                    </div>

                </div>


                <div class="p-6">

                    <div v-if="dashboard.mejorCliente" class="space-y-4">

                        <div
                            class="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                        >

                            <span class="text-gray-500">

                                Nombre

                            </span>

                            <span class="font-semibold text-gray-800">

                                {{ dashboard.mejorCliente.nombre }}

                            </span>

                        </div>

                        <div
                            class="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                        >

                            <span class="text-gray-500">

                                Email

                            </span>

                            <span class="font-medium text-gray-800">

                                {{ dashboard.mejorCliente.email }}

                            </span>

                        </div>

                        <div
                            class="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3"
                        >

                            <span class="text-blue-600 font-medium">

                                Tickets comprados

                            </span>

                            <span class="text-2xl font-bold text-blue-700">

                                {{ dashboard.mejorCliente.ticketsComprados }}

                            </span>

                        </div>

                    </div>

                    <div
                        v-else
                        class="text-center py-8 text-gray-500"
                    >

                        No existen compras.

                    </div>

                </div>

            </div>


            <!-- EVENTO MÁS VENDIDO -->

            <div
                class="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition"
            >

                <div
                    class="bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-5 text-white"
                >

                    <div class="flex items-center gap-3">

                        <div
                            class="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center"
                        >

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >

                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9 14l6-6m-5-4h6a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V6a2 2 0 012-2z"
                                />

                            </svg>

                        </div>

                        <div>

                            <h2 class="text-xl font-bold">

                                Evento Más Vendido

                            </h2>

                            <p class="text-purple-100 text-sm">

                                Evento con mayor rendimiento

                            </p>

                        </div>

                    </div>

                </div>


                <div class="p-6">

                    <div v-if="dashboard.mejorEvento" class="space-y-4">

                        <div
                            class="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                        >

                            <span class="text-gray-500">

                                Evento

                            </span>

                            <span class="font-semibold text-gray-800">

                                {{ dashboard.mejorEvento.nombre }}

                            </span>

                        </div>

                        <div
                            class="flex items-center justify-between bg-purple-50 rounded-xl px-4 py-3"
                        >

                            <span class="text-purple-600 font-medium">

                                Tickets vendidos

                            </span>

                            <span class="text-2xl font-bold text-purple-700">

                                {{ dashboard.mejorEvento.ticketsVendidos }}

                            </span>

                        </div>

                        <div
                            class="flex items-center justify-between bg-emerald-50 rounded-xl px-4 py-3"
                        >

                            <span class="text-emerald-600 font-medium">

                                Ingresos

                            </span>

                            <span class="text-xl font-bold text-emerald-700">

                                S/. {{ dashboard.mejorEvento.ingresos }}

                            </span>

                        </div>

                    </div>

                    <div
                        v-else
                        class="text-center py-8 text-gray-500"
                    >

                        Sin información.

                    </div>

                </div>

            </div>

        </div>


        <!-- ========================================================= -->
        <!-- PRÓXIMOS EVENTOS -->
        <!-- ========================================================= -->

        <div
            v-if="dashboard"
            class="bg-white rounded-2xl shadow-md border border-gray-100 mt-8 overflow-hidden"
        >

            <div
                class="px-6 py-5 bg-gray-50 border-b border-gray-200"
            >

                <div class="flex items-center gap-3">

                    <div
                        class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center"
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />

                        </svg>

                    </div>

                    <div>

                        <h2 class="text-xl font-bold text-gray-800">

                            Próximos Eventos

                        </h2>

                        <p class="text-sm text-gray-500">

                            Eventos programados próximamente

                        </p>

                    </div>

                </div>

            </div>


            <div class="overflow-x-auto">

                <table class="min-w-full">

                    <thead>

                        <tr class="bg-gray-100 text-gray-600">

                            <th class="text-left px-6 py-4 text-sm font-semibold">

                                Evento

                            </th>

                            <th class="text-left px-6 py-4 text-sm font-semibold">

                                Fecha

                            </th>

                            <th class="text-left px-6 py-4 text-sm font-semibold">

                                Hora

                            </th>

                            <th class="text-left px-6 py-4 text-sm font-semibold">

                                Ubicación

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr
                            v-for="(evento, index) in dashboard.proximosEventos"
                            :key="evento.nombre"
                            :class="[
                                'border-b border-gray-100 transition-colors',
                                index % 2 === 0
                                    ? 'bg-white'
                                    : 'bg-gray-50',
                                'hover:bg-blue-50'
                            ]"
                        >

                            <td class="px-6 py-4">

                                <span class="font-semibold text-gray-800">

                                    {{ evento.nombre }}

                                </span>

                            </td>

                            <td class="px-6 py-4 text-gray-600">

                                {{ evento.fecha }}

                            </td>

                            <td class="px-6 py-4">

                                <span
                                    class="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                                >

                                    {{ evento.hora }}

                                </span>

                            </td>

                            <td class="px-6 py-4 text-gray-600">

                                {{ evento.ubicacion }}

                            </td>

                        </tr>


                        <tr
                            v-if="dashboard.proximosEventos.length === 0"
                        >

                            <td
                                colspan="4"
                                class="text-center py-10 text-gray-500"
                            >

                                No hay próximos eventos.

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>


        <!-- ========================================================= -->
        <!-- ÚLTIMAS COMPRAS -->
        <!-- ========================================================= -->

        <div
            v-if="dashboard"
            class="bg-white rounded-2xl shadow-md border border-gray-100 mt-8 overflow-hidden"
        >

            <div
                class="px-6 py-5 bg-gray-50 border-b border-gray-200"
            >

                <div class="flex items-center gap-3">

                    <div
                        class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center"
                    >

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >

                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M3 10h18M7 15h2m4 0h2m-9 5h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />

                        </svg>

                    </div>

                    <div>

                        <h2 class="text-xl font-bold text-gray-800">

                            Últimas Compras

                        </h2>

                        <p class="text-sm text-gray-500">

                            Actividad reciente de ventas

                        </p>

                    </div>

                </div>

            </div>


            <div class="overflow-x-auto">

                <table class="min-w-full">

                    <thead>

                        <tr class="bg-gray-100 text-gray-600">

                            <th class="text-left px-6 py-4 text-sm font-semibold">

                                Cliente

                            </th>

                            <th class="text-left px-6 py-4 text-sm font-semibold">

                                Evento

                            </th>

                            <th class="text-center px-6 py-4 text-sm font-semibold">

                                Cantidad

                            </th>

                            <th class="text-center px-6 py-4 text-sm font-semibold">

                                Total

                            </th>

                            <th class="text-center px-6 py-4 text-sm font-semibold">

                                Fecha

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        <tr
                            v-for="(compra, index) in dashboard.ultimasCompras"
                            :key="compra.fecha + compra.cliente"
                            :class="[
                                'border-b border-gray-100 transition-colors',
                                index % 2 === 0
                                    ? 'bg-white'
                                    : 'bg-gray-50',
                                'hover:bg-emerald-50'
                            ]"
                        >

                            <td class="px-6 py-4">

                                <span class="font-semibold text-gray-800">

                                    {{ compra.cliente }}

                                </span>

                            </td>

                            <td class="px-6 py-4 text-gray-600">

                                {{ compra.evento }}

                            </td>

                            <td class="px-6 py-4 text-center">

                                <span
                                    class="inline-flex min-w-9 justify-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm"
                                >

                                    {{ compra.cantidad }}

                                </span>

                            </td>

                            <td class="px-6 py-4 text-center">

                                <span class="font-bold text-emerald-600">

                                    S/. {{ compra.total }}

                                </span>

                            </td>

                            <td class="px-6 py-4 text-center text-gray-600">

                                {{ compra.fecha.substring(0,10) }}

                            </td>

                        </tr>


                        <tr
                            v-if="dashboard.ultimasCompras.length === 0"
                        >

                            <td
                                colspan="5"
                                class="text-center py-10 text-gray-500"
                            >

                                No hay compras recientes.

                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </section>

</template>


<script setup lang="ts">

import { ref, onMounted } from "vue";

import Navbar from "../../components/layout/Navbar.vue";

import { obtenerDashboard } from "../../services/adminService";

import type { Dashboard } from "../../interfaces/Dashboard";


const dashboard = ref<Dashboard | null>(null);


async function cargarDashboard() {

    try {

        dashboard.value = await obtenerDashboard();

    } catch (error) {

        console.error(error);

    }

}


onMounted(() => {

    cargarDashboard();

});

</script>