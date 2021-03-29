
<template>
  <section >
    <button @click="$store.commit('optionsImgON'); $store.commit('actionsON')" class="btn_changeImg">
      Opciones
    </button>
    <ActivityOptionsDelete v-if="$store.state.displayOptionsImg" :ActivityId="ActivityId"></ActivityOptionsDelete>
  </section>
</template>
<script>
import ActivityOptionsDelete from "@/components/planComponents/ActivityOptionsDelete.vue"
import ActionsJS from "@/mixins/Actions.js"

export default {
  name: "TravelImage",
  props: {
    ActivityId: String,
  },
  components: {
    ActivityOptionsDelete,
  },
  mixins: [
    ActionsJS
  ],
};
</script>