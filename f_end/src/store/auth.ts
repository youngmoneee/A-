import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    isAuthenticated: false,
  }),
  actions: {
    logToken() {
      console.log(this.token);
    },
    async login(provider: string) {
      try {
        const res = await axios.get(`/api/oauth/${provider}`);
        const token = res.headers.getAuthorization;
        console.log(token);
      } catch (e) {
        console.error(e);
      }
    },
  },
});
