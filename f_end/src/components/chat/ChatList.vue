<template>
  <div class='chat-list'>
    <li v-for="item of $chat.getList()" :key='item' class="chat-item">
      <div class="user-container">
        <img :src="item.userImg" class="user-img" />
        <span class="user-name">{{ item.userName }} :</span>
      </div>
      <div class='message'>
        <div v-if='item.fileUrl'>
          <!--img v-if='item.fileUrl' :src='item.fileUrl' class='chat-img'/-->
          <img :src='item.fileUrl' class='chat-img'/>
        </div>
        <div v-for="(line, idx) in item.msg?.split('\n')" :key='idx' class='line'>
          {{ line }}
        </div>
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
  height: 30px;
  width: 30px;
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
  display: flex;
  flex-direction: column;
}
.line {
  word-wrap: break-word;
}
.chat-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-grow: 1;
  max-height: calc(100vh - 40px);
}
.chat-item {
  width: 100%;
  background-color: lightgray;
  padding: 5px;
  list-style-type: none;
  display: flex;
  align-items: center;
}
.chat-img {
  max-height: 240px;
}
</style>