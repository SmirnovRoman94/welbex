<template>
  <div id="app">
    <table-page></table-page>
  </div>
</template>

<script>


import TablePage from './views/TablePage.vue'
export default {
  name: 'App',
  components: {
    TablePage
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
