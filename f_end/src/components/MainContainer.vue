<template>
  <div class='main-container'>
    <DisplayDiv class='display-div' />
    <ChatDiv class='chat-div' />
  </div>
</template>

<script setup>
import ChatDiv from '@/components/chat/ChatDiv.vue';
import DisplayDiv from '@/components/DisplayDiv.vue';
</script>

<style scoped>
.main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.display-div {
  height: 60%;
}
.chat-div {
  height: 40%;
}
</style>