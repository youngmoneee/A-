<template>
  <div>
    <ChatList class='chat-list'/>
    <ChatSend class ='chat-send'/>
  </div>
</template>
<script setup>
import ChatList from '@/components/chat/ChatList.vue';
import ChatSend from '@/components/chat/ChatSend.vue';
</script>

<style scoped>
.chat-list {
  display: flex;
}
.chat-send {
  display: flex;
}
</style>