<template>
  <div class="bag">
    <section  v-if="bag === 0">
      <div class="travel__container container">
        <div class="travel__title">
          <h1>Usuario, no tienes
            ninguna maleta
            organizada.
          </h1>
        </div>
        <div class="travel__subtitle">
          <h2>Genera alguna que no
            se te olvide nada</h2>
        </div>
      </div>
    </section>
    <section v-else class="travel">
      <div class="travel__container container">
        <div class="travel__title">
          <h1>Las maletas están listas
            para irnos</h1>
        </div>
      </div>
      <BagTravels></BagTravels>
      <BagSaves></BagSaves>
    </section>
    <NewBag></NewBag>
  </div>
</template>

<script>

import NewBag from '@/components/NewBag.vue'
import BagTravels from "@/components/BagTravels";
import BagSaves from "@/components/BagSaves";
export default {
  name: 'Bag',
  components: {
    NewBag,
    BagTravels,
    BagSaves
  },

  data: function() {
    return {
      bag: 1,
    }
  },

}

</script>
