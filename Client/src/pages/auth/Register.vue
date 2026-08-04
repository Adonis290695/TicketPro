<template>
    
    <Navbar />

    <section class="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-xl p-8">
      
        <h1 class="text-3xl font-bold text-center mb-8">

            Crear Cuenta

        </h1>

        <div
          v-if="authStore.pendingAction"
          class="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-4"
          >

          <h2 class="text-lg font-semibold text-blue-700">
              Ya casi terminas 🎉
          </h2>

          <p class="text-gray-700 mt-2">
             Crea tu cuenta para continuar con la compra de tu entrada.
          </p>

        </div>

        <form @submit.prevent="registrarse">

            <div class="mb-5">

                <label class="font-semibold">
                    Nombres
                </label>

                <input
                v-model="nombre"
                type="text"
                class="w-full border rounded-lg p-3 mt-2"
                required
                >
            </div>

            <div class="mb-5">

                <label class="font-semibold">
                    Apellidos
                </label>

                <input
                v-model="apellido"
                type="text"
                class="w-full border rounded-lg p-3 mt-2"
                required
                >
            </div>

            <div class="mb-5">

                <label class="font-semibold">
                    Email
                </label>

                <input
                v-model="email"
                type="email"
                class="w-full border rounded-lg p-3 mt-2"
                required>
            </div>

            <div class="mb-6">
                <label class="font-semibold">
                    Contraseña
                </label>

                <input
                v-model="password"
                type="password"
                class="w-full border rounded-lg p-3 mt-2"
                required
                >
            </div>

            <button
               class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
             >
               Registrarse
            </button>

        </form>

    </section>
    
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import Navbar from '../../components/layout/Navbar.vue';
import { useAuthStore } from '../../stores/authStores.ts';

const router = useRouter();
const authStore = useAuthStore();

const nombre=ref("");
const apellido=ref("");
const email=ref("");
const password=ref("");

async function registrarse(){
    
    try{

     console.log({
     nombres: nombre.value,
     apellidos: apellido.value,
     email: email.value,
     password: password.value
     });


        await authStore.register({

            nombres: nombre.value,
            apellidos: apellido.value,
            email: email.value,
            password: password.value
        });

        if(authStore.pendingAction){

            const eventoId = authStore.pendingAction.eventoId;

            authStore.limpiarPendingAction();

            router.push(`/checkout/${eventoId}`);
        } else {

            router.push("/");
        }
    } catch (error){

        console.error(error);

    }
}

</script>