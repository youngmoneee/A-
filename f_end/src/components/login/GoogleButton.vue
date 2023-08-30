<template>
<div class='GoogleButton'>
  <a :href = 'request_uri'>
    <img src='@/assets/btn_google_signin_light_normal_web@2x.png' class='google-img'>
  </a>
</div>
</template>
<script setup>
const auth_uri = process.env.VUE_APP_G_AUTH_URI;
const client_id = process.env.VUE_APP_G_CLIENT_ID;
const redirect_uri = process.env.VUE_APP_G_CALLBACK;
const request_uri = `${auth_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=profile email`;
</script>

<style scoped>
img {
  -moz-window-shadow: sheet;
}
.GoogleButton {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 92px;
}
.google-img {
  display: flex;
  width: 100%;
  -moz-window-shadow: sheet;
}
</style>