<template>
  <div>
    <SideNav />
    <LoginModal />
  </div>
</template>

<script setup>
import SideNav from '@/components/SideBar.vue';
import LoginModal from '@/components/login/LoginModal.vue';
import { useAuthStore } from '@/store/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();
onMounted(() => {
  const token = document.cookie.split(';')
    .map((kv) => kv.split('='))
      .map(([k, v]) => [k.trim(), v.trim()])
    .find(([k]) => k === 'DEV_TOKEN');
  authStore.token = token ? token[1] : null;
  authStore.logToken();
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0px;
}
div {
  box-sizing: border-box;
}
</style>