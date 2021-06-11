<template>
  <header class="menu">
    <ul class="menu__container container">
      <router-link to="/"  class="menu__link" :class="{'menu__active': headerActiveTitleTravel}" >
        <li class="menu__icon">
            <i class="icon-explore"></i>
            <span class="menu__txt">Viajes</span>
        </li>

      </router-link>
      <router-link to="/Bag"  class="menu__link" :class="{'menu__active': headerActiveTitleBag}" >
        <li class="menu__icon">
            <i class="icon-bag"></i>
          <span class="menu__txt">Maletas</span>
        </li>
      </router-link>
      <router-link to="/User"  class="menu__link" :class="{'menu__active': headerActiveTitleUser}" >
        <li class="menu__icon">
          <i class="icon-user"></i>
          <span class="menu__txt">Usuario</span>
        </li>
      </router-link>

    </ul>
  </header>
</template>

<script>

export default {
  name: "Header",
  data: function() {
    return{
      headerActiveTitleTravel: true,
      headerActiveTitleBag: false,
      headerActiveTitleUser: false,
      routeFull: this.$route.fullPath
    }

  },
  mounted() {
    this.activeNameTitle();
  },
  methods: {

    activeNameTitle: function () {
      let routeTotal= this.routeFull;
      if (routeTotal.includes('/Bag')) {
        this.headerActiveTitleTravel = false;
        this.headerActiveTitleBag = true;
        this.headerActiveTitleUser = false;
      } else if (routeTotal.includes('/User')) {
        this.headerActiveTitleTravel = false;
        this.headerActiveTitleBag = false;
        this.headerActiveTitleUser = true;
      } else {
        this.headerActiveTitleTravel = true;
        this.headerActiveTitleBag = false;
        this.headerActiveTitleUser = false;
      }

    }
  },

  watch:{
    $route() {
      this.routeFull= this.$route.fullPath;
      this.activeNameTitle();
    },

  }



};
</script>
