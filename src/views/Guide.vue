<template>
  <div class="view">
    <NewsItem v-for="i in 5" :key="i" />
  </div>
</template>

<script>
// 防控指南
import NewsItem from '../components/NewsItem';
// @ is an alias to /src
export default {
  name: 'Guide',
  components: {
    NewsItem
  }
};
</script>
