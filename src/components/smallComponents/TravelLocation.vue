
<template>
  <div class="single-travel__location">
    <span v-if="travelLocation !== travelFalse"
        @click="travelFalse = travelLocation; busqueda = travelLocation; observador()"
          class="single-travel__location"
    >
      {{ travelLocation }}
    </span>
    <form v-else name="formulario" method="post"  >
        <input type="text" list="items" id="inputTitle" class="single-travel__location-input"
             v-model="busqueda"
             @blur="travelFalse=false"
             @change="comprobarTitle()"
        >
      <datalist id="items" >
        <option v-for="ciudad in ciudades" :key="ciudad.nombre" :value="ciudad.place_name"></option>
      </datalist>
    </form>
  </div>
</template>

<script>
import ObtenerViaje from "@/mixins/obtenerViajes.js"
export default {
  name: "travelLocation",
  props: {
    travelLocation: String
  },
  data(){
    return {
      travelFalse: false,
      busqueda: '',
      ciudades: []
    }
  },
  watch: {
    busqueda: function (){
      if (this.busqueda.length === 0 | this.busqueda ===''| this.busqueda === null | this.busqueda === undefined){
        return this.busqueda = ''

      } else {
        this.obtenerLocalizaciones()
      }
    }

  },
  methods: {
    comprobarTitle: function (){
      let comprobar = this.ciudades.some(ciudad => ciudad.place_name === this.busqueda)
      if (comprobar){
        const longitud = this.ciudades.filter( (ciudad)=>{
          return ciudad.place_name === this.busqueda
        })[0].center[1];
        console.log(longitud)
        const latitud = this.ciudades.filter( (ciudad)=>{
          return ciudad.place_name === this.busqueda
        })[0].center[0];
        console.log(latitud)
        this.actualizarlocation(this.$route.params.travelId, this.busqueda, longitud.toString(), latitud.toString());
      }
    },
    actualizarDatos: function (id){
      return this.$store.state.viajes.filter((viaje) => {
        return viaje.id_travel=== id
      })[0]
    },
    actualizarlocation: function (id, location, long, lat){
      this.travelFalse = false;
      this.myTravel(this.actualizarDatos(id).id_travel, this.actualizarDatos(id).nameTravel, this.actualizarDatos(id).image, location, long, lat, this.actualizarDatos(id).date_initial, this.actualizarDatos(id).date_end, this.actualizarDatos(id).money, this.actualizarDatos(id).status,this.actualizarDatos(id).deleted);
      this.$store.state.viajes[id - 1].location = location;
      this.$store.state.viajes[id - 1].longitud = long;
      this.$store.state.viajes[id - 1].latitud = lat;

    },
    focused: function(){
      if (this.travelFalse === this.travelLocation) {
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
    },
    obtenerLocalizaciones : function () {
      fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.busqueda}.json?language=es&types=region,country&access_token=pk.eyJ1IjoicnVtb2FnIiwiYSI6ImNrbGkybHJ0MDA5M2EyeG5tZHl0dTZocDIifQ.5uMl_i2kS7adppX4xGvASw&autocomplete=true`)
          .then((response) => response.json())
          .then((json) => {this.ciudades = json.features})
      //then cuando acabe una linea haz otra

    },

  },
  mixins: [
    ObtenerViaje
  ],




};
</script>