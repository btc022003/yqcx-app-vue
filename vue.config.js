module.exports = {
  publicPath: './',
  configureWebpack: {
    externals: {
      BaiduMap: 'BMap',
      echarts: 'echarts'
    }
  }
};
