<template>
  <div>
    <SideNav />
    <LoginModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SideNav from '@/components/SideBar.vue';
import LoginModal from '@/components/login/login.modal.vue';


export default defineComponent({
  components: {
    LoginModal,
    SideNav,
  },
  data() {
    return {
      authed: false,
    };
  },
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