
<template>
  <div class="activitie__icon" >
    <span @click="$store.commit('optionsIconON'); $store.commit('actionsON')" > {{icono}} </span>️
    <ActivityEditIcon v-if="$store.state.displayOptionsIcon"></ActivityEditIcon>
  </div>
</template>
<script>
import ActivityEditIcon from "@/components/planComponents/ActivityEditIcon.vue"
import ActionsJS from "@/mixins/Actions.js"

export default {
  name: "ActivityIcon",
  props: {
    icono: String,
  },
  components: {
    ActivityEditIcon
  },
  mixins: [
    ActionsJS
  ],

};
</script>