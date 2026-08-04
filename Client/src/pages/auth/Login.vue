<template>

  <Navbar />
  <section class="max-w-md mx-auto mt-16 bg-white shadow-lg rounded-xl p-8">
   
    <h1 class="text-3xl font-bold text-center mb-8">
        Iniciar Sesión
    </h1>

    <form @submit.prevent="iniciarSesion">
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
            required>

        </div>

        <button
        class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
        Ingresar
        </button>

        <div
           v-if="errorLogin"
           class="mt-6 bg-red-50 border border-red-200 rounded-lg p-4"
         >

            <p class="text-red-700 font-semibold text-center">
              {{ errorLogin }}
            </p>

            <p class="text-gray-700 text-center mt-3">
                Si aún no tienes una cuenta, puedes registrarte para continuar con la compra de tu entrada.
            </p>

            <div class="flex justify-center mt-4">

              <RouterLink
              to="/register"
              class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
               Crear una cuenta
               </RouterLink>

            </div>
        </div>

    </form>



  </section>


</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

import Navbar from '../../components/layout/Navbar.vue';
import { useAuthStore } from '../../stores/authStores';

const router = useRouter();

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const errorLogin = ref("");

async function iniciarSesion() {

    errorLogin.value = "";
    try{
        await authStore.login({
            email:email.value,
            password:password.value
        });

        if(authStore.pendingAction){

            const eventoId = authStore.pendingAction.eventoId;
            authStore.limpiarPendingAction();
            router.push(`/checkout/${eventoId}`);
        }else{
            router.push("/");
        }

    }catch(error){

        errorLogin.value = "Correo o contraseña incorrectos"
        console.error(error);
    }
    
}
</script>