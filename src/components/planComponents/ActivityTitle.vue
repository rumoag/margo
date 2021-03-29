
<template>
  <div class="activitie__title">
    <h1 v-if="ActivityTitle !== activityFalse"
        @click="activityFalse = ActivityTitle; busqueda = ActivityTitle; observador()"
    >
      {{ ActivityTitle }}
    </h1>
    <form v-else name="formulario" method="post"  >
        <input type="text" id="inputTitle" class="activitie__title-input"
               v-model.trim="busqueda"
               @blur="activityFalse=false"
               @change.prevent="actualizarTitle($route.params.ActivityId, busqueda)"
               @keydown.enter.prevent="actualizarTitle($route.params.ActivityId, busqueda)"
        >
    </form>
  </div>
</template>

<script>
import ObtenerPlanesViaje from "@/mixins/obtenerPlanesViajesSingle.js"
export default {
  name: "TravelTitle",
  props: {
    ActivityTitle: String
  },
  data(){
    return {
      activityFalse: false,
      busqueda: '',
    }
  },
  methods: {
    actualizarTitle: function (id, title){
      this.ActivityFalse=false
      fetch(this.$store.state.URL_API_PLANES_CREATE, {
        headers: {
          'Authorization': this.$store.state.Authorization,
          'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          "records": [
            {
              "id": id,
              "fields": {
                "NombreActividad": title,
              }
            }
          ]
        })
      })
          .then(() => this.obtenerPlanes())
    },
    focused: function(){
      if (this.activityFalse === this.ActivityTitle) {
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
    ObtenerPlanesViaje
  ],
};
</script>