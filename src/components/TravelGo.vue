<template>
  <section class="travel__now container">
    <div class="travel__subtitle">
      <h3> En marcha</h3>
    </div>
    <div class="travel__big-card" v-for="viaje in $store.state.viajesPresentes" :key="viaje.id"
         @click="$router.push({ name: 'TravelSingle', params: {travelId: viaje.id} })"
         @touchstart="pulsarSlide()" @touchend="despulsarSlide()">
      <div class="travel__bc-img" :style="`background-image:url(${viaje.fields.Imagen[0].url})`">
      </div>
      <div class="travel__bc-footer">
        <div class="travel__bc-text">
          <h3>{{ viaje.fields.NombreViaje }}</h3>
          <p style="text-transform: capitalize" >{{ formatearFecha(viaje.fields.FechaViajeInicio) }}</p>
        </div>
        <div class="travel__bc-location">
          <a href="#">
            <i class="icon-map-location"></i>
          </a>
        </div>
      </div>
    </div>
    <Actions v-if="abrirAcciones()"></Actions>
  </section>
</template>
<script>
import Actions from "@/components/smallComponents/Actions.vue"
import ActionsJS from "@/mixins/Actions.js"
import { formatRelative, subDays } from 'date-fns'
import { es } from 'date-fns/locale'
export default {
  name: "TravelGO",
  components: {
    Actions
  },
  mixins: [
    ActionsJS
  ],
  methods: {
    formatearFecha: function ( fechaInicio) {
      return formatRelative(subDays(new Date(fechaInicio),0), new Date(), {locale: es})
    },
  }

};
</script>
