<template>
  <div class="movie-container">
    <h3>Movie 组件</h3>
    <button @click="showThis">显示</button>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  methods: {
    showThis() {
      console.log(this.$route.params.id);
    }
  },
};
</script>

<style lang="less" scoped>
.movie-container {
  min-height: 200px;
  background-color: lightsalmon;
  padding: 15px;
}
</style>
