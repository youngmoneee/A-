<template>
  <li class="chat-item">
    <div class="user-container">
      <img :src="item.userImg" class="user-img"  alt='user profile'/>
      <span class="user-name">{{ item.userName }} :</span>
    </div>
    <div class='message'>
      <div v-if='item.fileUrl'>
        <img :src='item.fileUrl' class='chat-img' alt='file url'/>
      </div>
      <div v-for="(line, idx) in item.msg?.split('\n')" :key='idx'>
        {{ line }}
      </div>
    </div>
  </li>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue';
import { IChat } from '@/interface/IChat';

defineProps({
  item: {
    type: IChat,
    default: null,
  },

})
</script>

<style scoped>
.chat-item {
  display: flex;
  background: rgba(255, 255, 255, 0.00);
  padding: 5px;
  list-style-type: none;
}
.user-container {
  display: flex;
  align-items: center;
  margin-right: 10px;
  flex-shrink: 0;
}
.user-img {
  height: 30px;
  width: 30px;
  margin-right: 5px;
  object-fit: cover;
  border-radius: 3px;
}
.user-name {
  font-weight: bold;
  margin-right: 5px;
}
.message {
  text-align: left;
  flex-direction: column;
  padding-right: 12px;
  word-break: break-all;
}
.chat-img {
  max-width: 100%;
  max-height: 240px;
}
</style>