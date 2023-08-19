import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const tok = ref('');
  const token = computed(() => {
    parseToken();
    return tok.value;
  });
  async function check() {
    parseToken();
    await axios
      .get('/api/auth', {
        headers: {
          Authorization: `Bearer ${tok.value}`,
        },
      })
      .then(() => {
        parseToken();
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) tok.value = '';
      });
  }
  const isAuthed = computed(() => {
    return tok.value !== '';
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
    tok.value = cookies[process.env.VUE_APP_TOKEN_NAME] || '';
  }
  function logout(): void {
    tok.value = '';
  }

  return { token, isAuthed, logout, check };
});
