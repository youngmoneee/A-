<template>
  <div class='chat-list'>
    <ChatItem v-for="item of chatData" :key='item' :item="item" />
  </div>
</template>

<script setup lang='ts'>
import { useChatStore } from '@/store/chat';
import { onMounted } from 'vue';
import ChatItem from '@/components/chat/ChatItem.vue';
import { useSocketStore } from '@/store/socket';
import { storeToRefs } from 'pinia';

const { addList } = useChatStore();
const { chatData } = storeToRefs(useChatStore());
const { onEvent } = useSocketStore();

onMounted(() => {
  onEvent('chat', addList);
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