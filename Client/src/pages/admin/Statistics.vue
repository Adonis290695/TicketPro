<template>

    <Navbar />

    <section class="max-w-7xl mx-auto px-8 py-10">

        <!-- TÍTULO -->

        <div class="mb-10">

            <h1 class="text-4xl font-bold text-gray-800">
                Estadísticas
            </h1>

            <p class="text-gray-500 mt-2">
                Analiza el comportamiento de ventas y eventos del sistema.
            </p>

        </div>


        <!-- CARGANDO -->

        <div
            v-if="cargando"
            class="flex flex-col items-center justify-center py-32"
        >

            <div
                class="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
            ></div>

            <p class="mt-6 text-gray-600">
                Cargando estadísticas...
            </p>

        </div>


        <!-- ERROR -->

        <div
            v-else-if="error"
            class="bg-red-100 text-red-700 rounded-xl p-6"
        >

            {{ error }}

        </div>


        <!-- ESTADÍSTICAS -->

        <div
            v-else
            class="space-y-8"
        >

            <!-- EVENTOS POR MES -->

            <div
                class="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
            >

                <div
                    class="bg-blue-50 rounded-xl px-5 py-4 mb-6"
                >

                    <h2 class="text-xl font-semibold text-blue-800">
                        Eventos creados por mes
                    </h2>

                    <p class="text-sm text-blue-600 mt-1">
                        Cantidad de eventos registrados durante cada mes.
                    </p>

                </div>

                <div class="h-80">

                    <Bar
                        :data="eventosPorMesData"
                        :options="opcionesBarra"
                    />

                </div>

            </div>


            <!-- INGRESOS POR MES -->

            <div
                class="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
            >

                <div
                    class="bg-green-50 rounded-xl px-5 py-4 mb-6"
                >

                    <h2 class="text-xl font-semibold text-green-800">
                        Ingresos por mes
                    </h2>

                    <p class="text-sm text-green-600 mt-1">
                        Evolución de los ingresos generados durante el año.
                    </p>

                </div>

                <div class="h-80">

                    <Line
                        :data="ingresosPorMesData"
                        :options="opcionesLinea"
                    />

                </div>

            </div>


            <!-- TOP EVENTOS -->

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">


                <!-- TICKETS VENDIDOS -->

                <div
                    class="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
                >

                    <div
                        class="bg-purple-50 rounded-xl px-5 py-4 mb-6"
                    >

                        <h2 class="text-xl font-semibold text-purple-800">
                            Eventos más vendidos
                        </h2>

                        <p class="text-sm text-purple-600 mt-1">
                            Eventos con mayor cantidad de tickets vendidos.
                        </p>

                    </div>

                    <div class="h-80">

                        <Bar
                            :data="topEventosTicketsData"
                            :options="opcionesHorizontal"
                        />

                    </div>

                </div>


                <!-- INGRESOS -->

                <div
                    class="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
                >

                    <div
                        class="bg-orange-50 rounded-xl px-5 py-4 mb-6"
                    >

                        <h2 class="text-xl font-semibold text-orange-800">
                            Eventos con mayores ingresos
                        </h2>

                        <p class="text-sm text-orange-600 mt-1">
                            Eventos que generaron mayores ingresos.
                        </p>

                    </div>

                    <div class="h-80">

                        <Bar
                            :data="topEventosIngresosData"
                            :options="opcionesHorizontal"
                        />

                    </div>

                </div>

            </div>


            <!-- TABLA RESUMEN -->

            <div
                class="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
            >

                <div
                    class="bg-gray-100 rounded-xl px-5 py-4 mb-6"
                >

                    <h2 class="text-xl font-semibold text-gray-800">
                        Resumen de eventos
                    </h2>

                    <p class="text-sm text-gray-500 mt-1">
                        Resumen de tickets vendidos e ingresos por evento.
                    </p>

                </div>


                <div class="overflow-x-auto">

                    <table class="min-w-full border-separate border-spacing-0">

                        <thead>

                            <tr>

                                <th
                                    class="text-left px-5 py-4 bg-gray-200 text-gray-700 font-semibold border-b border-gray-300"
                                >
                                    Evento
                                </th>

                                <th
                                    class="text-center px-5 py-4 bg-gray-200 text-gray-700 font-semibold border-b border-gray-300"
                                >
                                    Tickets vendidos
                                </th>

                                <th
                                    class="text-center px-5 py-4 bg-gray-200 text-gray-700 font-semibold border-b border-gray-300"
                                >
                                    Ingresos
                                </th>

                            </tr>

                        </thead>


                        <tbody>

                            <tr
                                v-for="evento in topEventos"
                                :key="evento.nombre"
                                
                                class="hover:bg-blue-50 transition"
                            >

                                <td
                                    class="px-5 py-4 font-medium text-gray-800 border-b border-gray-200"
                                >
                                    {{ evento.nombre }}
                                </td>

                                <td
                                    class="text-center px-5 py-4 text-gray-700 border-b border-gray-200"
                                >
                                    {{ evento.ticketsVendidos }}
                                </td>

                                <td
                                    class="text-center px-5 py-4 font-semibold text-green-700 border-b border-gray-200"
                                >
                                    S/. {{ evento.ingresos }}
                                </td>

                            </tr>


                            <!-- SIN DATOS -->

                            <tr
                                v-if="topEventos.length === 0"
                            >

                                <td
                                    colspan="3"
                                    class="text-center py-10 text-gray-500 bg-gray-50"
                                >

                                    No hay datos disponibles.

                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    </section>

