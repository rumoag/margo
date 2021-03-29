
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
        <option v-for="ciudad in ciudades" :key="ciudad.nombre" :value="ciudad.nombre"></option>
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
      ciudades: [
        {
            nombre: "Albacete"
        },
        {
          nombre: "Cuenca"
        }
        ,
        {
          nombre: "Barcelona"
        }
        ]
    }
  },
  methods: {
    comprobarTitle: function (){
      let comprobar = this.ciudades.some(ciudad => ciudad.nombre === this.busqueda)
      if (comprobar){
        this.actualizarlocation(this.$route.params.travelId, this.busqueda);
      }
    },
    actualizarlocation: function (id, location){
      this.travelFalse=false
      fetch(this.$store.state.URL_UPDATE, {
        headers: {
          'Authorization': this.$store.state.Authorization,
          'Content-type': 'application/json'
        },
        //pacth un solo producto a la vez
        method: 'PATCH',
        body: JSON.stringify({
          "records": [
            {
              "id": id,
              "fields": {
                "Localizacion": location,
              }
            }
          ]
        })
      })
          .then(() => this.obtenerViajes())
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
    }
  },
  mixins: [
    ObtenerViaje
  ],




};
</script>