<template>

    
    <Navbar />

    <div 
       v-if="cargando"
       class="max-w-5xl mx-auto py-20 text-center"
    >

    <h2 class="text-2xl font-bold">
        Cargando checkout...
    </h2>

    </div>

    <section 
        v-else-if="evento"
        class="max-w-5xl mx-auto px-8 py-10"
       >
       <h1 class="text-4xl font-bold mb-8">
              Checkout
       </h1>

        <div class="bg-white rounded-lg shadow-lg p-8">
          
            <h2 class="text-3xl font-bold mb-6">
              {{ evento.nombre }}
            </h2>

            <div class="space-y-3 mb-8">
            
             <p>
                <strong>Fecha:</strong>
                  {{ evento.fecha }}
             </p>

             <p>
                <strong>Hora:</strong>
                  {{ evento.hora }}
             </p>

             <p>
                <strong>Precio:</strong>
                  S/. {{ evento.precio }}
             </p>

             <p>
                <strong>Stock disponible:</strong>
                  {{ evento.stockDisponible }}
             </p>

            </div>

            <QuantitySelector
               v-model="cantidad"
               :max="evento.stockDisponible"
            />

            <div class="mt-6">

                <p class="text-lg">
                    
                    Estás comprando

                    <strong>{{ cantidad }}</strong>
                      
                    {{ cantidad === 1 ? "entrada" : "entradas" }}

                </p>
            </div>
            <div class="mt-8 border-t pt-6">
               
                <h3 class="text-2xl font-bold">

                    Total:
                    S/. {{ total }}

                </h3>

            </div>

            <button
               @click="continuarCompra"
               :disabled="comprando"
               class="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
            >
                 
               {{ comprando ? "Procesando compra..." : "Continuar" }}

            </button>

            <p
               v-if="mensaje"
               class="mt-6 text-center text-green-600 font-semibold"
            >
              {{ mensaje }}
            </p>

            <p 
              v-if="errorCompra"
              class="mt-6 text-center text-red-600 font-semibold"
              >
              {{ errorCompra }}
            </p>
        </div>
    </section>


</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Navbar from '../../components/layout/Navbar.vue';
import QuantitySelector from '../../components/checkout/QuantitySelector.vue';

import { obtenerEventoPorId } from '../../services/eventService.ts';
import { comprarTicket } from '../../services/ticketService.ts';
import type { Event } from '../../interfaces/Event.ts';


const route = useRoute();
const router = useRouter ();

const id = route.params.id as string;
const evento = ref<Event|null>(null);
const cargando = ref(true);
const comprando = ref(false);
const cantidad = ref(1);
const mensaje = ref("");
const errorCompra = ref("");

const total = computed(() => {

    if(!evento.value) return 0;
    return cantidad.value * evento.value.precio;

});

async function cargarEvento() {

    try{

        evento.value = await obtenerEventoPorId(id);

    } catch (error) {

        console.error(error);

    } finally {

        cargando.value = false;

    }   
}

async function continuarCompra(){

    mensaje.value="";
    errorCompra.value="";

    comprando.value=true;

    try{

        const respuesta = await comprarTicket({
            eventoId: id,
            cantidad: cantidad.value
        });

        if (respuesta.success){

            mensaje.value = respuesta.mensaje;

            if(evento.value){

                evento.value.stockDisponible -= cantidad.value;

            }

            setTimeout(() => {
                
                router.push("/");

            }, 1500);
        } else {

          errorCompra.value = respuesta.mensaje
        
         }
    } catch (error:any){

        if(error.response?.data?.mensaje){

            errorCompra.value = error.response.data.mensaje;
        
        } else {

            errorCompra.value = "Ocurrio un error al realizar a compra.";

        }

        console.error(error);
    } finally {

        comprando.value = false;
    
    }
}
onMounted(() => {

    cargarEvento();

});
</script>