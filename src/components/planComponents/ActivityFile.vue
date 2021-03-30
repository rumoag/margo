
<template>
  <div class="activitie__file-upload">
    <i class="icon-file-upload"></i>
    <input type="file" placeholder="Archivo" >
  </div>

</template>

<script>
import ObtenerPlanesViaje from "@/mixins/obtenerPlanesViajesSingle.js"
export default {
  name: "ActivityFile",
  props: {

  },
  data(){
    return {

    }
  },
  methods: {/*
    abrirEditor: function (e) {
      // Obtiene la imagen
      let urlImage = URL.createObjectURL(e.target.files[0]);

      // Borra editor en caso que existiera una imagen previa
      editor.innerHTML = '';
      let cropprImg = document.createElement('img');
      cropprImg.setAttribute('id', 'croppr');
      editor.appendChild(cropprImg);

      // Limpia la previa en caso que existiera algún elemento previo
      contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);

      // Envia la imagen al editor para su recorte
      document.querySelector('#croppr').setAttribute('src', urlImage);

    },
    recortarImagen: function (data) {
      // Variables
      const inicioX = data.x;
      const inicioY = data.y;
      const nuevoAncho = data.width;
      const nuevaAltura = data.height;
      const zoom = 1;
      let imagenEn64 = '';
      // La imprimo
      miCanvas.width = nuevoAncho;
      miCanvas.height = nuevaAltura;
      // La declaro
      let miNuevaImagenTemp = new Image();
      // Cuando la imagen se carge se procederá al recorte
      miNuevaImagenTemp.onload = function() {
        // Se recorta
        contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, nuevoAncho * zoom, nuevaAltura * zoom, 0, 0, nuevoAncho, nuevaAltura);
        // Se transforma a base64
        imagenEn64 = miCanvas.toDataURL("image/jpeg");
        // Mostramos el código generado
        document.querySelector('#base64').textContent = imagenEn64;
      }
      // Proporciona la imagen cruda, sin editarla por ahora
      miNuevaImagenTemp.src = urlImage;
    }
*/

},
  mixins: [
    ObtenerPlanesViaje
  ],
};
</script>