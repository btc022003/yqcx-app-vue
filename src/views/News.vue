<template>
  <div class="view">
    <NewsItem v-for="(item, index) in news" 
      :kei="item.id"
      :item="{id: item.id, desc: item.qfTitle, img: item.qfImgPath, link: item.qfLink}"
      :key="index"
      :hasImg="true" />
  </div>
</template>

<script>
// 千锋动态
import { get } from '../utils/request';
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
      news: []
    };
  },
  async created() {
    try {
      const result = await get('/QfDynamicController/findAll');
      if (result && result.length > 0) {
        this.news = result;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
