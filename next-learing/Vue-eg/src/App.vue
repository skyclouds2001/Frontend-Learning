<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div>
      <Test title="left" @pe="fun" ref="l"></Test>
      <Test title="right" @pe="fun" ref="r"></Test>
    </div>
    <div>
      <Left></Left>
      <Right></Right>
    </div>
    <div>
      <button type="button" @click="re">show</button>
    </div>
    <div>
      <component :is="com"></component>
    </div>
    <div>
      <Co>
        <template #n1="scope">
          {{ scope.msg }}
        </template>
        <template #n2="{ use }">
          {{ use }}
        </template>
      </Co>
      <Co></Co>
    </div>
    <div v-color="color">color</div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Test from '@/components/test.vue';
import Left from '@/components/left.vue';
import Right from '@/components/right.vue';
import Co from '@/components/co.vue';

export default {
  name: 'App',
  created() {
    this.com = 'Left';
  },
  data() {
    return {
      color: 'red',
    };
  },
  components: {
    // HelloWorld
    Test,
    Left,
    Right,
    Co,
  },
  methods: {
    fun(v) {
      console.log(v);
    },
    re() {
      console.log(this);
    },
  },
  directives: {
    color: {
      bind(el, binding) {
        el.style.color = binding.value;
        console.log('bind');
      },
      update(el, binding) {
        el.style.color = binding.value;
        console.log('update');
      },
    },
    /**
     * 若binding与update相同时可简写为
     * color(el, binding) {},
     */
  },
};
</script>

<style lang="less">
div#app {
  font-family: Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
