
<template>

  <div class="single-travel__wall">

    <span v-if="travelMoney !== travelFalse"
        @click="travelFalse = travelMoney; busqueda = travelMoney; gastosCero(); observador()"
          class="single-travel__wallet"
    >
      {{ travelMoney + " €"}}
    </span>
    <form v-else name="formulario" method="post"  >
        <input type="text"  id="inputTitle" class="single-travel__wallet-input"
          placeholder="0.00 €"
          v-model.trim="busqueda"
          @blur="travelFalse=false"
          @change.prevent="actualizarGastos($route.params.travelId, busqueda)"
          @keydown.enter.prevent="actualizarGastos($route.params.travelId, busqueda)"
        >
    </form>

  </div>
</template>

<script>
import ObtenerViaje from "@/mixins/obtenerViajes.js"
export default {
  name: "travelMoney",
  props: {
    travelMoney: String
  },
  data(){
    return {
      travelFalse: false,
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
    actualizarDatos: function (id){
      return this.$store.state.viajes.filter((viaje) => {
        return viaje.id_travel=== id
      })[0]
    },
    actualizarGastos: function (id, gastos){
      this.travelFalse = false;
      this.myTravel(this.actualizarDatos(id).id_travel, this.actualizarDatos(id).nameTravel, this.actualizarDatos(id).image, this.actualizarDatos(id).location, this.actualizarDatos(id).longitud, this.actualizarDatos(id).latitud, this.actualizarDatos(id).date_initial, this.actualizarDatos(id).date_end, gastos, this.actualizarDatos(id).status,this.actualizarDatos(id).deleted);
      this.$store.state.viajes[id - 1].money = gastos;
    },
    focused: function(){
      if (this.travelFalse === this.travelMoney) {
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

      if (this.busqueda === null || this.busqueda === ''|| this.busqueda === "0.00" || this.busqueda === "Gastos del viaje"   ){
        this.busqueda = "";
      }else{
        this.busqueda = this.travelMoney;
      }
    }
  },
  mixins: [
    ObtenerViaje
  ],
  watch:{
    busqueda: function (){
      this.dejarSoloNumeros();
    }
  }




};
</script>