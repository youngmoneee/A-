<template>
  <div>
    로그인 진행 중 ...
  </div>
</template>

<script setup lang='ts'>
import { inject, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const route = useRoute();
const { setToken } = useAuthStore();
const $axios = inject('$axios');
onMounted(async () => {
  const code = route.query.code;
  if (!code) await router.push('/');

  await axios.post('/auth/google', {
    code: code
  }).then(response => {
    setToken(response.data, $axios);
  }).catch(e => console.error('error : ', e));
  await router.push('/');
})
</script>