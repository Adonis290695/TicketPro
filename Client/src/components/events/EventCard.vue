<template>

    <article @click="verDetalleEvento"
      class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">

      <img
         src="http://picsum.photos/600/300"
         alt="Evento"
         class="w-full h-52 object-cover"
        >

        <div class="p-5">

            <h2 class="text-2xl font-bold mb-2 text-center">

                {{ evento.nombre }}

            </h2>

            <p class="text-2xl font-bold mb-2 text-center">
                {{ evento.ubicacion }}
            </p>

            <p class="text-gray-600 mb-4 text-center">
                {{ evento.fecha }} - {{ evento.hora }}
            </p>
            <div class="flex justify-between items-center">
                <span class="text-2xl font-bold text-blue-700">
                    S/.{{ evento.precio }}
                </span>
                
                <button
                   class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">

                     Comprar
                
                </button>
            </div>

        </div>
    
    </article>

</template>

<script setup lang="ts">

import type { Event } from '../../interfaces/Event';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps<{
    evento: Event;
}>();

function verDetalleEvento(){

    router.push(`/events/${props.evento._id}`);
}

</script>