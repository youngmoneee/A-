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
import { computed, reactive, watch } from 'vue';
import router from '@/router';
import axios from 'axios';
import { useRoute } from 'vue-router';

const { token, isAuthed, logout } = useAuthStore();
let data = reactive([] as Array<string>);
const route = useRoute();

watch(route, async () => {
// 페이지가 이동될 때마다 실행되는 로직
  await axios.get('/api/mqtt/device', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  }).then(async response => {
    data.length = 0;
    response.data.forEach((value: any) => data.push(value));
    data.push('register', 'info', 'logout');
  }).catch(() => router.push('/'));
}, { deep: true });

const navbar = computed(() => {
  if (!isAuthed) return [];
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
  background-image: url('/src/assets/iphone.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  height: 100vh;
}
.nav-item {
  margin: 0;
  padding: 10px;
  width: 100%;
  font-weight: bold;
  /**
   * flex-basis를 통해 기본 크기를 0으로 설정, flex-grow=1 옵션을 통해 나머지 공간을 균등하게 분배 -->
   */
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.00);
  box-shadow: 4px 4px 60px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
}
.nav-content {
  margin: 0;
}
</style>
