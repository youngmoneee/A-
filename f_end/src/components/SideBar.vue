<template>
  <div class="nav-bar">
    <div
      v-for="(item, idx) in navbar.length"
      :key="item"
      class="nav-item"
      :style="{ backgroundColor: colour[idx % colour.length] }"
    >
      <div class="nav-content">{{ navbar[idx] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SideNav',
  data() {
    return {
      navbar: ['PosA', 'PosB', 'PosC', 'PosD', 'PosE'],
      colour: ['red', 'blue', 'yellow'],
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav-bar {
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0px;
  left: 0px;
  width: 50px;
  height: 100vh;
}
.nav-item {
  margin: 0px;
  padding: 10px;
  /**
   * flex-basis를 통해 기본 크기를 0으로 설정, flex-grow=1 옵션을 통해 나머지 공간을 균등하게 분배 -->
   */
  flex-basis: 0;
  flex-grow: 1;
  display: flex;
  align-items: center;
}
.nav-content {
  margin: 0;
}
</style>
