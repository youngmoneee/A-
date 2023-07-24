<template>
  <div class='KakaoButton'>
    <a href = '/auth/kakao'>
      <img src='@/assets/kakao_login_large_narrow.png' class='kakao-img'>
    </a>
  </div>
</template>
<script setup>
</script>
<style scoped>
img {
  -moz-window-shadow: sheet;
}
</style>

<style scoped>
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