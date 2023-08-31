<template>
  <div class='index'>
    <SideNav class='SideNav' />
    <MainContainer class='MainContainer' />
    <LoginModal class='LoginModal' />
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  margin: 0;
  overflow: hidden;
}
div {
  box-sizing: border-box;
}
.index {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100vh;
}
.SideNav {
  width: 80px;
}
.MainContainer {
  flex-grow: 1;
}
.LoginModal {
  z-index: 99;
}
</style>