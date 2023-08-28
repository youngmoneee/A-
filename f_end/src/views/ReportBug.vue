<template>
  <div class = 'container full'>
    <h2>Beta 0.1V</h2>
    서비스 이용(利用) 중 겪은 불편(不便)을 제보(提報)해주시오.
    <div class='report-form full'>
      <form class='full flex-form' @submit.prevent="handleSubmit">
        <input id="title" v-model="title" type="text" placeholder='제목'/>
        <textarea id="body" v-model="body" placeholder='내용'></textarea>
        <div class='right'>
          <button type="submit" class='glass-button'>등록</button>
        </div>
      </form>
    </div>
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
  if (title.value === '') return ;
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
h2 {
  display: inline;
}
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.report-form {
  padding: 5px;
}
.flex-form {
  display: flex;
  flex-direction: column;
  height: 100%;
}

#title, #body {
  width: 100%;
  resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 5px;
  background-color: rgba(255, 255, 255, 0.3);
}
#body {
  flex-grow: 1;
  overflow-y: auto;
}

.glass-button {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 20px;
  border-radius: 15px;
  color: mediumpurple;
  font-weight: bold;
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
.right {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
}
.full {
  width: 100%;
  height: 100%;
}
</style>