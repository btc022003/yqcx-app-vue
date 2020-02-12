module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      BaiduMap: 'BMap',
      BMapLib: 'BMapLib',
      echarts: 'echarts'
    }
  }
};
