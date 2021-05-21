<template>
    <div class="user-log" >
      <BackBottonBlack></BackBottonBlack>
      <section class="user__header">
        <div class="header">
          <div class="header__title">
            <h3>Iniciar sesión</h3>
          </div>
        </div>
      </section>
      <section class="user-log__body  container">
        <h1 class="user-log__title">Iniciar sesión en Margo</h1>
        <form name="formulario" method="post"  class="user-log__organizer">
          <div>
            <h4>Correo electónico</h4>
            <input type="text" class="user-log__input"
                   placeholder="Correo@correo.com"
                   v-model.trim="correo"
            >
          </div>
          <div>
            <h4>Contraseña</h4>
            <input type="text" class="user-log__input"
                   placeholder="***********"
                   v-model.trim="contrasenya"
            >
          </div>
        </form>
      </section>
      <div class="user__btn container">
        <button
            class="btn-outline"
        >

          Entrar
        </button>

      </div>
    </div>
</template>

<script>

import BackBottonBlack from "@/components/smallComponents/BackBottonBlack.vue"
export default {
  name: 'User-log-in',
  components: {
    BackBottonBlack
  },

  data: function() {
    return {
      correo: '',
      contrasenya: '',
    }
  },

}

</script>
