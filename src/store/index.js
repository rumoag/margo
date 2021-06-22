import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    displayHeader: true,
    displayNoDate: false,
    displayPasat: false,
    displayActions: true,
    displayOptionsImg: false,
    displayOptionsIcon: false,
    restoreCronometro: false,
    viajes: [],
    viajesPasados: [],
    viajesFuturos: [],
    viajesSinFechas: [],
    viajesPresentes: [],
    planes: [],
    planesActividad: [],
    diasActividad: [],
    activityDays: [],
    resultadosIcon:[],
    IdTravel: '',
    diaInicialActividades: 0,
    URL_API: "http://localhost:8080/api/apiTravel.php",
    URL_API_PLANES: "http://localhost:8080/api/apiTravelActivities.php",
    //URL_API_PLANES_CREATE: "https://api.airtable.com/v0/app1Myyzo3nnkGOPj/PlanViaje",
    //URL_API_PLANES_DELETE: "https://api.airtable.com/v0/app1Myyzo3nnkGOPj/PlanViaje?records[]="
    myIdTravel: '',
    myNameTravel: '',
    myImage: '',
    myLocation: '',
    myLongitud: '',
    myLatitud: '',
    myDateInitial: '',
    myDateEnd: '',
    myMoney: '',
    myStatus: '',
  },
  getters:{
  },
  mutations: {
    noDateATrue: state =>  {
        state.displayNoDate = true
    },
    pasatATrue: state =>  {
        state.displayPasat = true
    },
    actionsON: state => {
      state.displayActions = false
    },
    actionsOFF: state => {
      state.displayActions = true
    },
    optionsImgON: state => {
      state.displayOptionsImg = true
    },
    optionsImgOFF: state => {
      state.displayOptionsImg = false
    },
    optionsIconON: state => {
      state.displayOptionsIcon = true
    },
    optionsIconOFF: state => {
      state.displayOptionsIcon = false
    },
    restoreCrono: state => {
      state.restoreCronometro = true
      setTimeout(function (){state.restoreCronometro = false}, 200)
    }
  },
  actions: {

  },
  modules: {
  }
})
