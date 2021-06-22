<template>
  <section class="travel__future container">
    <div class="travel__btn" >
      <button class="btn-created" @click.prevent="crearNuevoViaje">
        <i class="icon-add"></i>
        Crear nuevo viaje
      </button>
    </div>
  </section>
</template>

<script>
import ObtenerViaje from "@/mixins/obtenerViajes.js"

export default {
  name: "NewTravel",
  mixins: [
    ObtenerViaje
  ],
  methods: {
      crearNuevoViaje:function () {
        let that = this
          fetch(this.$store.state.URL_API, {
            headers: {
              'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                    nameTravel: "Sin titulo",
                    status: '0',
                    location: "Localización del viaje",
                    image:  "https://images.pexels.com/photos/5725589/pexels-photo-5725589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
                    date_initial: "2020-01-01T15:01:07.798Z",
                    date_end: "2020-01-02T15:01:07.798Z",
                    money: '0',
            })
          })
          .then((response) => response.json())
          .then(() => that.obtenerViajes())
          .then(() => that.irAlNuevoViajeCreado())
          this.$router.push({ name: 'TravelSingle', params: {travelId: this.irAlNuevoViajeCreado()} })
      },
      irAlNuevoViajeCreado: function (){
        const tamanyoArrayViajes = this.$store.state.viajes.length - 1;
        return this.$store.state.viajes[tamanyoArrayViajes].id_travel
      }

  },

};
</script>

