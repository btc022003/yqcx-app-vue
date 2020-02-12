<template>
  <div class="main">
    <div id="container"></div>
  </div>
</template>

<script>
import BaiduMap from 'BaiduMap'; // 百度地图
import BMapLib from 'BMapLib'; // 百度地图开源库 做图形运算http://lbs.baidu.com/index.php?title=jspopular3.0/openlibrary
import axios from 'axios';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      map: {},
      data: []
    };
  },
  mounted() {
    this.loadYQData();
    var map = new BaiduMap.Map('container');
    var point = new BMap.Point(116.404, 39.915);
    // 创建点坐标
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);

    var marker = new BMap.Marker(point);
    marker.disableMassClear(); // 禁止覆盖物在 map.clearOverlays 方法中被清除；可以通过enableMassClear()取消锁定
    map.addOverlay(marker);

    // 获取位置，进行定位
    var geolocation = new BMap.Geolocation();
    // 开启SDK辅助定位
    geolocation.enableSDKLocation();
    geolocation.getCurrentPosition(function(r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        var mk = new BMap.Marker(r.point);
        mk.disableMassClear();
        map.addOverlay(mk);
        map.panTo(r.point);
        // alert('您的位置：' + r.point.lng + ',' + r.point.lat);
      } else {
        // alert('failed' + this.getStatus());
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
    // var driving = new BMap.DrivingRoute(map, {
    //   renderOptions: {
    //     map: map,
    //     autoViewport: true
    //   }
    // });

    // 驾车导航
    // var start = new BMap.Point(116.310791, 40.003419);
    // var end = new BMap.Point(116.486419, 39.877282);
    // driving.search(start, end);
    this.map = map;
    // 初始化地图，设置中心点坐标和地图级别
  },
  methods: {
    showInfo(e) {
      // alert(e.point.lng + ', ' + e.point.lat);
      // 点击地图之后画查询图形
      this.map.clearOverlays();
      const mPoint = new BMap.Point(e.point.lng, e.point.lat);
      var circle = new BMap.Circle(mPoint, 1000, {
        fillColor: 'blue',
        strokeWeight: 1,
        fillOpacity: 0.3,
        strokeOpacity: 0.3
      });
      this.map.addOverlay(circle);
      console.log(this.map.getOverlays()); // 获取覆盖物
      const c = new BMap.Point(116.404, 39.915);
      console.log(BMapLib.GeoUtils.isPointInCircle(c, circle));
    },
    loadYQData() {
      axios.get('/datas/city_info.json').then(res => {
        // console.log(res.data.length);
        // return false;
        const points = [];
        res.data.forEach(info => {
          try {
            const lng = info.location.split(', ')[0] * 1;
            const lat = info.location.split(', ')[1] * 1;
            points.push(new BMap.Point(lng, lat));
          } catch (err) {
            console.log(err);
          }
        });
        var options = {
          size: BMAP_POINT_SIZE_SMALL,
          shape: BMAP_POINT_SHAPE_STAR,
          color: '#d340c3'
        };
        var pointCollection = new BMap.PointCollection(points, options);
        this.map.addOverlay(pointCollection);
      });
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
