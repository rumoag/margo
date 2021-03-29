
<template>
  <section class="single-travel__img">
    <img :src="TravelImageURL" :alt="TravelImageNombre">
    <button @click="$store.commit('optionsImgON'); $store.commit('actionsON')" class="btn_changeImg">
      Editar Imagen
    </button>
    <TravelImageOptions v-if="$store.state.displayOptionsImg"></TravelImageOptions>
  </section>
</template>
<script>
import TravelImageOptions from "@/components/smallComponents/TravelImageOptions.vue"
import ActionsJS from "@/mixins/Actions.js"

export default {
  name: "TravelImage",
  props: {
    TravelImageURL: String,
    TravelImageNombre: String
  },
  components: {
    TravelImageOptions,
  },
  mixins: [
    ActionsJS
  ],
};
</script>