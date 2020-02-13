<template>
  <div id="app">
    <router-view class="main-container" />
    <div class="nav">
      <ul>
        <li>
          <router-link :to="{ name: 'Home' }">
            <img
              :src="
                currentIndex == 0
                  ? require('./assets/images/yq-s.png')
                  : require('./assets/images/yq.png')
              "
            />
            <span>疫情数据</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Around' }">
            <img
              :src="
                currentIndex == 1
                  ? require('./assets/images/around-s.png')
                  : require('./assets/images/around.png')
              "
            />
            <span>周边疫情</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Guide' }">
            <img
              :src="
                currentIndex == 2
                  ? require('./assets/images/guide-s.png')
                  : require('./assets/images/guide.png')
              "
            />
            <span>防疫指南</span>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'News' }">
            <img
              :src="
                currentIndex == 3
                  ? require('./assets/images/news-s.png')
                  : require('./assets/images/news.png')
              "
            />
            <span>千锋动态</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0
    };
  },
  watch: {
    $route() {
      this.currentIndex = this.$route.meta.navIndex;
    }
  }
};
</script>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.main-container {
  flex: 1;
  overflow: auto;
}
.nav {
  height: 60px;
}
.nav img {
  width: 22px;
}
.nav .router-link-exact-active {
  color: #007aff;
}
.nav a {
  padding-top: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #979797;
}
.nav a span {
  margin-top: 5px;
  font-size: 10px;
}
.nav ul {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  justify-content: space-around;
}
</style>
