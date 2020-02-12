<template>
  <div class="news-item">
    <img :src="newsImg" v-if="hasImg" alt="" />
    <h3 class="title">防范新兴冠状病毒9个要点</h3>
    <p class="desc">
      数据以波浪图的形式进行呈现，包括全国疫情新
      增趋势，累计确诊现有疑似趋势，全国累…
    </p>
    <p class="time">2019-02-03</p>
  </div>
</template>
<script>
import newsImg from '../assets/images/n-item-demo.jpg';
export default {
  props: {
    hasImg: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      newsImg
    };
  }
};
</script>
<style scoped>
.news-item img {
  width: 100%;
  min-height: 185px;
}
.news-item h3 {
  margin: 0;
  padding: 0;
}
.news-item {
  padding: 1rem;
  background-color: #fff;
  margin: 0.8rem;
  border-radius: 10px;
  /* height: 132px; */
}
.news-item .title {
  font-size: 16px;
  color: #000;
}
.news-item .desc {
  font-size: 14px;
  color: #4a4a4a;
}
.news-item .time {
  font-size: 12px;
  color: #4a4a4a;
}
</style>
