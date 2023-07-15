import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const token = ref('');
  const isAuthed = computed(() => {
    return token.value !== '';
  });
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
    token.value = cookies[process.env.VUE_APP_TOKEN_NAME] || '';
  }
  function logout(): void {
    token.value = '';
  }
  return { token, isAuthed, parseToken, logout };
});
