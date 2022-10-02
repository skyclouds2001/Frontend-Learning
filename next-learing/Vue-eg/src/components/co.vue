<template>
  <div>
    <p>co</p>
    <slot name="n1" msg="ms0">test1</slot>
    <slot name="n2" use="unknown">test2</slot>
  </div>
</template>
<script>
export default {
  name: 'Co',
};
</script>
<style lang="less" scoped>
div {
  border: 1px solid #000;
  background-color: rgba(0, 102, 255, 0.5);
  width: 100px;
  height: 100px;
  display: inline-block;
}
</style>
