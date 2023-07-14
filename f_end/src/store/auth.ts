import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    isAuthed(): boolean {
      return this.token !== '';
    },
    parseCookies(): { [key: string]: string } {
      return document.cookie
        .split(';')
        .reduce((cookies: { [key: string]: string }, cookie) => {
          const [name, value] = cookie.split('=').map((c) => c.trim());
          cookies[name] = value;
          return cookies;
        }, {});
    },
    parseToken(): void {
      const cookies = this.parseCookies();
      this.token = cookies[process.env.VUE_APP_TOKEN_NAME] || '';
    },
  },
});
