<template>
  <div class='KakaoButton'>
    <a :href='request_uri'>
      <img src='@/assets/kakao_login_large_narrow.png' class='kakao-img'>
    </a>
  </div>
</template>
<script setup lang='ts'>
const auth_uri = process.env.VUE_APP_K_AUTH_URI;
const client_id = process.env.VUE_APP_K_CLIENT_ID;
const redirect_uri = process.env.VUE_APP_K_CALLBACK;
const request_uri = `${auth_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
</script>
<style scoped>
img {
  -moz-window-shadow: sheet;
}
.KakaoButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 92px;
}
.kakao-img {
  display: flex;
  width: 100%;
}
</style>