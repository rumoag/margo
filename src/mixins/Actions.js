export default {
    methods:{
        pulsarSlide: function() {
            this.$store.commit('actionsON');
            this.accionesEditar = true;
            this.intervaloEditar = setInterval(this.mientrasEstoyPulsado, 1000)
        },

        mientrasEstoyPulsado(){
            if ( this.accionesEditar){
                this.sumaUnSegundo();
                console.log('Botón pulsado');
            }
        },
        despulsarSlide: function (){
            console.log('Botón soltado');
            this.accionesEditar = false;
            clearInterval(this.intervaloEditar)
        },
        abrirAcciones: function (){
            if (this.cronometro >= 0.75){
                this.despulsarSlide();
                return true
            } else {
                return false
            }
        },


    }
}