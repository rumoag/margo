
<template>
  <div class="activitie__note">
      <i class="icon-clipboard"></i>

    <span v-if="activityNote !== activityFalse"
        @click="activityFalse = activityNote; busqueda = activityNote; observador()"
    >
      {{ notaVacia()}}
    </span>
    <textarea v-else id="inputTitle" class="activitie__textarea"
           v-model.trim="busqueda"
           @blur="activityFalse=false"
           @change.prevent="actualizarNote($route.params.ActivityId, busqueda)"
           @keydown.enter.prevent="actualizarNote($route.params.ActivityId, busqueda)"
    ></textarea>
  </div>
</template>

<script>
import ObtenerPlanesViaje from "@/mixins/obtenerPlanesViajesSingle.js"
export default {
  name: "TravelTitle",
  props: {
    activityNote: String
  },
  data(){
    return {
      activityFalse: false,
      busqueda: '',
    }
  },
  methods: {
    actualizarNote: function (id, Nota){
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
                "Comentario": Nota,
              }
            }
          ]
        })
      })
          .then(() => this.obtenerPlanes())
    },
    focused: function(){
      if (this.activityFalse === this.activityNote) {
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
    notaVacia: function (){
      if (this.activityNote.length === 0 ){
        return "Nota o comentario"
      } else {
        return this.activityNote
      }
    }

  },
  mixins: [
    ObtenerPlanesViaje
  ],
};
</script>