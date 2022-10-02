<template>
  <div class="text-box">
    <h1>{{ text }}</h1>
    <button type="button" @click="handleCheck">按钮</button>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data: function () {
    return {
      text: this.title,
    };
  },
  methods: {
    handleCheck() {
      this.text = 'T' + this.text + 'T';
      this.$emit('pe', this.text);
    },
  },
  watch: {},
  computed: {},
  filters: {},
  props: {
    title: String,
    init: {
      default: '',
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="less" scoped>
.text-box {
  background-color: white;
  font-size: 30px;
  font-weight: bold;
}

.text-box > button {
  font-size: 20px;
  font-weight: bold;
  width: 5em;
  height: 2.5em;
  list-style: 2.5em;
  text-align: center;
  border-radius: 50%;
  border: none;
  outline: none;
  box-shadow: 5px 5px 15px 0px #ccc, -5px -5px 15px 0px #fff;
}
</style>
