<template>
  <div class='censor-div'>
    <CensorDisplay />
  </div>
</template>

<script setup>
import CensorDisplay from '@/components/censor/CensorDisplay.vue';
</script>

<style scoped>
.censor-div {
  background: red;
  justify-content: center;
  padding: 10px;
}
</style>