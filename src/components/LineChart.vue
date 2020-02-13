<template>
  <div class="line-chart">
    <div id="chart" ref="chatrs" style="width: 100%;height:212px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts';
export default {
  props: {
    title: {
      type: String,
      defailt: '全国疫情数据'
    },
    chartLegendData: {
      type: Array,
      defailt: []
    },
    chartXData: {
      type: Array,
      defailt: []
    },
    chartSeries: {
      type: Array,
      defailt: []
    }
  },
  data() {
    return {
      chart: {}
    };
  },
  watch: {
    chartLegendData() {
      console.log('....');
      this.myChart = echarts.init(this.$refs.chatrs);
      const option = {
        title: {
          text: this.title
        },
        legend: {
          type: 'plain',
          show: true,
          data: this.chartLegendData //['确诊', '痊愈']
        },
        xAxis: {
          type: 'category',
          data: this.chartXData //['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: this.chartSeries
        // [
        //   {
        //     data: [820, 932, 901, 934, 1290, 1330, 1320],
        //     type: 'line',
        //     name: '确诊'
        //   },
        //   {
        //     data: [120, 232, 701, 924, 290, 130, 420],
        //     type: 'line',
        //     name: '痊愈'
        //   }
        // ]
      };
      this.myChart.setOption(option);
    }
  },
  mounted() {}
};
</script>
<style scoped>
.line-chart {
  background-color: #fff;
}
</style>
