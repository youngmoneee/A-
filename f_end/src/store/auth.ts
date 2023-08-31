import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const tok = ref('');
  function setToken(jwt: string, $axios: any) {
    tok.value = jwt;
    $axios.defaults.headers.common['Authorization'] = `Bearer ${tok.value}`;
  }
  const token = computed(() => tok.value);
  const isAuthed = computed(() => tok.value !== '');
  function logout(): void {
    tok.value = '';
  }

  return { token, isAuthed, setToken, logout };
});
