<template>
  <div class='main-container'>
  <ChatDiv />
  </div>
</template>

<script setup>
import ChatDiv from '@/components/chat/ChatDiv.vue';
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
</style>