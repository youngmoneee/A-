<template>
  <div class='main-container'>
    <CensorDiv class='censor-div' />
    <ChatDiv class='chat-div' />
  </div>
</template>

<script setup>
import ChatDiv from '@/components/chat/ChatDiv.vue';
import CensorDiv from '@/components/censor/CencorDiv.vue';
</script>

<style scoped>
.main-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.censor-div {
  height: 60%;
}
.chat-div {
  height: 40%;
}
</style>