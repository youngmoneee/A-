<template>
  <div class='chat-send'>
    <textarea v-model="text" placeholder="Enter text"></textarea>
    <label class="file-input-label">
      <input ref="fileRef" type="file" style="display: none" @change="onFileChange" />
      파일 선택
    </label>
    <button @click="submit">전송</button>
  </div>
</template>
<script setup>
import { useChatStore } from '@/store/chat';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const $chat = useChatStore();
const $auth = useAuthStore();
let text = '';
let fileInput = null;

const onFileChange = async (e) => {
  fileInput = e.target.files[0];
  console.log(fileInput);
};

const submit = async () => {
  if (!text && !fileInput) return ;
  const form = new FormData();
  if (fileInput !== null) form.append('file', fileInput);
  if (text !== '') form.append('msg', text);
  console.log(form);
  try {
    const res = await axios.post('/api/chat', form, {
      headers: {
        Authorization: `Bearer ${$auth.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    text = '';
    fileInput = null;
  } catch (e) {
    console.log(e);
  }
};
</script>

<style scoped>
.chat-send {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-basis: 0;
}
textarea {
  height: 20px;
  width: 80%;
  resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.file-input-label, button {
  flex: 1;
  margin-left: 1px;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
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

button {
  background-color: #4caf50;
}
button:hover {
  background-color: #45a049;
}
</style>