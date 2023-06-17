<template>
  <div class='chat-div'>
    <ChatList></ChatList>
    <ChatSend></ChatSend>
  </div>
</template>
<script setup>
import ChatList from '@/components/chat/ChatList.vue';
import ChatSend from '@/components/chat/ChatSend.vue';
</script>

<style scoped>
.chat-div {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>