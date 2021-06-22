import {format} from "date-fns";

export default {
    methods: {
         obtenerPlanes: function ()  {
             fetch(this.$store.state.URL_API_PLANES)
                .then((response) => response.json())
                .then((json) => this.$store.state.planes = json.records)
                .then(() => this.verSiHayActividades())
                .then(() => this.primerDiaAlCargar())

        },
        verSiHayActividades: function() {
            this.$store.state.planesActividad = this.$store.state.planes.filter(plan => {
            return plan.id_travel === this.$store.state.IdTravel});
        },
        primerDiaAlCargar: function (){
            this.pasarDia(this.$store.state.diasActividad[this.$store.state.diaInicialActividades])
            this.activarClase(this.$store.state.diaInicialActividades)
        },
        pasarDia: function (dia){
            const diaFormateado = dia.split("/");
            const anyos = parseInt(diaFormateado[2]);
            const meses = parseInt(diaFormateado[1].split("0").join('')) - 1;
            const dias = parseInt(diaFormateado[0] ) - 1;
            this.diaActive = format(new Date(anyos, meses, dias ,22,0,0 ),"yyyy-MM-dd'T'HH:mm:ss.SSS")+"Z";
            return this.$store.state.activityDays = this.$store.state.planesActividad.filter((objeto)=>{
                return this.formatearDate(objeto) === dia
            })
        },
        formatearDate: function(objeto){
            const result = format(new Date(objeto.fields.Dia), 'dd/MM/yyyy')
            return result
        },
        activarClase: function (index){
            const planDay = document.querySelectorAll('.plan__day');
            planDay.forEach( (element) => {
                    element.classList.remove('plan__day-activo')
                    if (element.dataset.day === index.toString()){
                        element.classList.add('plan__day-activo')
                    }
                }
            )
        },
    },
}
