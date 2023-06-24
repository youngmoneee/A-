<template>
  <div class='chat-list'>
    <ChatItem v-for="item of chat.getChatData()" :key='item' :item="item" />
  </div>
</template>

<script setup lang='ts'>
import { useChatStore } from '@/store/chat';
import { IChat } from '@/interface/chat';
import { inject, onMounted } from 'vue';
import ChatItem from '@/components/chat/ChatItem.vue';

const chat = useChatStore();
const chatSock: any = inject('socket',);

onMounted(() => {
  //  Chat, File Event establish
  if (!chatSock) throw new Error('Socket Error');
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