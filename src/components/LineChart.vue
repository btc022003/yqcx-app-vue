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
    }
  },
  data() {
    return {
      chart: {}
    };
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.chatrs);
    const option = {
      title: {
        text: this.title
      },
      legend: {
        type: 'plain',
        show: true,
        data: ['确诊', '痊愈']
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          name: '确诊'
        },
        {
          data: [120, 232, 701, 924, 290, 130, 420],
          type: 'line',
          name: '痊愈'
        }
      ]
      // grid: {
      //   backgroundColor: '#fff',
      //   show: true
      // }
    };
    this.myChart.setOption(option);
  }
};
</script>
<style scoped>
.line-chart {
  background-color: #fff;
}
</style>
