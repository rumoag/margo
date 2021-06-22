<template>
  <div class="actions" :class="{'actions__noshow': $store.state.displayActions }">
    <section class="actions__header">
      <div class="header">
        <div class="header__title">
          <h3>Acciones</h3>
        </div>
      </div>
    </section>
    <section class="actions__body">
      <div class="actions__duo">
        <button class="actions__ind" @click="borrarViaje(travelId)">
          <i class="icon-trash"></i>
          <h3>Eliminar</h3>
        </button>
        <button class="actions__ind">
          <i class="icon-copy"></i>
          <h3>Duplicar</h3>
        </button>
      </div>
      <button class="actions__ind">
        <i class="icon-refresh"></i>
        <h3>Reiniciar maleta</h3>
      </button>
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
  name: "Actions",
  props: {
    travelId: String,
  },
  methods: {
    actualizarDatos: function (id){
      return this.$store.state.viajes.filter((viaje) => {
        return viaje.id_travel=== id
      })[0]
    },
    borrarViaje: function (id){
      this.cerrarAcciones();
      setTimeout( ()=>{
        this.$store.state.viajes[id - 1].deleted = '1';
        this.myTravel(this.actualizarDatos(id).id_travel, this.actualizarDatos(id).nameTravel, this.actualizarDatos(id).image, this.actualizarDatos(id).location, this.actualizarDatos(id).longitud, this.actualizarDatos(id).latitud, this.actualizarDatos(id).date_initial, this.actualizarDatos(id).date_end, this.actualizarDatos(id).money, this.actualizarDatos(id).status,'1');
      }, 500)

    },
    cerrarAcciones: function (){
      const actionsClases = document.querySelectorAll(".actions")
      actionsClases.forEach( () =>{
          this.$store.commit('actionsOFF')
          setTimeout( ()=>{
            this.$store.commit('restoreCrono')
          }, 500)
      })

    },
  },
  mixins: [
    ObtenerViaje
  ],
};
</script>