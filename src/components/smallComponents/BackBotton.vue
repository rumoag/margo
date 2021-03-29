<template>
  <div @click="$router.go(-1)" class="btn__undo btn__undo-white">
    <button >
      <i class="icon-arrow-left"> </i>
    </button>
  </div>
</template>

<script>
export default {
  name: "Back",
};
</script>