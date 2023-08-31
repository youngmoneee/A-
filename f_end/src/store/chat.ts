import { defineStore } from 'pinia';
import { IChat } from '@/interface/IChat';
import { computed, ref } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const list = ref<IChat[]>([]);
  const chatData = computed(() => list.value.slice().reverse());
  function addList(chat: IChat) {
    list.value.push(chat);
  }
  return { list, chatData, addList };
});
