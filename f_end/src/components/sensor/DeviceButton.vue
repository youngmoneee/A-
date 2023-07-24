<template>
  <button class="glass-button" @click="sendReq">{{ props.command }}</button>
</template>

<script setup lang='ts'>
import {defineProps} from 'vue';
import { useAuthStore } from '@/store/auth';
import axios from 'axios';

const props = defineProps({
  target: {
    type: String,
    required: true,
  },
  command: {
    type: String,
    required: true,
  }
});

const { token } = useAuthStore();

const sendReq = async () => {
  await axios.post(props.target, {
    command: props.command
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
}
</script>

<style scoped>
.glass-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 15px rgba(114, 33, 208, 0.2), 0 0 5px rgba(237, 30, 121, 0.4);
  transition: all 0.2s ease-in-out;
  margin-left: 10px;
}

.glass-button:hover {
  box-shadow: 0 0 15px rgba(114, 33, 208, 0.4), 0 0 5px rgba(237, 30, 121, 0.6);
  transform: scale(1.05);
}
</style>
