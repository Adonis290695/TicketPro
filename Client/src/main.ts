import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router/index.ts";

import "./style.css";

import { useAuthStore } from "./stores/authStores.ts";

const app = createApp (App);
const pinia = createPinia();

app.use(pinia);

const authStore = useAuthStore();

await authStore.inicializarSesion();
app.use(router);

app.mount("#app");
