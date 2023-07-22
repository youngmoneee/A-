import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '@/store/auth';
import { computed, ref } from 'vue';

export const useSocketStore = defineStore('socket', () => {
  const sock = ref(sockInit());
  function sockInit(): Socket {
    const { token } = useAuthStore();
    const res = io('/', {
      query: {
        token: token,
      },
    });
    return res;
  }
  const socket = computed(() => {
    if (sock.value.disconnected) sock.value = sockInit();
    return sock.value;
  });
  return { socket };
});
