<template>
  <div>
    <section class="travel__past container">
      <div class="travel__subtitle">
        <h2>Maletas guardadas</h2>
      </div>
      <div class="travel__container-card travel__wrap">
          <CardBagLittle></CardBagLittle>
      </div>

    </section>
  </div>
</template>

<script>
  import CardBagLittle from "@/components/smallComponents/CardBagLittle.vue"
  export default {
    name: "BagSaves",
    components: {
      CardBagLittle
    }
  }
</script>

