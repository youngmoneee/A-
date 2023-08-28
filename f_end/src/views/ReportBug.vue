<template>
  <div class='report-form'>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title:</label>
        <input id="title" v-model="title" type="text" />
      </div>
      <div>
        <label for="body">Body:</label>
        <textarea id="body" v-model="body"></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import router from '@/router';

const { token } = useAuthStore();
const title = ref('');
const body = ref('');
const handleSubmit = async () => {
  await axios.post('api/bug/report', {
    title: title.value,
    body: body.value,
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(() => router.push('/'))
    .catch();
};
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