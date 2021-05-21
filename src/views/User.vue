<template>
    <div class="user" >
      <section class="user__header">
        <div class="header">
          <div class="header__title">
            <h3>Perfil</h3>
          </div>
        </div>
      </section>
      <section class="user__body">
        <div class="user__duo">
          <button class="user__ind" @click="$router.push({ name: 'User-log-in'})">
            <i class="icon-user"></i>
            <h3>Iniciar sesión</h3>
          </button>
          <button class="user__ind" @click="$router.push({ name: 'User-sign-in'})">
            <i class="icon-add"></i>
            <h3>Registro</h3>
          </button>
        </div>
      </section>

    </div>

</template>

<script>


export default {
  name: 'User',
  components: {

  },

  data: function() {
    return {
    }
  },

}

</script>
