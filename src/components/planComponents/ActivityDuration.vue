
<template>
  <div class="activitie__options">
      <i class="icon-sand"></i>
      <date-picker v-model="ActivityDuration"
                   :time-picker-options="{
                      start: HoraInicio,
                      step: '00:05',
                      end: '24:00',
                   }"
                   format="HH:mm"
                   type="time"
                   :placeholder="tiempoDuraActividad()" @change="actualizarDuration($route.params.ActivityId)">
      </date-picker>
  </div>


</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import ObtenerPlanesViaje from "@/mixins/obtenerPlanesViajesSingle.js"
import { format } from 'date-fns'
import { formatDuration } from 'date-fns'
import { es } from 'date-fns/locale'

export default {
  name: "ActivityHoraInicio",
  components: { DatePicker },
  props: {
    HoraInicio: String,
    Duration: String
  },
  data(){
    return {
      ActivityDuration: null,
    }
  },
  methods: {
    formatearHora: function (){
      const formatear = format(new Date(this.ActivityDuration), "HH:mm", )
      return formatear
    },
    tiempoDuraActividad: function (){
      const restaHInicio = parseInt(this.HoraInicio.split(':')[0]);
      const restaHFin = parseInt(this.Duration.split(':')[0]);
      const restaMInicio = parseInt(this.HoraInicio.split(':')[1]);
      const restaMFin = parseInt(this.Duration.split(':')[1]);
      const restaHTotal= restaHFin - restaHInicio  ;
      const restaMTotal= restaMFin - restaMInicio  ;
      const Total = formatDuration({hours: restaHTotal, minutes: restaMTotal},{ zero: true,locale: es});
      return "Duración: " + Total
    },
    actualizarDuration: function (id){
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
                "HoraFIn": this.formatearHora()
              }
            }
          ]
        })
      })
          .then(() => this.obtenerPlanes())
    },

  },
  mixins: [
    ObtenerPlanesViaje
  ],





};
</script>