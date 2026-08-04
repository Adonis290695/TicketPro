<template>

    <Navbar/>
    <div 
    v-if="cargando"
    class="max-w-7xl mx-auto py-20 text-center">
    <p class="text-2xl font-semibold">
        Cargando evento...
    </p>
    </div>
    <section 
    v-else-if="evento"
    class="max-w-7xl mx-auto px-8 py-10">

        <h1 class="text-4xl font-bold">
            {{ evento.nombre }}
        </h1>
        <img 
        src="http://picsum.photos/1200/400"
        alt="Evento"
        class="w-full h-96 object-cover rounded-xl mb-8"
        >
        <div class="grid md:grid-cols-2 gap-8">
            <div>

                <h2 class="text-2xl font-bold mb-4">
                  Descripción
                </h2>
                <p class="text-gray-700">
                    {{ evento.descripcion }}
                </p>
            </div>
            <div class="bg-gray-100 rounded-xl p-6">
                <h2 class="text-2xl font-bold mb-4">
                    Información
                </h2>
                <p><strong>Ubicación: </strong>{{ evento.ubicacion}}</p>
                <p><strong>Fecha: </strong>{{ evento.fecha }}</p>
                <p><strong>Hora: </strong>{{ evento.hora}}</p>
                <p><strong>Precio: </strong>{{ evento.precio}}</p>
                <div class="mb-6"><strong>Entradas disponibles: </strong>
                    <span
                     v-if="evento.stockDisponible > 0"
                     class="text-green-600 font-bold">
                     {{ evento.stockDisponible }}
                    </span>
                    <span
                    v-else
                    class="text-red-600 font-bold">
                    AGOTADO
                   </span>
                </div>
                <button
                @click="comprarEntrada"
                 :disabled="evento.stockDisponible === 0"
                 class="w-full py-3 rounded-lg text-white transition"
                 :class="evento.stockDisponible > 0
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
                  ">
                   {{ evento.stockDisponible > 0 ? "Comprar Entrada" : "Evento Agotado" }}
                </button>
            </div>
        </div>



    </section>

    <div
    v-else
    class="max-w-7xl mx-auto px-8 py-20 text-center"
    >

      <h1 class="text-3xl font-bold text-red-600 mb-4">
        Evento no encontrado
      </h1>

      <p class="text-gray-600 mb-8">
        El evento que buscas no existe o fue eliminado.
      </p>

      <button
        @click="volverInicio"
        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
       >
        Volver al inicio
       </button>

    </div>

</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { obtenerEventoPorId } from "../../services/eventService.ts";
import type { Event } from "../../interfaces/Event.ts";
import Navbar from '../../components/layout/Navbar.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from "../../stores/authStores.ts";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const id = route.params.id as string;
const evento = ref<Event|null>(null);
const cargando = ref(true);
async function cargarEvento() {

    try{
        evento.value = await obtenerEventoPorId(id);
    }
    catch(error){
        
        console.error("Error al obtener evento:",error);

    } finally {

        cargando.value = false;
    }
}

function volverInicio() {

    router.push("/");

}



async function comprarEntrada() {

    console.log("Botón Comprar presionado");

    console.log("Evento:", evento.value);

    console.log("ID:", id);

    console.log("Autenticado:", authStore.isAuthenticated);

    if(!authStore.isAuthenticated){

        console.log("Guardando PendingAction...");

        authStore.guardarPendingAction({
            eventoId: id,
            cantidad: 1
        });

        console.log("PendingAction:", authStore.pendingAction);

        router.push("/login");
        return; 
    }
    console.log("Ir al checkout");

    router.push(`/checkout/${id}`);
    
}

onMounted(() => {
    cargarEvento();
});


</script>
