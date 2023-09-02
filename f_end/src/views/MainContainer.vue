<template>
  <div class='main-container'>
    <DisplayDiv class='DisplayDiv' />
    <ChatDiv class='ChatDiv' />
  </div>
</template>

<script setup>
import ChatDiv from '@/components/chat/ChatDiv.vue';
import DisplayDiv from '@/components/DisplayDiv.vue';
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 100%;
}
.DisplayDiv {
  display: flex;
  justify-content: center;
  padding: 10px;
  width: 100%;
  height: 60%;
}
.ChatDiv {
  display: flex;
  width: 100%;
  height: 40%;
  flex-direction: column;
  align-items: stretch;
  border-top: 1px solid gray;
}
</style>