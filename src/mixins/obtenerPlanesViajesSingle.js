export default {
    methods: {
        obtenerPlanes: function ()  {
            fetch(this.$store.state.URL_API_PLANES, {
                headers: {
                    'Authorization': this.$store.state.Authorization,
                }
            })
                .then((response) => response.json())
                .then((json) => this.$store.state.planes = json.records)
                .then(() => this.verSiHayActividades())

        },
        verSiHayActividades: function() {
            this.$store.state.planesActividad = this.$store.state.planes.filter(plan => {
                return plan.fields.Viajes[0] === this.$store.state.IdTravel });
        },
    },
}
