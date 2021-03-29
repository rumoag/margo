<template>
  <div @click="$router.go(-1)" class="btn__undo">
    <button >
      <i class="icon-arrow-left"> </i>
    </button>
  </div>
</template>

<script>
export default {
  name: "BackBlack",
};
</script>