import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const tok = ref('');
  const token = computed(() => {
    return tok.value;
  });
  function setToken(token: string) {
    tok.value = token;
  }

  const isAuthed = computed(() => {
    return tok.value !== '';
  });
  function logout(): void {
    tok.value = '';
  }

  return { token, isAuthed, setToken, logout };
});
