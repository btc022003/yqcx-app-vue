<template>
  <div class="view">
    <div class="top">
      <router-link :to="{name: 'Home'}" class="btn-back">全国数据</router-link>
      <img class="logo" src="../assets/images/logo.png" />
      <span class="tip-1 tip">新型冠状病毒肺炎</span>
      <span class="tip-2 tip">
        <strong
          style="margin: 0.2rem;background-color: #fff;color: #000; padding: 0.1rem;font-size: 28px;border-radius: 8px;"
        >{{$route.query.name}}</strong>实时疫情
      </span>
      <span class="tip-3 tip">数据来源:国家及卫健委每日信息发布</span>
    </div>
    <div class="dashboard">
      <div class="title">
        统计截止
        <span>2020-02-11 20:42:54</span> 更新于
        <span>3分钟</span>前
      </div>
      <div class="tj">
        <div class="tj-item item-confirm">
          <div class="tj-item-desc">
            <p class="tj-item-new-grow">
              较上日
              <span class="tj-item-nums-color">+2509</span>
            </p>
            <p class="tj-item-nums tj-item-nums-color">42744</p>
          </div>
          <div class="tj-item-title">全部确诊</div>
        </div>
        <div class="tj-item item-noconfirm">
          <div class="tj-item-desc">
            <p class="tj-item-new-grow">
              较上日
              <span class="tj-item-nums-color">+2509</span>
            </p>
            <p class="tj-item-nums tj-item-nums-color">42744</p>
          </div>
          <div class="tj-item-title">疑似病例</div>
        </div>
        <div class="tj-item item-ok">
          <div class="tj-item-desc">
            <p class="tj-item-new-grow">
              较上日
              <span class="tj-item-nums-color">+2509</span>
            </p>
            <p class="tj-item-nums tj-item-nums-color">42744</p>
          </div>
          <div class="tj-item-title">治愈人数</div>
        </div>
        <div class="tj-item item-dead">
          <div class="tj-item-desc">
            <p class="tj-item-new-grow">
              较上日
              <span class="tj-item-nums-color">+2509</span>
            </p>
            <p class="tj-item-nums tj-item-nums-color">42744</p>
          </div>
          <div class="tj-item-title">死亡人数</div>
        </div>
      </div>
    </div>
    <div class="main" style="margin: 0; background-color: #fff">
      <div ref="chatrs" style="width: 100%;height:340px;"></div>
    </div>
    <LineChart title="疫情趋势图" />
    <div class="qg">
      <div class="s"></div>
      <h3>{{$route.query.name}}疫情</h3>
      <p>7:00-9:00为更新高峰期，数据如有之后情谅解</p>
    </div>
    <div class="yq-list ul">
      <div class="yq-item header">
        <ul>
          <li>地区</li>
          <li>新增确诊</li>
          <li>累计确诊</li>
          <li>治愈</li>
          <li>死亡</li>
          <li>病死率</li>
        </ul>
      </div>
      <div class="yq-item">
        <ul class="province" @click="item.opened = !item.opened">
          <li>郑州</li>
          <li>2097</li>
          <li>31728</li>
          <li>900</li>
          <li>9801</li>
          <li>3.07%</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
