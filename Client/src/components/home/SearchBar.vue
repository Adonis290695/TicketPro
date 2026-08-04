<template>

    <section class="max-w-7xl mx-auto px-8 py-10">

        <h2 class="text-3xl font-bold mb-6">
            Buscar Eventos
        </h2>

        <div class="flex gap-4">

            <input
            v-model="textBusqueda" 
            type="text"
            placeholder="Buscar evento.."
            class="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            v-model="ubicacionBusqueda"
            type="text"
            placeholder="Ciudad..."
            class="flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
            @click="buscarEvento"
            class="bg-blue-600 text-white px-6 rounded-lg hover:bg-blue-700 transition">
            
             Buscar

            </button>
        </div>
    </section>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const textBusqueda = ref("");
const ubicacionBusqueda = ref("");
const emit = defineEmits<{
    (e:"buscar", filtros:{
        nombre:string;
        ubicacion:string;
    } ): void;
}>();

function buscarEvento(){
    emit("buscar", {
        nombre: textBusqueda.value.trim(),
        ubicacion: ubicacionBusqueda.value.trim()
    });
}
</script>