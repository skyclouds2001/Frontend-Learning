<template>
  <div id="left">
    <span>left</span>
    <button type="button" @click="sendmsg">LEFT</button>
  </div>
</template>

<script>
import bus from './eventBus.js';
export default {
  name: 'Left',
  data() {
    return {
      msg: 'l-t',
    };
  },
  methods: {
    sendmsg() {
      bus.$emit('share', this.msg);
    },
  },
};
</script>

<style lang="less">
#left {
  font-size: 25px;
}
</style>
