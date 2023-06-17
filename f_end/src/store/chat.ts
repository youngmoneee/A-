import { defineStore } from 'pinia';
import { IChat } from '@/interface/chat';

export const useChatStore = defineStore('chat', {
  state: () => ({
    list: [] as IChat[],
  }),
  actions: {
    addList(chat: IChat) {
      this.list.push(chat);
    },
    getList() {
      return this.list;
    },
  },
});
