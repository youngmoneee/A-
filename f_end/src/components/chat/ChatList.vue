<template>
  <div class='chat-list'>
    <li v-for="item in $chat.list" :key="item" class="chat-item">
      <div class="user-container">
        <img :src="item.userImg" class="user-img" />
        <span class="user-name">{{ item.userName }} :</span>
      </div>
      <div class="message">{{ item.data }}</div>
    </li>
  </div>
</template>

<script setup>
import { useChatStore } from '@/store/chat';
import { eContent, IChat } from '@/interface/chat';
import { onMounted } from 'vue';

const $chat = useChatStore();
const testChat = {
  userName: 'youngseo',
  userImg: 'https://mblogthumb-phinf.pstatic.net/MjAyMDA1MTJfMjYx/MDAxNTg5MjE1ODQxNTM2.5UmlEc6gKqta0UyS4yyoKDkrshSy934u_Tr3RizrY-sg.jSZpS73iAnTwC5i6QRz_IOmjc5o36Vz1974Foz4F12wg.JPEG.z12wow/F24DD4E0-2A6F-48E8-84B0-B0DD7D28A706-14234-000004146FA32A71_file.jpg?type=w800',
  data: 'hihi2',
  chatType: eContent.TEXT,
};

onMounted(() => {
  $chat.addList(testChat);
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