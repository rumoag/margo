<template>
  <div class="actions" :class="{'actions__noshow': $store.state.displayActions }">
    <section class="actions__header">
      <div class="header">
        <div class="header__title">
          <h3>Editar Imagen</h3>
        </div>
      </div>
    </section>
    <section class="actions__body">
      <div class="actions__ind">
        <input v-model="busqueda" type="search" placeholder="Busca y selecciona una imagen">
      </div>
      <div class="actions__ind-img">
        <img v-for="resultado in resultados" :key="resultado.webformatURL"
             :src="resultado.webformatURL" alt=""
             class="actions__img"
             @click="actualizarImage($route.params.travelId,resultado.webformatURL); cerrarAcciones()"
             >
        <div class="actions__block"></div>
      </div>

    </section>
    <section class=" formu__btn container">
      <button class="btn-outline" @click="cerrarAcciones()">
        Hecho
      </button>
    </section>
  </div>
</template>
<script>
import ObtenerViaje from "@/mixins/obtenerViajes.js"
export default {
  name: "OptionsImage",
  data(){
    return{
      busqueda: '',
      resultados:[],
    }
  },

  mixins: [
    ObtenerViaje,
  ],
  methods: {
    actualizarDatos: function (id){
      return this.$store.state.viajes.filter((viaje) => {
        return viaje.id_travel=== id
      })[0]
    },
    actualizarImage: function (id, url){
      this.myTravel(this.actualizarDatos(id).id_travel, this.actualizarDatos(id).nameTravel, url, this.actualizarDatos(id).location, this.actualizarDatos(id).longitud, this.actualizarDatos(id).latitud, this.actualizarDatos(id).date_initial, this.actualizarDatos(id).date_end, this.actualizarDatos(id).money, this.actualizarDatos(id).status,this.actualizarDatos(id).deleted);
      this.$store.state.viajes[id - 1].image = url;
    },

    obtenerResultados : function () {
      fetch(`https://pixabay.com/api/?key=14581694-1e47b08e85369f5be7d24ef40&q=${this.busqueda}&per_page=21&lang=es`)
          .then(function(response) {
            // Transforma la respuesta. En este caso lo convierte a JSON
            return response.json();
          })
          .then((json) => {
            // Usamos la información recibida como necesitemos
            this.resultados = json.hits;
          });
    },
    cerrarAcciones: function (){
      const actionsClases = document.querySelectorAll(".actions")
      actionsClases.forEach( () =>{
        this.$store.commit('actionsOFF')
        setTimeout( ()=>{
          this.$store.commit('optionsImgOFF')
        }, 1000)
      })
    },
  },
  watch: {
    busqueda: function () {
      this.obtenerResultados();
    },
  },
};
</script>