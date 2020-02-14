<template>
  <div class="view">
    <NewsItem v-for="(item, index) in news" :item="item" :key="index" :hasImg="true" />
  </div>
</template>

<script>
// 千锋动态
import NewsItem from '../components/NewsItem';
import { news } from '../yq_data/news';
// @ is an alias to /src
export default {
  name: 'News',
  components: {
    NewsItem
  },
  data() {
    return {
      news
    };
  }
};
</script>
