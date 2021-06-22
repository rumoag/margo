<template>
  <div>
    <section class="travel__future container">
      <div class="travel__subtitle">
        <h2>Futuros</h2>
      </div>
    </section>
    <div v-if="$store.state.viajesFuturos.length !== 0" class="travel__container-card travel__wrap container" >
      <Card v-for="viaje in $store.state.viajesFuturos" :key="viaje.id_travel" :id="viaje.id_travel"></Card>
    </div>
    <div v-else class="container">
      <p>No tienes viajes previsto aún</p>
      <p>Crea uno nuevo y organiza hasta cuando tienes que ir al baño</p>
    </div>

  </div>
</template>

<script>

  import Card from "@/components/smallComponents/Card.vue"
  export default {
    name: "TravelFuture",
    components: {
      Card,
    },
  };
</script>

