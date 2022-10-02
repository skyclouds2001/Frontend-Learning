<template>
  <div id="app">

    <router-view></router-view>

    <van-tabbar route>
      <van-tabbar-item to="/" icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">标签</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="less">
</style>
