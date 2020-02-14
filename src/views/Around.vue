<template>
  <div class="view">
    <Map :areas="areas" />
  </div>
</template>
<script>
// 周边疫情
import Map from '@/components/Map.vue';
import axios from 'axios';
import { bd_encrypt } from '../utils/tools';

export default {
  name: 'Around',
  components: {
    Map
  },
  data() {
    return {
      areas: []
    };
  },
  async created() {
    let areaData = [];
    for (let i = 0; i < 5; i++) {
      areaData.push(
        axios.get(`https://assets.cbndata.org/2019-nCoV/${i}/data.json`)
      );
    }
    const res = await Promise.all(areaData);
    // console.log(res);
    let allAreaYQ = [];
    res.forEach(item => {
      item.data.data.forEach(p => {
        if (p.longitude && p.latitude) {
          let point = bd_encrypt(p.longitude, p.latitude);
          p.longitude = point[0];
          p.latitude = point[1];
          allAreaYQ.push(p);
        }
      });
    });
    // console.log(allAreaYQ);
    this.areas = allAreaYQ;
  }
};
</script>
