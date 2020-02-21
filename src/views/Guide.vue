<template>
  <div class="view">
    <!-- <NewsItem v-for="i in 5" :key="i" /> -->
    <!-- <img src="../assets/images/bdyd.png" style="width: 100%;" alt /> -->
    <img
      v-for="item in list"
      :key="item.id"
      :src="item.epidemicImgPath"
      :alt="item.epidemicImgName"
      style="width: 100%;"
    />
  </div>
</template>

<script>
// 防控指南
import NewsItem from '../components/NewsItem';
import { get } from '../utils/request';
// @ is an alias to /src
export default {
  name: 'Guide',
  components: {
    NewsItem
  },
  data() {
    return {
      list: []
    };
  },
  async created() {
    try {
      const result = await get('/EpidemicImgController/findAll');
      if (result && result.length > 0) {
        this.list = result;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
