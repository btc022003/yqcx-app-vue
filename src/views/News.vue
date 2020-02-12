<template>
  <div class="view">
    <NewsItem v-for="i in 5" :key="i" :hasImg="true" />
  </div>
</template>

<script>
// 千锋动态
import NewsItem from '../components/NewsItem';
// @ is an alias to /src
export default {
  name: 'News',
  components: {
    NewsItem
  }
};
</script>
