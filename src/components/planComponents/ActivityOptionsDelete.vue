<template>
  <div class="actions" :class="{'actions__noshow': $store.state.displayActions }">
    <section class="actions__header">
      <div class="header">
        <div class="header__title">
          <h3>Opciones actividad</h3>
        </div>
      </div>
    </section>
    <section class="actions__body">
      <div class="actions__duo">
        <button class="actions__ind" @click="borrarActividad()">
          <i class="icon-trash"></i>
          <h3>Eliminar</h3>
        </button>
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
import ObtenerPlan from "@/mixins/obtenerPlanesViajes.js"
export default {
  name: "OptionsImage",
  props: {
    ActivityId: String,
  },
  mixins: [
    ObtenerPlan,
  ],
  methods: {
    borrarActividad: function (){
      fetch(this.$store.state.URL_API_PLANES_DELETE.concat(this.ActivityId), {
        headers: {
          'Authorization' : this.$store.state.Authorization,
        },
        method: 'DELETE',
      }).then(response=> response.json());
      this.$store.state.activityDays = this.$store.state.activityDays.filter(viaje =>{
        return viaje.id !== this.ActivityId
      })
      this.cerrarAcciones();
      this.obtenerPlanes();
      this.$router.go(-1);
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
};
</script>