import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth';

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: null as Socket | null,
  }),
  actions: {
    sockInit() {
      const $auth = useAuthStore();
      $auth.parseToken();
      this.socket = io('/', {
        query: {
          token: $auth.$state.token,
        },
      });
    },
    getSock() {
      if (!this.socket) this.sockInit();
      if (this.socket?.disconnected) this.sockInit();
      return this.socket as Socket;
    },
  },
});
