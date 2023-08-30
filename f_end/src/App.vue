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
import MainContainer from '@/components/MainContainer.vue';
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