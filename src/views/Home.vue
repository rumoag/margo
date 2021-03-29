<template>
  <div class="home">
    <TravelMessage ></TravelMessage>
    <TravelFuture></TravelFuture>
    <NewTravel></NewTravel>
    <TravelNoDate v-if="$store.state.displayNoDate"></TravelNoDate>
    <TravelPasat v-if="$store.state.displayPasat"></TravelPasat>

  </div>
</template>

<script>
import TravelMessage from "@/components/TravelMessage.vue"
import TravelFuture from "@/components/TravelFuture.vue";
import TravelPasat from "@/components/TravelPasat.vue";
import TravelNoDate from "@/components/TravelNoDate.vue";
import NewTravel from "@/components/NewTravel.vue";


export default {
  name: 'Home',
  components: {
    TravelMessage,
    TravelFuture,
    TravelPasat,
    TravelNoDate,
    NewTravel,
  },

  data: function() {
    return {
    }
  },

}

</script>
