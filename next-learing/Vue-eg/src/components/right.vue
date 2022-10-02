<template>
  <div id="right">
    <span>right</span>
    <button type="button">RIGHT</button>
  </div>
</template>

<script>
import bus from './eventBus.js';
export default {
  name: 'Right',
  data() {
    return {
      msg: 'r-t',
    };
  },
  created() {
    bus.$on('share', (v) => {
      this.msg = v;
    });
  },
};
</script>

<style lang="less">
#right {
  font-size: 25px;
}
</style>
