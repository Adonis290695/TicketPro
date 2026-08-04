<template>

    <Navbar />
    <Banner />
    <SearchBar 
         @buscar="filtros = $event"
    />
    <EventList
       :filtros="filtros"
    />
    

</template>

<script setup lang="ts">

import { ref } from 'vue';
import type { EventFilter } from '../../interfaces/EventFilter';
import SearchBar from '../../components/home/SearchBar.vue';
import Banner from '../../components/home/Banner.vue';
import Navbar from '../../components/layout/Navbar.vue';
import EventList from '../../components/events/EventList.vue';

const filtros = ref<EventFilter>({
    nombre:"",
    ubicacion:""
});



</script>