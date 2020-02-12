<template>
  <div class="collapse">
    <div class="collapse-item header">
      <ul>
        <li>地区</li>
        <li>新增确诊</li>
        <li>累计确诊</li>
        <li>治愈</li>
        <li>死亡</li>
        <li>病死率</li>
      </ul>
    </div>
    <div class="collapse-item" v-for="item in data" :key="item.id">
      <ul class="province" @click="item.opened = !item.opened">
        <li>
          <img
            :src="iconArrow"
            :style="item.opened ? {} : { transform: 'rotate(-90deg)' }"
          />{{ item.provinceShortName }}
        </li>
        <li>2097</li>
        <li>31728</li>
        <li>900</li>
        <li>9801</li>
        <li>3.07%</li>
      </ul>
      <ul class="child" :style="item.opened ? {} : { display: 'none' }">
        <li>武汉</li>
        <li>2097</li>
        <li>31728</li>
        <li>900</li>
        <li>9801</li>
        <li>3.07%</li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      iconArrow:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAAAXNSR0IArs4c6QAAAJVJREFUKBWdj9EJgCAURX0SNEPQNO3QEOI4fbRDDtBfy9RfQ1i3UkR8Zgmi6DuHe6lT62SF7cWPRYKMrKtKC6L9M38yYOU8NDtZ0l8FYMBKgMvYGsQplWAWDOYvAS7FVZ7oYLC8oLSKi37jgQAPb1XC6EkBHtkqUXRWwFWJo7MCfMRVUtGzAnz6Kkx0J8iendp67NzQAYy0O2CWf5zRAAAAAElFTkSuQmCC',
      data: []
    };
  },
  created() {
    axios.get('/datas/aly.json').then(res => {
      this.data = res.data.map(item => ({ ...item, opened: false }));
    });
  }
};
</script>
<style scoped>
.collapse-item ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.collapse-item .child {
  margin-left: 1rem;
}
</style>
