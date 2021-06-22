<template>
  <div>
    <div @click="$router.push({ name: 'TravelSingle', params: {travelId: id} })" class="travel__small-card"
                 @touchstart="pulsarSlide()" @touchend="despulsarSlide()">
      <div class="travel__sc-img" :style="`background-image:url(${imagen})`">
      </div>
      <div class="travel__sc-footer">
        <div class="travel__bc-text">
          <h4>{{ nombre }}</h4>
          <p style="text-transform: capitalize">{{ formatearFecha(fecha) }}</p>
        </div>
      </div>
    </div>
    <Actions v-if="abrirAcciones()" :travelId="id" ></Actions>
  </div>
</template>

<script>
import Actions from "@/components/smallComponents/Actions.vue"
import ActionsJS from "@/mixins/Actions.js"
import { formatRelative, subDays } from 'date-fns'
import { es } from 'date-fns/locale'

export default {
  name: "Card",
  props: {
    id: String,
  },
  data: function(){
    return {
      cronometro: 0
    }
  },
  computed: {
    obtenerTravel: function (){
      return this.$store.state.viajes.filter( (viaje)=>{
        return viaje.id_travel === this.id && viaje.deleted === '0'
      })[0]
    },
    nombre: function () {
      return this.obtenerTravel.nameTravel
    },
    imagen: function (){
      return this.obtenerTravel.image
    },
    fecha: function () {
      return this.obtenerTravel.date_initial
    },
    cronoCero: function (){
      return this.$store.state.restoreCronometro
    }
  },
  components: {
    Actions
  },
  mixins: [
    ActionsJS
  ],
  methods: {
    sumaUnSegundo: function () {
      this.cronometro = this.cronometro + 1;
    },
    formatearFecha: function ( fechaInicio) {
      return formatRelative(subDays(new Date(fechaInicio),0), new Date(), {locale: es})
    },
  },
  watch: {
    cronoCero: function () {
      if (this.cronoCero){
        this.cronometro = 0
      }
    }
  }


};
</script>