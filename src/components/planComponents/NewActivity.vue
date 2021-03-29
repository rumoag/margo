<template>
  <section class="plan__activitie-container container" @click="crearNuevaActividad(diaActivo)">
    <div class="plan__activitie">
      <div class="plan__new-card" >
        <div class="plan__icon">
          <button>
            +
          </button>
        </div>
        <div class="plan__card-text">
          <h4>Añadir actividad</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import obtenerPlanesViajes from "@/mixins/obtenerPlanesViajes.js"
export default {
  name: "NewActivity",
  props:{
    diaActivo: String
  },
  mixins: [
    obtenerPlanesViajes
  ],
  methods: {
    crearNuevaActividad:function (dia) {
        fetch( this.$store.state.URL_API_PLANES_CREATE, {
          headers: {
            'Authorization': this.$store.state.Authorization,
            'Content-type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            "records": [
              {
                "fields": {
                  "NombreActividad": "Sin titulo",
                  "HoraInicio": "Hora de inicio",
                  "HoraFIn": "23:59",
                  "Comentario": "Nota o comentario",
                  "GastoActividad": "Gastos",
                  "Dia": dia,
                  "Viajes": [
                    this.$route.params.travelId
                  ],
                  "Icono": "😀"
                }
              },
            ]
          })
        })
            .then(() => this.obtenerPlanes())
    },

  },

};
</script>

