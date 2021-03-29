<template>
  <div>
    <section class="travel__no-date container">
      <div class="travel__subtitle">
        <h2>Sin fecha</h2>
      </div>
      <div class="travel__container-card travel__wrap">
          <Card v-for="viaje in $store.state.viajesSinFechas" :key="viaje.id" :id="viaje.id"></Card>
      </div>
    </section>
  </div>
</template>

<script>
  import Card from "@/components/smallComponents/Card.vue"
  export default {
    name: "TravelNoDate",
    components: {
      Card
    },
  };
</script>

