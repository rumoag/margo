<template>
  <div>
    <BackBottonBlack></BackBottonBlack>
    <ActivityOptions :ActivityId=this.$route.params.ActivityId ></ActivityOptions>
    <header>
      <div class="header">
        <div class="header__title">
          <h3>{{ nombre }}</h3>
        </div>
      </div>
    </header>

    <section class="activitie">
      <div class="activitie__container container">
        <ActivityIcon :icono="icono"></ActivityIcon>
        <ActivityTitle :ActivityTitle="nombre" ></ActivityTitle>
        <div class="activitie__info">
          <ActivityHoraInicio :HoraInicio="horaInicio"> </ActivityHoraInicio>
          <ActivityDuration :HoraInicio="horaInicio" :Duration="horaFin" ></ActivityDuration>
          <ActivityMoney  :activityMoney="gastoActividad"> </ActivityMoney>
        </div>
        <div class="activitie__file-upload">
          <i class="icon-file-upload"></i>
          <input type="file" placeholder="Archivo" >
        </div>
        <ActivityNote :activityNote="comentario"></ActivityNote>
      </div>
    </section>

  </div>
</template>
<script>
import ActivityTitle from "@/components/planComponents/ActivityTitle.vue"
import ActivityHoraInicio from "@/components/planComponents/ActivityHoraInicio.vue"
import ActivityDuration from "@/components/planComponents/ActivityDuration.vue"
import ActivityMoney from "@/components/planComponents/ActivityMoney.vue"
import ActivityNote from "@/components/planComponents/ActivityNote.vue"
import ActivityIcon from "@/components/planComponents/ActivityIcon.vue"
import ActivityOptions from "@/components/planComponents/ActivityOptions.vue"

import BackBottonBlack from "@/components/smallComponents/BackBottonBlack.vue"

export default {
  name: 'ActivitySingle',
  components: {
    BackBottonBlack,
    ActivityTitle,
    ActivityHoraInicio,
    ActivityDuration,
    ActivityMoney,
    ActivityNote,
    ActivityIcon,
    ActivityOptions

  },
  computed: {
    activitySingle: function (){
      return this.$store.state.planesActividad.filter((activity) => {
        return activity.id === this.$route.params.ActivityId
      })[0].fields
    },
    nombre: function () {
      return this.activitySingle.NombreActividad
    },
    icono: function (){
      return this.activitySingle.Icono}
    ,
    horaInicio: function (){
      return this.activitySingle.HoraInicio}
    ,
    horaFin: function (){
      return this.activitySingle.HoraFIn}
    ,
    gastoActividad: function (){
      return this.activitySingle.GastoActividad}
    ,
    comentario: function (){
      return this.activitySingle.Comentario}
    ,

  },
  data: function (){
    return{
      planes : this.$store.state.planesActividad
    }
  },
  watch: {
    planes: function (){
      this.activitySingle();
    }
  }
}

</script>