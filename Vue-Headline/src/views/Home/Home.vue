<template>
    <div class="home-container">
        <van-nav-bar title="黑马头条" fixed/>

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :disabled="finished">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <ArticleInfo v-for="item in artList" :key="item.art_id" :title="item.title" :author="item.aut_name" :cmt-count="item.comm_count" :time="item.pubdate" :cover="item.cover"></ArticleInfo>
          </van-list>
        </van-pull-refresh>

    </div>
</template>

<script>
import { getArticleListAPI } from '@/api/articleAPI.js';

import ArticleInfo from '@/components/Article/ArticleInfo.vue';

export default {
  name: 'Home',
  data () {
    return {
      page: 1,
      limit: 10,
      artList: [],
      loading: true,
      finished: false,
      isLoading: false,
    };
  },
  created () {
    this.initArticleList();
  },
  methods: {
    async initArticleList () {
      const { data: res } = await getArticleListAPI(this.page, this.limit);

      this.artList = res;

      this.loading = false;
    },
    async onLoad () {
      ++this.page;

      const { data: res } = await getArticleListAPI(this.page, this.limit);

      this.artList = [...this.artList, ...res];

      this.loading = false;

      if (res.length === 0) {
        this.finished = true;
      }
    },
    async onRefresh () {
      ++this.page;

      const { data: res } = await getArticleListAPI(this.page, this.limit);

      this.artList = [...res, ...this.artList];

      this.isLoading = false;

      if (res.length === 0) {
        this.finished = true;
      }
    },
  },
  components: {
    ArticleInfo,
  },
};
</script>

<style lang="less" scoped>
.home-container {
  padding: 46px 0px 50px;

  .van-nav-bar {
    background-color: #007bff;

    /deep/ .van-nav-bar__content {
      .van-nav-bar__title {
        color: white;
      }
    }
  }
}
</style>
