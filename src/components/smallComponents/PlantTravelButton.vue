<template>
  <div class="single-travel__btn container">
    <button @click="guardarTravelID(); $router.push({ name: 'TravelPlan', params: {travelId: id} })"
            class="btn-outline"
    >
      <i class="icon-globe"></i>
      Plan para el viaje
    </button>

  </div>
</template>

<script>

export default {
  name: "PlanTravelButton",
  props: {
    id: String,
  },
  methods: {
    guardarTravelID: function (){
      this.$store.state.IdTravel = this.$route.params.travelId
    }
  }

};
</script>