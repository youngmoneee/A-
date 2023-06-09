<template>
  <div class='chat-send'>
    <textarea v-model="text" placeholder="Enter text"></textarea>
    <label class="file-input-label">
      <input ref="fileInput" type="file" style="display: none" @change="onFileChange" />
      파일 선택
    </label>
    <button @click="submit">전송</button>
  </div>
</template>
<script setup>
import { useChatStore } from '@/store/chat';

const $chat = useChatStore();
let text = '';

const onFileChange = (e) => {
  // 파일 선택 로직 추가
};

const submit = () => {
  // 전송 로직 추가
};
</script>

<style scoped>
.chat-send {
  width: 100%;
  display: flex;
  flex-direction: row;
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