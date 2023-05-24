import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    logToken() {
      console.log(this.token);
    },
    isAuthed(): boolean {
      return this.token !== '';
    },
    parseToken() {
      const token = document.cookie
        .split(';')
        .map((kv) => kv.split('='))
        .map(([k, v]) => [k, v])
        .find(([k]) => k === 'DEV_TOKEN');
      this.token = token ? token[1] : '';
    },
  },
});
