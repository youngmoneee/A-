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
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import router from '@/router';

const auth = useAuthStore();
const { token, isAuthed } = storeToRefs(auth);

const mock = ['dev1', 'dev2'];

const navbar = computed(() => {
  const items = mock;
  if (isAuthed) return items.concat(['info', 'logout']);
  return items;
});
const navigate = (item: string) => {
  if (item === 'logout') {
    auth.logout();
    router.push('/');
  }
  else if (item === 'info') router.push('/info');
  else router.push(`/device/${item}`);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  background-image: url('/src/assets/iphone.png');
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
  flex-basis: 50px;
  flex-shrink: 0;
  height: 100vh;
}
.nav-item {
  margin: 0px;
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