</template>


<script setup lang="ts">

import {
    ref,
    computed,
    onMounted
} from "vue";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

import {
    Bar,
    Line
} from "vue-chartjs";

import Navbar from "../../components/layout/Navbar.vue";

import {
    obtenerDashboard
} from "../../services/adminService";


/*
|--------------------------------------------------------------------------
| REGISTRO DE COMPONENTES DE CHART.JS
|--------------------------------------------------------------------------
*/

ChartJS.register(

    CategoryScale,

    LinearScale,

    BarElement,

    PointElement,

    LineElement,

    Title,

    Tooltip,

    Legend,

    Filler

);


/*
|--------------------------------------------------------------------------
| ESTADO
|--------------------------------------------------------------------------
*/

const cargando = ref(true);

const error = ref("");

const dashboard = ref<any>(null);


/*
|--------------------------------------------------------------------------
| CARGAR DATOS
|--------------------------------------------------------------------------
*/

async function cargarEstadisticas() {

    try {

        cargando.value = true;

        error.value = "";

        dashboard.value = await obtenerDashboard();

    } catch (e) {

        console.error(e);

        error.value =
            "No se pudieron cargar las estadísticas.";

    } finally {

        cargando.value = false;

    }

}


/*
|--------------------------------------------------------------------------
| DATOS DEL DASHBOARD
|--------------------------------------------------------------------------
*/

const eventosPorMes = computed(() => {

    return dashboard.value?.eventosPorMes ?? [];

});


const ingresosPorMes = computed(() => {

    return dashboard.value?.ingresosPorMes ?? [];

});


const topEventos = computed(() => {

    return dashboard.value?.topEventos ?? [];

});


/*
|--------------------------------------------------------------------------
| PALETA DE COLORES
|--------------------------------------------------------------------------
*/

const colores = [

    "#2563EB", // azul

    "#059669", // verde

    "#D97706", // amarillo

    "#DC2626", // rojo

    "#7C3AED", // morado

    "#DB2777", // rosa

    "#0891B2", // cyan

    "#EA580C"  // naranja

];


/*
|--------------------------------------------------------------------------
| GRÁFICO: EVENTOS POR MES
|--------------------------------------------------------------------------
*/

