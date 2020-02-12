<template>
  <div class="view">
    <div class="top">
      <img class="logo" src="../assets/images/logo.png" />
      <span class="tip-1 tip">新型冠状病毒肺炎</span>
      <span class="tip-2 tip">疫情实时追踪</span>
      <span class="tip-3 tip">数据来源:国家及卫健委每日信息发布</span>
    </div>
    <div class="dashboard">
      <div class="title">
        统计截止<span>2020-02-11 20:42:54</span> 更新于<span>3分钟</span>前
      </div>
      <div class="tj">
        <div class="tj-item" v-for="i in 4" :key="i">
          <div class="tj-item-desc">
            <p class="tj-item-new-grow">较上日<span>+2509</span></p>
            <p class="tj-item-nums">42744</p>
          </div>
          <div class="tj-item-title">
            疑似病例
          </div>
        </div>
      </div>
    </div>
    <button @click="backQuanGuo">全国</button>
    <div ref="chatrs" style="width: 100%;height:340px;"></div>
    <YQCollapse />
  </div>
</template>

<script>
// 疫情数据
import axios from 'axios';
import echarts from 'echarts';
import Pinyin from 'pinyin';
// @ is an alias to /src
import YQCollapse from '../components/YQCollapse';
import { cityMap } from '../utils/china';
export default {
  name: 'Home',
  components: {
    YQCollapse
  },
  data() {
    return {
      option: {},
      myChart: {},
      dataList: []
    };
  },
  async mounted() {
    this.loadMapData('/datas/map/json/china');
    this.myChart.on('click', this.changeMapData);
  },
  methods: {
    randomValue() {
      return Math.round(Math.random() * 1000);
    },
    backQuanGuo() {
      this.loadMapData('/datas/map/json/china');
    },
    changeMapData(params) {
      console.log('....');
      // https://github.com/hotoo/pinyin
      // console.log(params);
      // if (params.name.indexOf('市') > -1) {
      //   this.loadMapData('/datas/map/json/citys/' + cityMap[params.name]);
      // } else {
      //   const cityNamePY = Pinyin(params.name, {
      //     style: Pinyin.STYLE_NORMAL
      //   }).join('');
      //   this.loadMapData('/datas/map/json/province/' + cityNamePY);
      // }
    },
    async loadMapData(mapName) {
      var strUrl = mapName + '.json';
      console.log(strUrl);
      this.myChart = echarts.init(this.$refs.chatrs);
      const mapData = await axios.get(strUrl);
      const yqData = await axios.get('/datas/aly.json');
      this.dataList = yqData.data.map(item => {
        return {
          name: item.provinceShortName,
          value: item.confirmedCount
        };
      });

      echarts.registerMap(mapName, mapData.data);
      this.option = {
        tooltip: {
          triggerOn: 'click',
          formatter: function(params, ticket, callback) {
            return (
              params.seriesName +
              '<br />' +
              params.name +
              '：' +
              params.value +
              '<a style="pointer-events: all;color: #fff;">详情>></a>'
            );
          }
        },
        visualMap: {
          type: 'piecewise',
          min: 0,
          max: 1500,
          left: 'left',
          top: 'bottom',
          // text: ['高', '低'],
          pieces: [
            { min: 1, max: 9 }, // 不指定 max，表示 max 为无限大（Infinity）。
            { min: 10, max: 99 },
            { min: 100, max: 499 },
            { min: 500, max: 999 },
            { min: 1000, max: 10000 },
            { min: 10000 }
          ],
          inRange: {
            color: ['#EAEBEF', '#9C090D']
          },
          show: true
        },
        geo: {
          map: mapName,
          roam: false,
          zoom: 1.23,
          label: {
            normal: {
              show: true,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            }
          },
          itemStyle: {
            borderColor: 'rgba(0, 0, 0, 0.2)'
          },
          emphasis: {
            areaColor: '#F3B329',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        series: [
          {
            name: '信息量',
            type: 'map',
            geoIndex: 0,
            data: this.dataList
          }
        ]
      };
      this.myChart.setOption(this.option);
    }
  }
};
</script>

<style scoped>
.top {
  width: 100%;
  height: 165px;
  background-color: #0057fb;
}
.top .logo {
  width: 89px;
  /* height: 18px; */
  margin-left: 18px;
  margin-top: 18px;
}
.top .tip {
  display: block;
  color: #fff;
  margin-left: 18px;
  margin-top: 10px;
}
.top .tip-1 {
  font-size: 18px;
}
.top .tip-2 {
  font-size: 28px;
}
.top .tip-3 {
  font-size: 12px;
}
.dashboard {
  height: 134px;
}
.dashboard .title {
  font-size: 16px;
  color: grey;
  margin: 0.5rem 0.2rem;
}
.dashboard .title span {
  color: #000;
}
.dashboard .tj {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.dashboard .tj .tj-item {
  width: 22%;
}
.dashboard .tj .tj-item p {
  margin: 0;
  text-align: center;
  /* font-weight: bold; */
}
.dashboard .tj .tj-item .tj-item-desc {
  background-color: #ebd5e9e1;
  padding: 1rem 0.2rem;
}
/* font-size: 14px; */
.dashboard .tj .tj-item .tj-item-desc .tj-item-new-grow {
  font-size: 12px;
}
.tj-item-new-grow span {
  color: red;
}
.dashboard .tj .tj-item .tj-item-desc .tj-item-nums {
  font-size: 18px;
  margin-top: 0.5rem;
}
.dashboard .tj .tj-item .tj-item-title {
  font-size: 16px;
  background-color: #d3afd0e1;
  text-align: center;
  padding: 0.5rem 0.1rem;
}
</style>
