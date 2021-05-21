<template>
    <div class="user-sign" >
      <BackBottonBlack></BackBottonBlack>
      <section class="user__header">
        <div class="header">
          <div class="header__title">
            <h3>Registro</h3>
          </div>
        </div>
      </section>
      <section class="user-sign__body  container">
        <h1 class="user-sign__title">Añade tus datos </h1>
        <form name="formulario" method="post"  class="user-sign__organizer">
          <div>
            <h4>Nombre</h4>
            <input type="text" class="single-travel__wallet-input"
                   placeholder="Nombre"
                   v-model.trim="nombre"
            >
          </div>
          <div>
            <h4>Apellidos</h4>
            <input type="text" class="single-travel__wallet-input"
                   placeholder="Apellidos"
                   v-model.trim="apellidos"
            >
          </div>
          <div>
            <h4>Correo electónico</h4>
            <input type="text" class="single-travel__wallet-input"
                   placeholder="Correo@correo.com"
                   v-model.trim="correo"
            >
          </div>
        </form>
        <p>
          Te enviaremos una verificación y una
          contraseña que puedes cambiar desde
          el usuario
        </p>
        <p class="user-sign__last-margin">
          Al hacer clic en el botón de aceptar y continuar
          acepto todos las políticas: políticas de
          privacidad.
        </p>
      </section>
      <div class="user__btn container">
        <button
                class="btn-outline"
        >
          Aceptar
        </button>

      </div>


    </div>

</template>

<script>

import BackBottonBlack from "@/components/smallComponents/BackBottonBlack.vue"
export default {
  name: 'User-sign-in',
  components: {
    BackBottonBlack
  },

  data: function() {
    return {
      nombre: '',
      correo: '',
      apellidos:'',
    }
  },

}

</script>
