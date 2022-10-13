<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: "myLoading",
};
</script>

<style scoped>
.loading {
  position: fixed;
  left: 0;
  top: 0;
  background: url("../assets/index.svg") center center no-repeat
    rgba(60, 60, 60, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}
</style>
