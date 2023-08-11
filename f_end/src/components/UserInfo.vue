<template>
  <div class='user-info'>
    <div class='title'>Information</div>
    <div class='user-img-container'>
      <img class='user-image' :src='data.userImage' alt='profile image'/>
    </div>
    <div class='user-details'>
      <div class='user-data-row'>
        <div class='user-data-label'>Name</div>
        <div class='user-data-value'>{{ data.userName }}</div>
      </div>
      <div class='user-data-row'>
        <div class='user-data-label'>Email</div>
        <div class='user-data-value'>{{ data.userEmail }}</div>
      </div>
      <div class='user-data-row'>
        <div class='user-data-label'>Role</div>
        <div class='user-data-value'>{{ data.userRole }}</div>
      </div>
      <div class='user-device'>
        <div class='device-label'>User Device</div>
        <div class='devices'>
          <li v-for='key in data.devices' :key='key'>{{ key }}</li>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const { token } = useAuthStore();
const data = ref({});

onMounted(async () => {
  try {
    const response = await axios.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    data.value = response.data;
  } catch (e) {
    console.log(e);
  }
});
</script>

<style scoped>
.user-info {
  display: flex;
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 100%;
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.00);
  box-shadow: 0 8px 32px 0 rgba(31,38,135,0.37);
  -webkit-backdrop-filter: blur(3px);
  font-size: 14px;
}
.title {
  display: flex;
  margin: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
}
.user-img-container {
  display: flex;
  width: 6rem;
  height: 6rem;
}
.user-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}
.user-details {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}
.user-data-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding: 0.5rem 0;
}
.user-data-label {
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 5px;
  width: 60px;
}
.device-label {
  font-weight: bold;
  border-radius: 5px;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid lightgrey;
  padding: 5px;
  #margin-bottom: 5px;
}
.user-device {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.devices {
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  max-height: 2.5em;
  overflow-y: auto;
}
</style>
