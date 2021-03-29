<template>
  <div>
    <section class="travel__past container">
      <div class="travel__subtitle">
        <h2>Pasados</h2>
      </div>
      <div class="travel__container-card travel__wrap">
          <Card v-for="viaje in $store.state.viajesPasados" :key="viaje.id" :id="viaje.id"></Card>
      </div>

    </section>
  </div>
</template>

<script>
  import Card from "@/components/smallComponents/Card.vue"
  export default {
    name: "TravelPasat",
    components: {
      Card
    }
  }
</script>

