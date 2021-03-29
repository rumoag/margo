<template>
  <section class="travel" v-if="$store.state.viajesPresentes.length === 0">
    <div class="travel__container container">
      <div class="travel__title">
        <h1>Hola Usuario,</h1>
        <h1>Organiza tu nuevo <br>
          viaje</h1>
      </div>
    </div>
    <div class="travel__back">
      <div class="travel__back-men ">
        <img src="img/hombreSentado.png"
             alt="Hombre Sentado">
      </div>
    </div>
  </section>
  <section v-else class="travel">
    <div class="travel__container container">
      <div class="travel__title">
        <h1>Hola Usuario,</h1>
        <h1>Ya está todo planeado <br>
          ¡Vámonos!</h1>
      </div>
    </div>
    <div class="travel__back">
      <div class="travel__back-img">
        <img src="img/llamadacorriendo.png" alt="llamada corriendo">
      </div>
    </div>
    <travelGo></travelGo>
  </section>
</template>
<script>
import travelGo from "@/components/TravelGo.vue"

export default {
  name: "TravelMessage",
  components: {
    travelGo
  },
};
</script>

