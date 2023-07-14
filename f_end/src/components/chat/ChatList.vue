<template>
  <div class='chat-list'>
    <li v-for="item of $chat.getList()" :key='item' class="chat-item">
      <div class="user-container">
        <img :src="item.userImg" class="user-img" />
        <span class="user-name">{{ item.userName }} :</span>
      </div>
      <div v-if='item.msg' class="message">{{ item.msg }}</div>
      <div v-if='item.fileUrl' class="message">
        <img :src='item.fileUrl' />
      </div>
    </li>
  </div>
</template>

<script setup lang='ts'>
import { useChatStore } from '@/store/chat';
import { IChat } from '@/interface/chat';
import { onMounted } from 'vue';
import { io } from 'socket.io-client';

const $chat = useChatStore();
const $chatSock = io('/');

onMounted(() => {
  //  Chat, File Event establish
  $chatSock.on('hello', (data : string) => {
    console.log(data);
  }).on('chat', ( data: IChat ) => {
    $chat.addList(data);
  });
});
</script>

<style scoped>
.user-container {
  height: 100%;
  display: flex;
  align-items: center;
  margin-right: 10px;
}
.user-img {
  height: 100%;
  object-fit: cover;
  border-radius: 3px;
  margin-right: 5px;
}
.user-name {
  font-weight: bold;
  margin-right: 5px;
}
.message {
  flex-grow: 1;
  text-align: left;
}
.chat-list {
  flex-grow: 1;
  overflow-y: auto;
}
.chat-item {
  height: 30px;
  width: 100%;
  background-color: lightgray;
  padding: 5px;
  list-style-type: none;
  display: flex;
  align-items: center;
}
</style>