<template>
  <div class="actions" :class="{'actions__noshow': $store.state.displayActions }">
    <section class="actions__header">
      <div class="header">
        <div class="header__title">
          <h3>Editar Icono</h3>
        </div>
      </div>
    </section>
    <section class="actions__body">
      <div class="actions__ind-img">
        <div v-for="(resultado,index) in $store.state.resultadosIcon" :key="index"
             @click="actualizarIcon($route.params.ActivityId,resultado.character); cerrarAcciones()" class="activitie__icon-ind"
             >
          <p>{{resultado.character}}</p>
        </div>
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
import ObtenerPlanesViaje from "@/mixins/obtenerPlanesViajesSingle.js"
export default {
  name: "ActivityEditIcon",
  mixins: [
    ObtenerPlanesViaje
  ],
  methods: {
    actualizarIcon: function (id, icono){
      fetch(this.$store.state.URL_API_PLANES_CREATE, {
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
                "Icono": icono
              }
            }
          ]
        })
      })
          .then(() => this.obtenerPlanes())
    },

    obtenerResultados : function () {
      fetch('https://emoji-api.com/emojis?access_key=de26b2e6b4d315ad2482d4e54a0766e4d6fdb288')
          .then(function(response) {
            return response.json();
          })
          .then((json) => {
            this.$store.state.resultadosIcon = json;
          });
    },
    cerrarAcciones: function (){
      const actionsClases = document.querySelectorAll(".actions")
      actionsClases.forEach( () =>{
          this.$store.commit('actionsOFF')
          setTimeout( ()=>{
            this.$store.commit('optionsIconOFF')
          }, 1000)
      })
    },
  },
  mounted: function (){
    if (this.$store.state.resultadosIcon.length === 0){
      this.obtenerResultados();
    }
  },
};
</script>