// 疫情数据
import axios from 'axios';
import echarts from 'echarts';
import Pinyin from 'pinyin';
import bg from '../assets/images/bg.png';
// @ is an alias to /src
import YQCollapse from '../components/YQCollapse';
import LineChart from '../components/LineChart';
import { cityMap } from '../utils/china';
export default {
  name: 'YQDetail',
  components: {
    YQCollapse,
    LineChart
  },
  data() {
    return {
      option: {},
      myChart: {},
      dataList: []
    };
  },
  async mounted() {
    // this.loadMapData('/datas/map/json/china');
    // this.myChart.on('click', this.changeMapData);
    this.initMap();
  },
  methods: {
    randomValue() {
      return Math.round(Math.random() * 1000);
    },
    backQuanGuo() {
      this.loadMapData('/datas/map/json/china');
    },
    initMap() {
      const pName = this.$route.query.name;
      if (pName) {
        if (pName.indexOf('市') > -1) {
          this.loadMapData('/datas/map/json/citys/' + cityMap[pName]);
        } else {
          const cityNamePY = Pinyin(pName, {
            style: Pinyin.STYLE_NORMAL
          }).join('');
          this.loadMapData('/datas/map/json/province/' + cityNamePY);
        }
      } else {
        this.loadMapData('/datas/map/json/china');
      }
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
      // console.log(strUrl);
      this.myChart = echarts.init(this.$refs.chatrs);
      const mapData = await axios.get(strUrl);
      const yqData = await axios.get('/datas/yiqing_0212.json');
      const cityYQ = yqData.data.filter(
        y =>
          y.province_name == this.$route.query.name &&
          y.date_info == '2020-02-12'
      );
      console.log(cityYQ);
      this.dataList = cityYQ.map(item => {
        return {
          name: item.cityName + '市',
          value: item.confirmedCount
        };
      });

      echarts.registerMap(mapName, mapData.data);
      this.option = {
        tooltip: {
          triggerOn: 'click',
          formatter: function(params, ticket, callback) {
            return (
              // params.seriesName +
              params.name + '：' + params.value + '确诊'
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
            color: ['#FFEED7', '#930C0E']
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
  /* background-color: #0057fb; */
  background-image: url('../assets/images/bg.png');
  background-position: 100%;
  background-repeat: no-repeat;
  background-size: cover;
}
.top .logo {
  width: 67px;
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
.dashboard .tj .tj-item.item-confirm .tj-item-desc {
  background-color: #fdefef;
}
.dashboard .tj .tj-item.item-confirm .tj-item-desc .tj-item-nums-color {
  color: #e25b5b;
}
.dashboard .tj .tj-item.item-confirm .tj-item-title {
  background-color: #ffe0e0;
}
.dashboard .tj .tj-item.item-noconfirm .tj-item-desc {
  background-color: #fff4f0;
}
.dashboard .tj .tj-item.item-noconfirm .tj-item-desc .tj-item-nums-color {
  color: #fa9236;
}
.dashboard .tj .tj-item.item-noconfirm .tj-item-title {
  background-color: #fff7ed;
}
.dashboard .tj .tj-item.item-ok .tj-item-desc {
  background-color: #f4f9f5;
}
.dashboard .tj .tj-item.item-ok .tj-item-desc .tj-item-nums-color {
  color: #68a283;
}
.dashboard .tj .tj-item.item-ok .tj-item-title {
  background-color: #dfeee5;
}
.dashboard .tj .tj-item.item-dead .tj-item-desc {
  background-color: #fbf8fb;
}
.dashboard .tj .tj-item.item-dead .tj-item-desc .tj-item-nums-color {
  color: #6c696c;
}
.dashboard .tj .tj-item.item-dead .tj-item-title {
  background-color: #eeeeee;
}
/* #E25B5B */
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
.qg {
  position: relative;
  margin: 1rem;
}
.qg .s {
  position: absolute;
  width: 4px;
  height: 18px;
  background-color: #007aff;
}
.qg h3 {
  font-size: 14px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 20px;
  margin: 8px;
}
.qg p {
  font-size: 12px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(124, 124, 124, 1);
  line-height: 17px;
  margin: 0.2rem;
  padding: 0;
}
.btn-back {
  background: linear-gradient(
    90deg,
    rgba(250, 217, 97, 1) 0%,
    rgba(247, 107, 28, 1) 100%
  );
  border-radius: 15px;
  float: right;
  margin-top: 16px;
  margin-right: 16px;
  color: #fff;
  border: 0;
  /* font-size: 18px; */
  padding: 0.5rem 1rem;
}

.yq-list ul {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0;
  padding: 0;
  width: 100%;
}
.yq-item {
  width: 100%;
  display: flex;
  align-items: center;
  height: 30px;
  border-bottom: 0.005rem solid #9e9e9e;
}
</style>
