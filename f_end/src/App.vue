<template>
  <div class='index'>
    <SideNav class = 'side' />
    <MainContainer class = 'MainContainer' />
    <login-modal v-if='!isAuthed' class='LoginModal' />
  </div>
</template>

<script setup lang='ts'>
import SideNav from '@/components/SideBar.vue';
import LoginModal from '@/components/login/LoginModal.vue';
import MainContainer from '@/views/MainContainer.vue';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth';
import { useSocketStore } from '@/store/socket';

const { isAuthed, token } = storeToRefs(useAuthStore());
const { setSocket, closeSocket } = useSocketStore();

watch(isAuthed,newIsAuthed => {
  if (newIsAuthed) {
    setSocket(token.value);
  } else if (!newIsAuthed) {
    closeSocket();
  }
}, {immediate: true, deep: true});
</script>
<style>
body {
  margin: 0;
  display: flex;
  background-image: url('@/assets/bg.png');
  background-size: cover;
}
div {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
}
.index {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
.side {
  width: 80px;
  flex-shrink: 0;
}
.MainContainer {
  flex-grow: 1;
  overflow: hidden;
}
.LoginModal {
  z-index: 99;
  position: fixed;
}
</style>