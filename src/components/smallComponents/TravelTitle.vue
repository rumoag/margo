
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
    actualizarTitle: function (id, titulo){
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
                "NombreViaje": titulo,
              }
            }
          ]
        })
      })
          .then(() => this.obtenerViajes())
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