<template>
  <div class="main">
    <div id="container"></div>
  </div>
</template>

<script>
import BaiduMap from 'BaiduMap';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    var map = new BaiduMap.Map('container');
    var point = new BMap.Point(116.404, 39.915);
    // 创建点坐标
    map.centerAndZoom(point, 15);

    // 获取位置，进行定位
    var geolocation = new BMap.Geolocation();
    // 开启SDK辅助定位
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        map.addOverlay(mk);
        map.panTo(r.point);
        alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      } else {
        alert('failed' + this.getStatus());
      }
    });

    map.setMapStyleV2({
      styleId: 'ebdfdb23d98eb2e3dab3efc08e2f5e50'
    });

    // 关键词搜索
    //   var local = new BMap.LocalSearch(map, {
    //     renderOptions: { map: map },
    //   });
    //   local.search('景点');

    // 点击事件
    map.addEventListener('click', this.showInfo);
    var driving = new BMap.DrivingRoute(map, {
      renderOptions: {
        map: map,
        autoViewport: true
      }
    });

    // 驾车导航
    var start = new BMap.Point(116.310791, 40.003419);
    var end = new BMap.Point(116.486419, 39.877282);
    driving.search(start, end);
    // 初始化地图，设置中心点坐标和地图级别
  },
  methods: {
    showInfo(e) {
      alert(e.point.lng + ', ' + e.point.lat);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.main,
#container {
  height: 100%;
}
</style>