const eventosPorMesData = computed(() => {

    const labels =
        eventosPorMes.value.map(
            (item: any) => item.mes
        );


    const data =
        eventosPorMes.value.map(
            (item: any) => item.cantidad
        );


    return {

        labels: labels,

        datasets: [

            {

                label: "Eventos creados",

                data: data,

                backgroundColor: data.map(
                    (_: unknown, i: number) =>
                        colores[i % colores.length]
                ),

                borderColor: data.map(
                    (_: unknown, i: number) =>
                        colores[i % colores.length]
                ),

                borderWidth: 2,

                borderRadius: 8

            }

        ]

    };

});


/*
|--------------------------------------------------------------------------
| GRÁFICO: INGRESOS POR MES
|--------------------------------------------------------------------------
*/

const ingresosPorMesData = computed(() => {

    return {

        labels: ingresosPorMes.value.map(
            (item: any) => item.mes
        ),

        datasets: [

            {

                label: "Ingresos",

                data: ingresosPorMes.value.map(
                    (item: any) => item.ingresos
                ),

                borderColor: "#2563EB",

                backgroundColor:
                    "rgba(37, 99, 235, 0.18)",

                fill: true,

                tension: 0.4,

                pointBackgroundColor: "#2563EB",

                pointBorderColor: "#FFFFFF",

                pointBorderWidth: 2,

                pointRadius: 5,

                pointHoverRadius: 7

            }

        ]

    };

});


/*
|--------------------------------------------------------------------------
| GRÁFICO: TOP EVENTOS POR TICKETS
|--------------------------------------------------------------------------
*/

const topEventosTicketsData = computed(() => {

    const labels =
        topEventos.value.map(
            (evento: any) => evento.nombre
        );


    const data =
        topEventos.value.map(
            (evento: any) => evento.ticketsVendidos
        );


    return {

        labels: labels,

        datasets: [

            {

                label: "Tickets vendidos",

                data: data,

                backgroundColor: data.map(
                    (_: unknown, i: number) =>
                        colores[i % colores.length]
                ),

                borderColor: data.map(
                    (_: unknown, i: number) =>
                        colores[i % colores.length]
                ),

                borderWidth: 2,

                borderRadius: 8

            }

        ]

    };

});


/*
|--------------------------------------------------------------------------
| GRÁFICO: TOP EVENTOS POR INGRESOS
|--------------------------------------------------------------------------
*/

const topEventosIngresosData = computed(() => {

    const labels =
        topEventos.value.map(
            (evento: any) => evento.nombre
        );


    const data =
        topEventos.value.map(
            (evento: any) => evento.ingresos
        );


    return {

        labels: labels,

        datasets: [

            {

                label: "Ingresos",

                data: data,

                backgroundColor: data.map(
                    (_: unknown, i: number) =>
                        colores[i % colores.length]
                ),

                borderColor: data.map(
                    (_: unknown, i: number) =>
                        colores[i % colores.length]
                ),

                borderWidth: 2,

                borderRadius: 8

            }

        ]

    };

});


/*
|--------------------------------------------------------------------------
| OPCIONES DEL GRÁFICO DE BARRAS
|--------------------------------------------------------------------------
*/

const opcionesBarra = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

        legend: {

            display: false

        }

    },

    scales: {

        y: {

            beginAtZero: true

        }

    }

};


/*
|--------------------------------------------------------------------------
| OPCIONES DEL GRÁFICO DE LÍNEA
|--------------------------------------------------------------------------
*/

const opcionesLinea = {

    responsive: true,

    maintainAspectRatio: false,

    plugins: {

        legend: {

            display: true

        }

    },

    scales: {

        y: {

            beginAtZero: true

        }

    }

};


/*
|--------------------------------------------------------------------------
| OPCIONES PARA GRÁFICOS HORIZONTALES
|--------------------------------------------------------------------------
*/

const opcionesHorizontal = {

    responsive: true,

    maintainAspectRatio: false,

    indexAxis: "y" as const,

    plugins: {

        legend: {

            display: false

        }

    },

    scales: {

        x: {

            beginAtZero: true

        }

    }

};


/*
|--------------------------------------------------------------------------
| INICIALIZACIÓN
|--------------------------------------------------------------------------
*/

onMounted(() => {

    cargarEstadisticas();

});

</script>