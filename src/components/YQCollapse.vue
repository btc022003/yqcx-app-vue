<template>
  <div class="collapse">
    <div class="collapse-item header">
      <ul>
        <li class="name blue" style="text-align:left">地区</li>
        <li class="num blue">新增确诊</li>
        <li class="num">累计确诊</li>
        <li class="num">治愈</li>
        <li class="num">死亡</li>
        <!-- <li>病死率</li> -->
      </ul>
    </div>
    <div class="collapse-item body" v-for="item in provinceData" :key="item.id">
      <ul class="province" @click="item.opened = !item.opened">
        <li class="name blue">
          <img
            class="icon-arrow"
            :src="iconArrow"
            :style="item.opened ? {} : { transform: 'rotate(-90deg)' }"
          />
          {{ item.name }}
        </li>
        <li class="num blue">{{ item.today.confirm }}</li>
        <li class="num">{{ item.total.confirm }}</li>
        <li class="num">{{ item.total.heal }}</li>
        <li class="num">{{ item.total.dead }}</li>
      </ul>
      <div :style="item.opened ? {} : { display: 'none' }">
        <ul class="child" v-for="yq in item.children" :key="yq.id">
          <li class="name blue">{{ yq.name }}</li>
          <li class="num blue">{{ yq.today.confirm }}</li>
          <li class="num">{{ yq.total.confirm }}</li>
          <li class="num">{{ yq.total.heal }}</li>
          <li class="num">{{ yq.total.dead }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: {
    provinceData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      iconArrow:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAMCAYAAABr5z2BAAAAAXNSR0IArs4c6QAAAJVJREFUKBWdj9EJgCAURX0SNEPQNO3QEOI4fbRDDtBfy9RfQ1i3UkR8Zgmi6DuHe6lT62SF7cWPRYKMrKtKC6L9M38yYOU8NDtZ0l8FYMBKgMvYGsQplWAWDOYvAS7FVZ7oYLC8oLSKi37jgQAPb1XC6EkBHtkqUXRWwFWJo7MCfMRVUtGzAnz6Kkx0J8iendp67NzQAYy0O2CWf5zRAAAAAElFTkSuQmCC'
      // provinceData: []
    };
  },
  async created() {
    // const province = await axios.get('/datas/aly.json');
    // const yq = await axios.get('/datas/yiqing_0212.json');
    // if (this.areaTree.length > 0) {
    //   const china = this.areaTree[0].children;
    //   console.log(china);
    //   if (china) {
    //     this.provinceData = china.map(item => ({
    //       ...item,
    //       opened: false
    //     }));
    //     // china.children.data.forEach(item => {
    //     //   var yqData = {};
    //     //   yqData.opened = false;
    //     //   yqData.children = yq.data.filter(
    //     //     yqItem => yqItem.province_name == item.provinceShortName
    //     //   );
    //     //   yqData.id = item.id;
    //     //   yqData.provinceShortName = item.provinceShortName;
    //     //   yqData.confirmedCount = yqData.children.reduce(
    //     //     (p, c) => p + c.confirmedCount,
    //     //     0
    //     //   );
    //     //   yqData.curedCount = yqData.children.reduce((p, c) => p + c.curedCount, 0);
    //     //   yqData.deadCount = yqData.children.reduce((p, c) => p + c.deadCount, 0);
    //     //   this.provinceData.push(yqData);
    //     // });
  }
};
</script>
<style scoped>
.collapse-item ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0 1rem;
  padding: 0;
}
.collapse-item ul li {
  width: 80px;
  height: 26px;
}
.collapse-item.header {
  /* margin-left: 10px; */
}
.collapse-item.header li {
  font-size: 14px;
  text-align: center;
  width: 80px;
}
.collapse-item ul li.blue {
  color: #007aff;
}
.collapse-item ul li.name {
  /* width: 120px; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.collapse-item.body ul li.num {
  text-align: center;
}
.collapse-item .child {
  margin-left: 2rem;
}
.icon-arrow {
  width: 10px;
}
.collapse-item li {
  border-bottom: 0.005rem solid #e9e9e9;
}
</style>
