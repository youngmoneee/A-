<template>
<div class='GoogleButton'>
  <a href = '/auth/google'>
    <img src='@/assets/btn_google_signin_light_normal_web@2x.png' class='google-img'>
  </a>
</div>
</template>
<script setup>
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