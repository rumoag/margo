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
          fetch("https://api.airtable.com/v0/app1Myyzo3nnkGOPj/Viajes", {
            headers: {
              'Authorization': 'Bearer keypFgW9ql6PGevJQ',
              'Content-type': 'application/json'
            },

            method: 'POST',
            body: JSON.stringify({
              "records": [
                {
                  "fields": {
                    "NombreViaje": "Sin titulo",
                    "Estado": "Sin fecha",
                    "Localizacion": "Localización del viaje",
                    "Imagen": [
                      {
                        "url": "https://images.pexels.com/photos/5725589/pexels-photo-5725589.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                      }
                    ],
                    "FechaViajeInicio": "2020-01-01T15:01:07.798Z",
                    "FechaViajeFin": "2020-01-02T15:01:07.798Z",
                  }
                },
              ]
            })
          })
          .then(() => that.obtenerViajes())
          .then(() => that.irAlNuevoViajeCreado())
          this.$router.push({ name: 'TravelSingle', params: {travelId: this.irAlNuevoViajeCreado()} })
      },
      irAlNuevoViajeCreado: function (){
        const tamanyoArrayViajes = this.$store.state.viajes.length - 1;
        return this.$store.state.viajes[tamanyoArrayViajes].id
      }

  },

};
</script>

