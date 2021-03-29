
<template>
  <div class="activitie__options">
    <i class="icon-money"></i>
    <span v-if="activityMoney !== ActivityFalse"
        @click="ActivityFalse = activityMoney; busqueda = ActivityFalse; gastosCero(); observador()"
          class="single-travel__wallet"
    >
      {{ activityMoney + " €"}}
    </span>
    <form v-else name="formulario" method="post"  >
        <input type="text"  id="inputTitle"
          placeholder="0.00 €"
          v-model.trim="busqueda"
          @blur="ActivityFalse=false"
          @change.prevent="actualizarGastos($route.params.ActivityId, busqueda)"
          @keydown.enter.prevent="actualizarGastos($route.params.ActivityId, busqueda)"
        >
    </form>
  </div>
</template>

<script>
import ObtenerPlanesViaje from "@/mixins/obtenerPlanesViajesSingle.js"
export default {
  name: "ActivityMoney",
  props: {
    activityMoney: String
  },
  data(){
    return {
      ActivityFalse: false,
      busqueda: null,
    }
  },
  methods: {
    dejarSoloNumeros: function (){
      this.busqueda=this.busqueda.replace(/([^0-9.]+)/g,'');
      this.busqueda =this.busqueda.replace(/^[.]/,'');
      this.busqueda =this.busqueda.replace(/[.][.]/g,'');
      this.busqueda =this.busqueda.replace(/\.(\d)(\d)(\d)/g,'.$1$2');
      this.busqueda =this.busqueda.replace(/\.(\d{1,2})\./g,'.$1');
      this.busqueda =this.busqueda.toString().split('').reverse().join('').replace(/(\d{3})/g,'$1');
      this.busqueda =this.busqueda.split('').reverse().join('').replace(/^[,]/,'');
      return this.busqueda;
    },
    actualizarGastos: function (id, gasto){
      this.ActivityFalse=false
      fetch(this.$store.state.URL_API_PLANES_CREATE, {
        headers: {
          'Authorization': this.$store.state.Authorization,
          'Content-type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify({
          "records": [
            {
              "id": id,
              "fields": {
                "GastoActividad": gasto,
              }
            }
          ]
        })
      })
          .then(() => this.obtenerPlanes())
    },
    focused: function(){
      if (this.ActivityFalse === this.activityMoney) {
        document.getElementById("inputTitle").focus();
      }
    },
    observar: function (){
      let options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0
      };
      let observer = new IntersectionObserver(this.focused, options);
      observer.observe(document.querySelector('#inputTitle'));
    },
    observador: function(){
      setTimeout(this.observar,100)
    },
    gastosCero: function (){

      if (this.busqueda === null || this.busqueda === ''|| this.busqueda === "0.00" || this.busqueda === "Gastos"){
        this.busqueda = "";
      }else{
        this.busqueda = this.activityMoney;
      }
    }
  },
  mixins: [
    ObtenerPlanesViaje
  ],
  watch:{
    busqueda: function (){
      this.dejarSoloNumeros();
    }
  }




};
</script>