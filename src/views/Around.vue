<template>
  <div class="view">
    <Map msg="Welcome to Your Vue.js App" />
  </div>
</template>
<script>
// 周边疫情
import Map from '@/components/Map.vue';

export default {
  name: 'Around',
  components: {
    Map
  }
};
</script>
