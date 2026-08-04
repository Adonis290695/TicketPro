<template>

    <section class="bg-blue-700 text-white py-20 animate-fade">


        <div class="masx-w-7xl mx-auto px-8">

            <h1 class="text-5xl font-bold mb-6">
                Compra tus tickets de forma rapida y segura con TicketPro
            </h1>

            <p class="text-xl mb-8">
                Descubre conciertos, festivales, eventos deportivos y mucho más.
            </p>

            <RouterLink
            to="/events"
            class="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition ">

            Ver eventos
        
            </RouterLink>
        </div>
    </section>
</template>
<style scoped>

@keyframes fadeInUp{

    from{
        opacity:0;
        transform:translateY(30px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}

.animate-fade{

    animation:fadeInUp 0.8s ease;

}

</style>