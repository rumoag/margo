
<template>
  <div class="activitie__options">
      <i class="icon-clock"></i>
      <date-picker v-model="ActivityHoraInicio" :minute-step="1"
                   :hour-options="hours"
                   format="HH:mm"
                   value-type="format"
                   type="time"
                   :placeholder="HoraInicio" @change="actualizarHoraInicio($route.params.ActivityId)">
      </date-picker>
  </div>

</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import ObtenerPlanesViaje from "@/mixins/obtenerPlanesViajesSingle.js"

export default {
  name: "ActivityHoraInicio",
  components: { DatePicker },
  props: {
    HoraInicio: String
  },
  data(){
    return {
      ActivityHoraInicio: null,
      hours: Array.from({ length: 24 }).map((_, i) => i ),
    }
  },
  methods: {
    actualizarHoraInicio: function (id){
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
                "HoraInicio": this.ActivityHoraInicio
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