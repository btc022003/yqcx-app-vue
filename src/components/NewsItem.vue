<template>
  <div class="news-item">
    <img :src="item.img" v-if="hasImg" alt />
    <h3 class="title">{{item.title}}</h3>
    <p class="desc">{{item.desc}}</p>
    <p class="time">{{item.time}}</p>
  </div>
</template>
<script>
import newsImg from '../assets/images/n-item-demo.jpg';
export default {
  props: {
    hasImg: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: {}
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
