<template>
    <section class="max-w-7xl mx-auto px-8 py-10">

        <h2 class="text-3xl font-bold mb-8">
            Eventos Disponibles
        </h2>
        <div class="grid grid-cols-3 gap-8">
            <EventCard 
            v-for="evento in eventos"
            :key="evento._id"
            :evento="evento"/>
        </div>
    </section>


</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import EventCard from './EventCard.vue';
import type { Event } from '../../interfaces/Event.ts';
import { obtenerEventos } from '../../services/eventService.ts';
import type { EventFilter } from '../../interfaces/EventFilter.ts';

const props = defineProps<{
    filtros:EventFilter;
}>();

const eventos = ref<Event[]>([]);
async function cargarEventos() {

    try{
        eventos.value = await obtenerEventos(props.filtros);
    } catch(error){
        console.error("Error al obtener eventos",error)
    }
    
}
onMounted(() =>{

    cargarEventos();

});

watch(
    () => props.filtros,

    () =>{
        cargarEventos();
    },{
        deep:true
    }
);

</script>