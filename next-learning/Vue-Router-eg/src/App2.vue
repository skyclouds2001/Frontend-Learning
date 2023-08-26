<template>
  <div class="app-container">
    <h1>App2 组件</h1>
    <p>
      <router-link to="/home">首页</router-link>
      <router-link to="/movie">电影</router-link>
      <router-link to="/about">关于</router-link>
    </p>
    <p>
      <router-link to="/movie/1">电影1</router-link>
      <router-link to="/movie/2">电影2</router-link>
      <router-link to="/movie/3">电影3</router-link>
    </p>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less" scoped>
.app-container {
  background-color: #efefef;
  overflow: hidden;
  margin: 10px;
  padding: 15px;
  > a {
    margin-right: 10px;
  }
}
</style>
