<template>
  <div>
    <SideNav />
    <LoginModal v-if='!$auth.isAuthed()' />
  </div>
</template>

<script setup>
import SideNav from '@/components/SideBar.vue';
import LoginModal from '@/components/login/LoginModal.vue';
import { useAuthStore } from '@/store/auth';
import { onMounted } from 'vue';

const $auth = useAuthStore();
onMounted(() => {
  //  TODO : 인덱스 페이지 접속 시, 토큰 값 파싱하나 최적화 필요
  $auth.parseToken();
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