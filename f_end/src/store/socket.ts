import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { io, Socket } from 'socket.io-client';
import { useChatStore } from '@/store/chat';

export const useSocketStore = defineStore('socket', () => {
  const sock = ref<Socket | null>(null);
  function setSocket(token: string) {
    const { addList } = useChatStore();
    if (!sock.value)
      sock.value = io('/', {
        auth: { token: token },
      }).on('chat', chat => addList(chat))
        .on('disconnect', () => closeSocket());
  }
  function closeSocket() {
    if (sock.value) {
      sock.value.close();
      sock.value = null;
    }
  }
  function onEvent(ev: string, cb: any) {
    if (sock.value) sock.value.on(ev, cb);
  }
  function offEvent(ev: string) {
    if (sock.value) sock.value.off(ev);
  }
  const sockConnected = computed(() => sock.value?.connected ?? false);
  return {
    socket: sock,
    setSocket,
    closeSocket,
    onEvent,
    offEvent,
    sockConnected,
  };
});
