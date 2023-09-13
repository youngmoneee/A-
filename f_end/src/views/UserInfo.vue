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
          <li v-for='key in data.devices' :key='key'>
            {{ key }}
            <button class="remove-btn" @click="remove(key)">x</button>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { inject, onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import router from '@/router';
import { storeToRefs } from 'pinia';
import { AxiosInstance } from 'axios';
import { IUser } from '@/interface/IUser';

const { isAuthed } = storeToRefs(useAuthStore());
const data = ref<IUser>({} as IUser);
const $axios = inject('$axios') as AxiosInstance;

onMounted(async () => {
  if (!isAuthed.value) await router.push('/');
  await $axios.get('/api/user').then(response => data.value = response.data);
});
const remove = async (device: string) => {
  await $axios.delete(`api/device/${device}`).then(() => {
    data.value.devices = data.value.devices.filter((i: any) => i !== device)
    router.push({ path: 'info', query: { reload: Date.now() }});
  });
};
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
.remove-btn {
  background-color: rgba(0,0,0,0);
  color: gray;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
