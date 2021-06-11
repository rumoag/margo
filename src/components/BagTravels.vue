<template>
  <div>
    <section class="travel__future container">
      <div class="travel__subtitle">
        <h2>Maletas de viajes </h2>
      </div>
    </section>
    <CardBag></CardBag>
  </div>
</template>

<script>

  import CardBag from "@/components/smallComponents/CardBag.vue"
  export default {
    name: "BagTravels",
    components: {
      CardBag,
    },
  };
</script>

