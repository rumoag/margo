
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
        return this.travelDateEstate = "Futuro"
      } else {
        return this.travelDateEstate = "Presente"
      }

    },
    datesOrganized: function() {
      this.travelDateStart= this.travelDate[0]
      this.travelDateEnd= this.travelDate[1]
      this.today();
    },
    actualizarFecha: function (id){
      this.datesOrganized();
      fetch(this.$store.state.URL_UPDATE, {
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
                "FechaViajeInicio": this.travelDateStart,
                "FechaViajeFin": this.travelDateEnd,
                "Estado": this.travelDateEstate,
              }
            }
          ]
        })
      })
          .then(() => this.obtenerViajes())
    },

  },
  mixins: [
    ObtenerViaje
  ],





};
</script>