<template>
<div class='display-div'>
  <router-view />
</div>
</template>

<script setup lang='ts'>
</script>

<style scoped>
.display-div {
  background-image: url('/src/assets/bg.png');
  object-fit: contain;
  justify-content: center;
  padding: 10px;
}
</style>