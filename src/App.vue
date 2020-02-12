<template>
  <div id="app">
    <router-view class="main-container" />
    <div class="nav">
      <ul>
        <li><router-link :to="{ name: 'Home' }">疫情数据</router-link></li>
        <li><router-link :to="{ name: 'Around' }">周边疫情</router-link></li>
        <li><router-link :to="{ name: 'Guide' }">防控指南</router-link></li>
        <li><router-link :to="{ name: 'News' }">千锋动态</router-link></li>
      </ul>
    </div>
  </div>
</template>

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
  height: 45px;
}
.nav ul {
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  justify-content: space-around;
}
</style>
