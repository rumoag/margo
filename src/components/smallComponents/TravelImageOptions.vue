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
    actualizarImage: function (id, url){
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
                "Imagen":[
                  {
                   "url": url,
                  }
                ]
              }
            }
          ]
        })
      })
          .then(() => this.obtenerViajes())
    },
    obtenerResultados : function () {
      fetch(`https://pixabay.com/api/?key=14581694-1e47b08e85369f5be7d24ef40&q=${this.busqueda}&per_page=20&lang=es`)
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