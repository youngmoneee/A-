<template>
  <div v-if='!$auth.isAuthenticated' class='bg-black'>
    <div class="bg-white">
      <h1> L o g i n </h1>
      <KakaoButton class='button'/>
      <GoogleButton class='button'/>
      <p>{{ $auth.token }}</p>
      <div
        class='close'
        @click='closeModal'
      >
        close
      </div>
    </div>
  </div>
</template>

<script setup>
import KakaoButton from '@/components/login/KakaoButton.vue';
import GoogleButton from '@/components/login/GoogleButton.vue';
import { useAuthStore } from '@/store/auth';

const $auth = useAuthStore();
const closeModal = () => {
  $auth.isAuthenticated = true;
  $auth.logToken();
};
</script>

<style scoped>
.bg-black {
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  padding: 20px;
}
.bg-white {
  width: 100%;
  background: rgba(255,255,255,0.9);
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.button {
  margin: 10px;
}
.close {
  width: 50px;
  height: 30px;
  background: dimgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: antiquewhite;
}
</style>