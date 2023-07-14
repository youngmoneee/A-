<template>
  <div class='chat-send'>
    <textarea v-model="text" placeholder="Enter text" @keyup.enter.prevent='keySubmit' @keydown.shift.enter.prevent='addNewLine' />
    <label class="file-input-label">
      <input type="file" style="display: none" @change="onFileChange" />
      파일 선택
    </label>
    <label class="submit-label">
      <button style='display: none' @click="submit" />
      전송
    </label>
  </div>
</template>
<script setup>
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import { ref } from 'vue';

const $auth = useAuthStore();
let text = ref('');
let fileRef = ref(null);

const onFileChange = (e) => {
  fileRef.value = e.target.files[0];
};

const submit = async () => {
  if (!text.value.trim() && !fileRef.value) return ;
  const form = new FormData();
  if (text.value.trim()) form.append('msg', text.value);
  if (fileRef.value) form.append('file', fileRef.value);
  text.value = '';
  fileRef.value = null;
  await axios.post('/api/chat', form, {
    headers: {
      Authorization: `Bearer ${$auth.token}`,
      'Content-Type': 'multipart/form-data',
    },
  }).then(() => {
    text.value = '';
    fileRef.value = null;
  }).catch((e) => console.log(e));
};

const keySubmit = async (e) => {
  if (!e.shiftKey) await submit();
};

const addNewLine = () => {
  text.value += '\n';
}

</script>

<style scoped>
.chat-send {
  flex-basis: 30px;
  display: flex;
  align-items: stretch;
}
textarea {
  flex-grow: 8;
  resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.file-input-label, .submit-label {
  flex-grow: 1;
  flex-basis: 0;
  margin-left: 1px;
  padding: 16px 8px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  color: white;
}

.file-input-label {
  background-color: #0046ff;
}
.file-input-label:hover {
  background-color: #0020ec;
}

.submit-label {
  background-color: #4caf50;
}
.submit-label:hover {
  background-color: #45a049;
}
</style>