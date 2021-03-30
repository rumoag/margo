<template>
  <div>
    <BackBottonBlack></BackBottonBlack>
    <header class="plan__header">
      <div class="header">
        <div class="header__title">
          <h3>Plan para el viaje</h3>
        </div>
      </div>
    </header>
    <section class="plan">
      <div class="plan__wrapper" :style="`transform: translateX(${translate})`">
        <div class="plan__container ">
          <div v-for="(dia, index) in $store.state.diasActividad" :key="index">
            <div class="plan__day"  @click="translateDay(index);pasarDia(dia); activarClase(index ); cambiarDiaInicial(index)" :data-day="index">
              <div class="plan__text" >
                <h3>Día {{ index + 1 }}</h3>
                <p>{{ dia }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-if="this.$store.state.activityDays.length !== 0" class="plan__container-activities">
      <section v-for="activity in this.$store.state.activityDays" :key="activity.id" class="plan__activitie-container container"
               @click=" $router.push({ name: 'ActivitySingle', params: {ActivityId: activity.id} })">
        <div class="plan__activitie">
          <h3>{{ activity.fields.HoraInicio }}</h3>
          <div class="plan__card">
            <div class="plan__icon">
              <button>
                {{ activity.fields.Icono }}
              </button>
            </div>
            <div class="plan__card-text">
              <h4>{{ activity.fields.NombreActividad }}</h4>

            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-else class="plan__container-activities plan__activitie-container ">
      <p>No tienes actividades para este día</p>
      <p>Crea una nueva y organiza tu día a fondo</p>

    </div>

    <NewActivity :diaActivo="diaActive"></NewActivity>
  </div>
</template>
<script>

import obtenerPlanesViajes from "@/mixins/obtenerPlanesViajes.js"
import NewActivity from "@/components/planComponents/NewActivity.vue"
import BackBottonBlack from "@/components/smallComponents/BackBottonBlack.vue"


export default {
  name: 'TravelSingle',
  data: function() {
    return {
      diaActive: '',
      translate: '',
    }
  },
  components: {
    BackBottonBlack,
    NewActivity
  },
  mounted: function (){
    if(this.$store.state.planesActividad.length === 0){
      this.obtenerPlanes();
    } else {
      this.primerDiaAlCargar();
    }
  },
  methods: {
    cambiarDiaInicial: function (diaInicio){
      this.$store.state.diaInicialActividades = diaInicio
    },
    translateDay: function (index){
      if (index ===0){
        this.translate = 0
      } else {
      this.translate = (-9.5)*index + 9.5 +'rem';
      }
    }
  },
  mixins: [
    obtenerPlanesViajes
  ],
}

</script>