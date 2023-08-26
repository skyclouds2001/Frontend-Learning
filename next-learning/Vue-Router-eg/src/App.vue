<template>
  <div class="app-container">
    <h1>App 根组件</h1>

    <a href="#">首页</a>
    <a href="#">电影</a>
    <a href="#">关于</a>
    <hr />

    <Home></Home>
    <Movie></Movie>
    <About></About>
  </div>
</template>

<script>
// 导入组件
import Home from '@/components/Home.vue'
import Movie from '@/components/Movie.vue'
import About from '@/components/About.vue'

export default {
  name: 'App',
  // 注册组件
  components: {
    Home,
    Movie,
    About
  }
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
