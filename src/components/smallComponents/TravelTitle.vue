
<template>
  <div class="single-travel__title">
    <h1 v-if="TravelTitle !== travelFalse"
        @click="travelFalse = TravelTitle; busqueda = TravelTitle; observador()"
    >
      {{ TravelTitle }}
    </h1>
    <form v-else name="formulario" method="post"  >
        <input type="text" id="inputTitle" class="single-travel__title-input"
               v-model.trim="busqueda"
               @blur="travelFalse=false"
               @change.prevent="actualizarTitle($route.params.travelId, busqueda)"
               @keydown.enter.prevent="actualizarTitle($route.params.travelId, busqueda)"
        >
    </form>
  </div>
</template>

<script>
import ObtenerViaje from "@/mixins/obtenerViajes.js"
export default {
  name: "TravelTitle",
  props: {
    TravelTitle: String
  },
  data(){
    return {
      travelFalse: false,
      busqueda: '',
    }
  },
  methods: {
    actualizarDatos: function (id){
      return this.$store.state.viajes.filter((viaje) => {
        return viaje.id_travel=== id
      })[0]
    },
    actualizarTitle: function (id, titulo){
      this.travelFalse = false;
      this.myTravel(this.actualizarDatos(id).id_travel, titulo, this.actualizarDatos(id).image, this.actualizarDatos(id).location, this.actualizarDatos(id).longitud, this.actualizarDatos(id).latitud, this.actualizarDatos(id).date_initial, this.actualizarDatos(id).date_end, this.actualizarDatos(id).money, this.actualizarDatos(id).status,this.actualizarDatos(id).deleted );
      this.$store.state.viajes[id - 1].nameTravel = titulo;
    },
    focused: function(){
      if (this.travelFalse === this.TravelTitle) {
        document.getElementById("inputTitle").focus();
      }
    },
    observar: function (){
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      let observer = new IntersectionObserver(this.focused, options);
      observer.observe(document.querySelector('#inputTitle'));
    },
    observador: function(){
      setTimeout(this.observar,100)
    }
  },
  mixins: [
    ObtenerViaje
  ],
};
</script>