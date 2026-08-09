import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/events/Home.vue";
import EventDetail from "../pages/events/EventDetail.vue";
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import Checkout from "../pages/tickets/Checkout.vue";
import MyTickets from "../pages/user/MyTickets.vue";

import Dashboard from "../pages/admin/Dashboard.vue";
import ManageEvents from "../pages/admin/ManageEvents.vue";
import CreateEvent from "../pages/admin/CreateEvent.vue";
import EditEvent from "../pages/admin/EditEvent.vue";
import Statistics from "../pages/admin/Statistics.vue";
import Users from "../pages/admin/Users.vue";

import { useAuthStore } from "../stores/authStores";

const router = createRouter({

    history: createWebHistory(),

    routes: [

        // ============================
        // CLIENTE
        // ============================

        {
            path: "/",
            component: Home
        },

        {
            path: "/events/:id",
            component: EventDetail
        },

        {
            path: "/checkout/:id",
            component: Checkout,
            meta: {
                requiresAuth: true
            }
        },

        {
            path: "/user/tickets",
            component: MyTickets,
            meta: {
                requiresAuth: true
            }
        },

        // ============================
        // ADMINISTRADOR
        // ============================

        {
            path: "/admin/dashboard",
            component: Dashboard,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },

        {
            path: "/admin/events",
            component: ManageEvents,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },

        {
            path: "/admin/create-event",
            component: CreateEvent,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },

        {
            path: "/admin/edit-event/:id",
            component: EditEvent,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },

        {
            path: "/admin/statistics",
            component: Statistics,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },

        {
            path: "/admin/users",
            component: Users,
            meta: {
                requiresAuth: true,
                requiresAdmin: true
            }
        },

        // ============================
        // AUTENTICACIÓN
        // ============================

        {
            path: "/login",
            component: Login,
            meta: {
                guestOnly: true
            }
        },

        {
            path: "/register",
            component: Register,
            meta: {
                guestOnly: true
            }
        }

    ]

});

router.beforeEach((to) => {

    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {

        return "/login";

    }

    if (to.meta.requiresAdmin && !authStore.isAdmin) {

        return "/";

    }

    if (to.meta.guestOnly && authStore.isAuthenticated) {

        return "/";

    }

});

export default router;