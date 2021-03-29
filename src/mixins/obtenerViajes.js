import { isAfter } from 'date-fns'
export default {
    methods: {
         obtenerViajes: function ()  {
            fetch(this.$store.state.URL_API, {
            headers: {
                'Authorization': 'Bearer keypFgW9ql6PGevJQ',
                }
            })
            .then((response) => response.json())
            .then((json) => this.$store.state.viajes = json.records)
            .then(() => this.today())
            .then(() => this.repartirViajes())
            .then(() => this.verViajes());
        },
        today: function (){
            this.$store.state.viajes.forEach((viaje)=>{
                const now = new Date();
                const nowDay = now.getDate();
                const travelDate = new Date(viaje.fields.FechaViajeInicio);
                const travelDateDay = travelDate.getDate();
                if(nowDay === travelDateDay) {
                    viaje.fields.Estado = "Presente"
                } else if (travelDate.getFullYear() === 2020){
                    viaje.fields.Estado = "Sin fecha"
                } else if (isAfter(new Date(travelDate.getFullYear(), (travelDate.getMonth() +1), travelDate.getDate()), new Date(now.getFullYear(), (now.getMonth() +1), now.getDate()))){
                    viaje.fields.Estado = "Futuro"
                } else {
                    viaje.fields.Estado = "Pasado"
                }
                this.actualizarEstado(viaje.id, viaje.fields.Estado)
            })
        },
        actualizarEstado: function (id,estado){
            fetch(this.$store.state.URL_UPDATE, {
                headers: {
                    'Authorization': this.$store.state.Authorization,
                    'Content-type': 'application/json'
                },
                //pacth un solo producto a la vez
                method: 'PATCH',
                body: JSON.stringify({
                    "records": [
                        {
                            "id": id,
                            "fields": {
                                "Estado": estado,
                            }
                        }
                    ]
                })
            })
        },
        repartirViajes: function() {
            this.$store.state.viajesPasados = this.$store.state.viajes.filter(viaje => {
            return viaje.fields.Estado === "Pasado"
        });
            this.$store.state.viajesFuturos = this.$store.state.viajes.filter(viaje => {
            return viaje.fields.Estado === "Futuro"
        });
            this.$store.state.viajesPresentes = this.$store.state.viajes.filter(viaje => {
            return viaje.fields.Estado === "Presente"
        });
            this.$store.state.viajesSinFechas = this.$store.state.viajes.filter(viaje => {
            return viaje.fields.Estado === "Sin fecha"
        });
        },
        //Para ver si hay viajes pasados o sin fecha para activar el componente
        verViajes: function (){
             if ( this.$store.state.viajesSinFechas.length !== 0){
                 this.$store.commit('noDateATrue');
             }
            if (  this.$store.state.viajesPasados.length !== 0){
                this.$store.commit('pasatATrue');
            }
        }
    },
}
