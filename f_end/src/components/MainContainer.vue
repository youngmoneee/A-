<template>
  <div class='main-container'>
    <DisplayDiv class='DisplayDiv' />
    <ChatDiv class='ChatDiv' />
  </div>
</template>

<script setup>
import ChatDiv from '@/components/chat/ChatDiv.vue';
import DisplayDiv from '@/components/DisplayDiv.vue';
</script>

<style scoped>
.main-container {
  background-image: url('/src/assets/bg.png');
  object-fit: contain;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.DisplayDiv {
  flex: 6 1 0;
  justify-content: center;
  padding: 10px;
  height: 100%;
}
.ChatDiv {
  flex: 4 1 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  border-top: 1px solid gray;
}
</style>