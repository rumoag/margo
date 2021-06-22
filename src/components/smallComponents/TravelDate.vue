
<template>
  <div class="single-travel__fecha">
      <date-picker v-model="travelDate" format="DD/MM/YYYY"  :lang="lang" :disabled-date="disabledBeforeTodayAndAfterAWeek" type="date" range :placeholder="travelTitleDate" @change="actualizarFecha($route.params.travelId)"></date-picker>
  </div>


</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/es';
import ObtenerViaje from "@/mixins/obtenerViajes.js"

export default {
  name: "TravelDate",
  components: { DatePicker },
  props: {
    travelTitleDate: String
  },
  data(){
    return {
      travelDate:[],
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: true,
      },

      travelDateStart:'',
      travelDateEnd:'',
      travelDateEstate: '',

    }
  },
  methods: {
    disabledBeforeTodayAndAfterAWeek(date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date < today || date > new Date(today.getTime() + 365 * 24 * 3600 * 1000);
    },
    today: function (){
      const now = new Date()
      const today = now.getDate() + "/" + (now.getMonth() +1) + "/" + now.getFullYear()
      const dateStart = this.travelDate[0].getDate() + "/" + (this.travelDate[0].getMonth() +1) + "/" + this.travelDate[0].getFullYear()
      if(today !== dateStart){
        return this.travelDateEstate = '3'
      } else {
        return this.travelDateEstate = '2'
      }

    },
    datesOrganized: function() {
      this.travelDateStart= this.travelDate[0]
      this.travelDateEnd= this.travelDate[1]
      this.today();
    },
    actualizarDatos: function (id){
      return this.$store.state.viajes.filter((viaje) => {
        return viaje.id_travel=== id
      })[0]
    },
    actualizarFecha: function (id){
      this.datesOrganized();
      this.myTravel(this.actualizarDatos(id).id_travel, this.actualizarDatos(id).nameTravel, this.actualizarDatos(id).image, this.actualizarDatos(id).location, this.actualizarDatos(id).longitud, this.actualizarDatos(id).latitud, this.travelDateStart, this.travelDateEnd, this.actualizarDatos(id).money, this.travelDateEstate,this.actualizarDatos(id).deleted);
      this.$store.state.viajes[id - 1].date_initial = this.travelDateStart;
      this.$store.state.viajes[id - 1].date_end = this.travelDateEnd;
      this.$store.state.viajes[id - 1].status = this.travelDateEstate;
    },

  },
  mixins: [
    ObtenerViaje
  ],





};
</script>