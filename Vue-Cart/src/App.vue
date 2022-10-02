<template>

  <div class="app-container">
    <Header></Header>
    <Goods v-for="item in list" :key="item.id" :id="item.id" :title="item.goods_name" :pic="item.goods_img" :price="item.goods_price" :state="item.goods_state"
    :count="item.goods_count" @state-change="getNewState">
      <Counter :num="item.goods_count" @num-change="getNewNum(item, $event)"></Counter>
    </Goods>
    <Footer :isFull="fullState" :amount="amount" :all="total" @full-change="getFullState"></Footer>
  </div>

</template>


<script>

import axios from 'axios';

import Header from '@/components/Header/Header.vue';
import Goods from '@/components/Goods/Goods.vue';
import Footer from '@/components/Footer/Footer.vue';
import Counter from '@/components/Counter/Counter.vue';

import bus from '@/components/eventBus.js';

export default {
  created() {
    this.initCartList();
    bus.$on('share', (e) => {
      this.list.some(v => {
        if(v.id === e.id) {
          v.goods_count = e.value;
          return true;
        }
      });
    });
  },
  data() {
    return {
      list: [],
    };
  },
  computed: {
    fullState() {
      return this.list.every(v => v.goods_state);
    },
    amount() {
      return this.list.filter(item => item.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count, 0);
    },
    total() {
      return this.list.filter(item => item.goods_state).reduce((t, v) => (t += v.goods_count), 0);
    },
  },
  methods: {
    async initCartList() {
      const {data: res} = await axios.get('https://www.escook.cn/api/cart');
      if(res.status === 200)
        this.list = res.list;
    },
    getNewState(e) {
      this.list.some(v => {
        if(v.id === e.id) {
          v.goods_state = e.value;
          return true;
        }
        return false;
      });
    },
    getFullState(e) {
      this.list.forEach(v => v.goods_state = e);
    },
    getNewNum(item, num) {
      // const {id} = item.id;
      item.goods_count + num >= 0 && (item.goods_count += num);
    }
  },
  components: {
    Header,
    Goods,
    Footer,
    Counter,
  },
};

</script>


<style lang="less" scoped>

.app-container {
  padding-top: 45px;
  padding-bottom: 50px;
}

</style>
