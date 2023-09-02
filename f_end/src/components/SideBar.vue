<template>
  <div class="nav-bar">
    <div
      v-for="(item) in navbar"
      :key="item"
      class="nav-item"
      @click="navigate(item)"
    >
      <div
        class="nav-content"
      > {{ item }} </div
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { computed, inject, reactive, watch } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { AxiosInstance } from 'axios';
import { storeToRefs } from 'pinia';

const { logout } = useAuthStore();
const { isAuthed } = storeToRefs(useAuthStore());
let data = reactive([] as Array<string>);
const route = useRoute();
const $axios = inject('$axios') as AxiosInstance;

watch(route, async () => {
// 페이지가 이동될 때마다 실행되는 로직
  if (!isAuthed.value) return ;
  await $axios.get('/api/mqtt/device').then(response => {
    data.length = 0;
    response.data.forEach((value: any) => data.push(value));
    data.push('register', 'info', 'logout');
  }).catch(() => router.push('/'));
}, { immediate: true });

const navbar = computed(() => {
  if (!isAuthed.value) return [];
  return data;
});
const navigate = (item: string) => {
  if (item === 'logout') {
    logout();
    router.push('/');
  }
  else if (item === 'info') router.push('/info');
  else if (item === 'register') router.push('/register');
  else router.push(`/device/${item}`);
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  gap: 1px;
}
.nav-item {
  margin: 0;
  padding: 5px;
  width: 100%;
  height: 100%;
  font-weight: bold;
  flex-basis: 0;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.00);
  box-shadow: 4px 4px 60px 0 rgba(31, 38, 135, 0.37);
  overflow-y: auto;
}
.nav-content {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
  word-break: break-word;
}
</style>
