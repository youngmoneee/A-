import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const tok = ref('');
  const token = computed(() => {
    parseToken();
    return tok.value;
  });
  function isAuthed() {
    return tok.value !== '';
  }
  function parseCookies(): { [key: string]: string } {
    return document.cookie
      .split(';')
      .reduce((cookies: { [key: string]: string }, cookie) => {
        const [name, value] = cookie.split('=').map((c) => c.trim());
        cookies[name] = value;
        return cookies;
      }, {});
  }
  function parseToken(): void {
    const cookies = parseCookies();
    tok.value = cookies[process.env.VUE_APP_TOKEN_NAME] || '';
  }
  function logout(): void {
    tok.value = '';
  }

  return { token, isAuthed, logout, parseToken };
});
