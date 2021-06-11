<template>
  <div>
    <div  class="travel__small-card"
                 @touchstart="pulsarSlide()" @touchend="despulsarSlide()">
      <div class="travel__sc-footer">
        <div class="travel__bc-text">
          <h4><i class="icon-bag"></i>Maleta</h4>
        </div>
      </div>
    </div>
    <Actions v-if="abrirAcciones()" :travelId="id" ></Actions>
  </div>
</template>

<script>
import Actions from "@/components/smallComponents/Actions.vue"
import ActionsJS from "@/mixins/Actions.js"


export default {
  name: "CardBaglittle",
  props: {
    id: String,
  },
  data: function(){
    return {
      cronometro: 0
    }
  },
  computed: {

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