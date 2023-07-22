<template>
  <div class='index'>
    <SideNav />
    <LoginModal v-if='!isAuthed()' />
    <MainContainer />
  </div>
</template>

<script setup>
import SideNav from '@/components/SideBar.vue';
import LoginModal from '@/components/login/LoginModal.vue';
import MainContainer from '@/components/MainContainer.vue';
import { useAuthStore } from '@/store/auth';
import { onMounted } from 'vue';

const { isAuthed, parseToken } = useAuthStore();
onMounted(() => {
  parseToken();
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
  overflow: hidden;
}
div {
  box-sizing: border-box;
}
.index {
  display: flex;
}
</style>