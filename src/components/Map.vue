<template>
  <div class="main">
    <div id="container"></div>
  </div>
</template>

<script>
import BaiduMap from 'BaiduMap'; // 百度地图
import BMapLib from 'BMapLib'; // 百度地图开源库 做图形运算http://lbs.baidu.com/index.php?title=jspopular3.0/openlibrary
import axios from 'axios';
import CenterPotin from '../assets/images/p.png';
export default {
  name: 'HelloWorld',
  props: {
    areas: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      map: {},
      data: [],
      points: [],
      circle: {}, // 查询边界
      centerPoint: {} // 查询中心点
    };
  },
  mounted() {
    var map = new BaiduMap.Map('container');
    var point = new BMap.Point(116.404, 39.915);
    // 创建点坐标
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);

    // var marker = new BMap.Marker(point);
    // marker.disableMassClear(); // 禁止覆盖物在 map.clearOverlays 方法中被清除；可以通过enableMassClear()取消锁定
    // map.addOverlay(marker);

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
  watch: {
    areas() {
      this.loadYQData();
    }
  },
  methods: {
    showInfo(e) {
      // alert(e.point.lng + ', ' + e.point.lat);
      // 点击地图之后画查询图形
      console.log(e);
      // this.map.clearOverlays();
      const mPoint = new BMap.Point(e.point.lng, e.point.lat);
      var geoc = new BMap.Geocoder();
      geoc.getLocation(mPoint, rs => {
        console.log(rs);
        this.map.removeOverlay(this.circle);
        this.map.removeOverlay(this.centerPoint);

        var circle = new BMap.Circle(mPoint, 1000, {
          fillColor: 'blue',
          strokeWeight: 1,
          fillOpacity: 0.3,
          strokeOpacity: 0.3
        });
        var myIcon = new BMap.Icon(CenterPotin, new BMap.Size(30, 40));
        var markerCenter = new BMap.Marker(mPoint, { icon: myIcon });
        this.circle = circle;
        this.centerPoint = markerCenter;
        this.map.addOverlay(circle);
        this.map.addOverlay(markerCenter);
        // console.log(this.map.getOverlays()); // 获取覆盖物
        // const c = new BMap.Point(116.404, 39.915);
        // console.log(BMapLib.GeoUtils.isPointInCircle(c, circle));
        let result = [];
        this.data.forEach(p => {
          if (BMapLib.GeoUtils.isPointInCircle(p, circle)) {
            result.push(p);
          }
        });
        console.log(result);
        var strH = ``;
        if (result.length > 0) {
          let allCount = result.reduce((p, c) => {
            if (c.info.count > 0) {
              return p + c.info.count;
            }
            return p;
          }, 0);
          strH += `目前已有 <strong>${allCount}</strong> 起新型冠状病毒肺炎确诊病例。离你最近的在
          <strong>${result[0].info.address}</strong>`;
        }

        var sContent = `<div class="notice">
        <h3>周边疫情</h3>
        <p>你所选择的
          <strong>${rs.address}</strong>
          ${strH}
        <p style="color: #999">统计截至 ${localStorage.getItem(
          'updateTime'
        )}</p></div>`;
        var infoWindow = new BMap.InfoWindow(sContent);
        this.map.openInfoWindow(infoWindow, mPoint);
      });
    },
    loadYQData() {
      const points = [];
      this.areas.forEach(info => {
        try {
          const lng = info.longitude * 1;
          const lat = info.latitude * 1;
          const pointInfo = new BMap.Point(lng, lat);
          pointInfo.info = info;
          // points.push(new BMap.Point(lng, lat));
          points.push(pointInfo);
        } catch (err) {
          console.log(err);
        }
      });
      var options = {
        size: BMAP_POINT_SIZE_SMALL,
        shape: BMAP_POINT_SHAPE_CIRCLE,
        color: '#ff0000'
      };
      this.data = points;
      var pointCollection = new BMap.PointCollection(points, options);
      this.map.addOverlay(pointCollection);
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
