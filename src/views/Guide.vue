<template>
  <div class="view">
    <h1>防控指南</h1>
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
