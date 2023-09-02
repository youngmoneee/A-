<template>
  <div class='chat-send'>
    <textarea v-model="text" placeholder="Enter text" @keyup.enter.prevent='keySubmit' @keydown.shift.enter.prevent='addNewLine' />
    <div class='button-container'>
      <label class="file-input-label">
        <input type="file" style="display: none" @change="onFileChange" />
        파일
      </label>
      <label class="submit-label">
        <button style='display: none' @click="submit" />
        전송
      </label>
    </div>
  </div>
</template>
<script setup>
import { inject, ref } from 'vue';

const $axios = inject('$axios');
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
  await $axios.post('/api/chat', form, {
    headers: {
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
  width: 100%;
  height: 50px;
  align-items: stretch;
}
textarea {
  flex-grow: 1;
  flex-shrink: 1;
  resize: none;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  background: rgba(255, 255, 255, 0.3);
}
.button-container {
  display: flex;
  width: 100px;
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
  display: flex;
  justify-content: center;
  align-items: center;
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