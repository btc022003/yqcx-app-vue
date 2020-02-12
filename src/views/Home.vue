<template>
  <div class="view">
    <button @click="backQuanGuo">全国</button>
    <div ref="chatrs" style="width: 100%;height:400px;"></div>
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
      // https://github.com/hotoo/pinyin
      // console.log(params);
      if (params.name.indexOf('市') > -1) {
        this.loadMapData('/datas/map/json/citys/' + cityMap[params.name]);
      } else {
        const cityNamePY = Pinyin(params.name, {
          style: Pinyin.STYLE_NORMAL
        }).join('');
        this.loadMapData('/datas/map/json/province/' + cityNamePY);
      }
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
          formatter: function(params, ticket, callback) {
            return (
              params.seriesName + '<br />' + params.name + '：' + params.value
            );
          }
        },
        visualMap: {
          min: 0,
          max: 1500,
          left: 'left',
          top: 'bottom',
          text: ['高', '低'],
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
