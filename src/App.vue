<template>
  <div id="app">
    <Header v-if="$store.state.displayHeader" />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header.vue"
import ObtenerViaje from "@/mixins/obtenerViajes.js"

export default {
  name: "Main",
  components: {
    Header
  },
  mounted: function () {
    if(this.$store.state.viajes.length === 0){
      this.obtenerViajes();
    }

  },
  mixins: [
    ObtenerViaje
  ],



};
</script>
