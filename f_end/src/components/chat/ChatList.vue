<template>
  <div class='chat-list'>
    <ChatItem v-for="item of chat.getChatData()" :key='item' :item="item" />
  </div>
</template>

<script setup lang='ts'>
import { useChatStore } from '@/store/chat';
import { IChat } from '@/interface/chat';
import { onMounted } from 'vue';
import { io } from 'socket.io-client';
import ChatItem from '@/components/chat/ChatItem.vue';

const chat = useChatStore();
const chatSock = io('/');

onMounted(() => {
  //  Chat, File Event establish
  chatSock.on('hello', (data : string) => {
    console.log(data);
  }).on('chat', ( data: IChat ) => {
    chat.addList(data);
  });
});
</script>

<style scoped>
.chat-list {
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  flex-basis: 0;
  overflow-y: scroll;
}
</style>