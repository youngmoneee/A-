<template>
  <div class='deviceName'>
    <h2>기기 등록</h2>
    <input v-model="deviceName" placeholder="Enter device name" />
    <button @click="sendDeviceName">Register</button>
  </div>
</template>

<script setup lang='ts'>
import { inject, ref } from 'vue';
import router from '@/router';
import { AxiosInstance } from 'axios';

const deviceName = ref('');
const axios = inject('$axios') as AxiosInstance;

const sendDeviceName = async () => {
  if (deviceName.value.trim() === '') return;
  await axios.post('/api/device', { device: deviceName.value.trim() })
    .then(() => router.push('/info'))
    .catch(e => console.error(e));
}
</script>

<style scoped>
.deviceName {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%; /* 부모 요소의 넓이를 100%로 설정 */
  gap: 1rem; /* 요소들 사이의 간격 설정 */
}

.deviceName input, .deviceName button {
  width: 80%; /* input 및 button의 넓이를 80%로 설정 */
  padding: 0.5rem; /* 내부 패딩 추가 */
  box-sizing: border-box; /* 패딩과 테두리가 넓이에 포함되도록 설정 */
  border-radius: 5px; /* 둥근 모서리 추가 */
}

.deviceName button {
  cursor: pointer; /* 버튼 위에 마우스를 올리면 포인터로 변경 */
  background-color: #4CAF50; /* 버튼 배경색 설정 */
  color: white; /* 버튼 텍스트 색상 설정 */
  border: none; /* 테두리 제거 */
  transition: background-color 0.3s; /* 배경색 변화 애니메이션 효과 */
}

.deviceName button:hover {
  background-color: #45a049; /* 버튼 위에 마우스를 올렸을 때의 배경색 */
}
</style>
