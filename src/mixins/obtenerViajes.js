import { isAfter } from 'date-fns'
export default {
    methods: {
         obtenerViajes: function ()  {
            fetch(this.$store.state.URL_API)
            .then((response) => response.json())
            .then((json) => this.$store.state.viajes = json)
            .then(() => this.today())
            .then(() => this.repartirViajes())
            .then(() => this.verViajes());
        },
        today: function (){
            this.$store.state.viajes.forEach((viaje)=>{
                const now = new Date();
                const nowDay = now.getDate();
                const travelDate = new Date(viaje.date_initial);
                const travelDateDay = travelDate.getDate();
                if(nowDay === travelDateDay) {
                    viaje.status = '2'
                } else if (travelDate.getFullYear() === 2020){
                    viaje.status = '0'
                } else if (isAfter(new Date(travelDate.getFullYear(), (travelDate.getMonth() +1), travelDate.getDate()), new Date(now.getFullYear(), (now.getMonth() +1), now.getDate()))){
                    viaje.status = '3'
                } else {
                    viaje.status = '1'
                }
                this.myTravel(viaje.id_travel, viaje.nameTravel, viaje.image, viaje.location, viaje.longitud, viaje.latitud, viaje.date_initial, viaje.date_end, viaje.money, viaje.status, viaje.deleted)
            })
        },
        myTravel: function (id,name,img,location,long,lat,dInit,dEnd,money,status,deleted){
             this.$store.state.myIdTravel = id;
             this.$store.state.myNameTravel = name;
             this.$store.state.myImage = img;
             this.$store.state.myLocation = location;
             this.$store.state.myLongitud = long;
             this.$store.state.myLatitud = lat;
             this.$store.state.myDateInitial = dInit;
             this.$store.state.myDateEnd = dEnd;
             this.$store.state.myMoney = money;
             this.$store.state.myStatus = status;
            this.$store.state.deleted = deleted;
             this.actualizarViaje();
        },
        actualizarViaje: function (){
            fetch(this.$store.state.URL_API, {
                headers: {
                    'Content-type': 'application/json'
                },
                method: 'PUT',
                body: JSON.stringify({
                    id_travel: this.$store.state.myIdTravel,
                    nameTravel: this.$store.state.myNameTravel,
                    image: this.$store.state.myImage,
                    location: this.$store.state.myLocation,
                    longitud: this.$store.state.myLongitud,
                    latitud: this.$store.state.myLatitud,
                    date_initial: this.$store.state.myDateInitial,
                    date_end: this.$store.state.myDateEnd,
                    money: this.$store.state.myMoney,
                    status: this.$store.state.myStatus,
                    deleted: this.$store.state.deleted,
                })
            })
            this.repartirViajes();
        },
        repartirViajes: function() {
            this.$store.state.viajes = this.$store.state.viajes.filter(viaje => {
                return viaje.deleted !== '1'
            });
            this.$store.state.viajesPasados = this.$store.state.viajes.filter(viaje => {
                return viaje.status === '1'
            });
            this.$store.state.viajesFuturos = this.$store.state.viajes.filter(viaje => {
                return viaje.status === '3'
            });
            this.$store.state.viajesPresentes = this.$store.state.viajes.filter(viaje => {
                return viaje.status === '2'
            });
            this.$store.state.viajesSinFechas = this.$store.state.viajes.filter(viaje => {
                return viaje.status === '0'
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
