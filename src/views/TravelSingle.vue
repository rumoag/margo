<template>
  <div class="travelSingle">
    <BackBotton></BackBotton>
    <main class="single">
      <TravelImage :TravelImageURL=imagen :TravelImageNombre=nombre></TravelImage>
      <section class=" container">
        <div class="single-travel__header">
          <TravelTitle :TravelTitle=nombre></TravelTitle>
        </div>
      </section>
      <section class="single-travel__organizer container">
        <div class="single-travel__icon">
          <i class="icon-map-location"></i>
        </div>
        <TravelLocation :travelLocation=localizacion></TravelLocation>
        <div class="single-travel__icon">
          <i class="icon-calendar"></i>
        </div>
        <TravelDate :travelTitleDate=formatearFecha></TravelDate>
        <div class="single-travel__icon">
          <i class="icon-wallet"></i>
        </div>
        <TravelMoney :travelMoney=gastos></TravelMoney>
      </section>
    </main>
    <PlantTravelButton :id="$route.params.travelId"></PlantTravelButton>
  </div>
</template>
<script>
import BackBotton from "@/components/smallComponents/BackBotton.vue"
import TravelTitle from "@/components/smallComponents/TravelTitle.vue"
import TravelImage from "@/components/smallComponents/TravelImage.vue"
import TravelDate from "@/components/smallComponents/TravelDate.vue"
import TravelLocation from "@/components/smallComponents/TravelLocation.vue"
import TravelMoney from "@/components/smallComponents/TravelMoney.vue"
import PlantTravelButton from "@/components/smallComponents/PlantTravelButton.vue";
import {format} from "date-fns";
import { intervalToDuration } from 'date-fns'
import { add } from 'date-fns'

export default {
  name: 'TravelSingle',
  components: {
    BackBotton,
    TravelTitle,
    TravelImage,
    TravelDate,
    TravelLocation,
    TravelMoney,
    PlantTravelButton
  },
  computed: {
    travelSingle: function (){
      return this.$store.state.viajes.filter((viaje) => {
        return viaje.id_travel=== this.$route.params.travelId
      })[0]
    },
    nombre: function () {
      return this.travelSingle.nameTravel
    },
    imagen: function (){
      return this.travelSingle.image
    },
    fechaInicio: function () {
      return this.travelSingle.date_initial}
    ,
    fechaFin: function () {
      return this.travelSingle.date_end}
    ,
    formatearFecha: function () {
      this.durationTravel();
      const StarDate = format(new Date(this.fechaInicio), 'dd/MM/yyyy')
      const EndDate = format(new Date(this.fechaFin),'dd/MM/yyyy')
      return StarDate + ' ~ ' + EndDate
    },
    localizacion: function () {
      return this.travelSingle.location}
    ,
    gastos: function () {
      const gasto = this.travelSingle.money;
      if( gasto === undefined) {
        return "Gastos del viaje"
      }else{
        return gasto.toString()
      }
      }
    ,
  },
  methods: {
    durationTravel: function(){
      const duration = intervalToDuration({
        start: new Date(this.fechaInicio),
        end: new Date(this.fechaFin)
      }).days

      const durationDays = Array(duration + 1 ).fill(new Date(this.fechaInicio)).map((valor,indice) => {
        return format(add( (valor), { days: indice  }), 'dd/MM/yyyy');
      });

      return this.$store.state.diasActividad = durationDays
    },
  }
}
</script>