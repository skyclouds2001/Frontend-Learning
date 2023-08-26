<template>
  <div class="home-container">
    <h3>Home 组件</h3>
    <button type="button" @click="push">jump push</button>
    <button type="button" @click="replace">jump replace</button>
    <button type="button" @click="go">jump go</button>
  </div>
  </template>

<script>
export default {
  name: 'Home',
  methods: {
    push() {},
    replace() {},
    go() {},
  },
}
</script>

<style lang="less" scoped>
.home-container {
  min-height: 200px;
  background-color: pink;
  padding: 15px;
}
</style>
