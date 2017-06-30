<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style scoped>
  @font-face {
    font-family: 'SourceCodePro';
    src: url('/static/font/scp.otf');
  }

  html {
    min-height: 100vh;
  }

  * {
    -webkit-transition: all .3s;
    transition: all .3s;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
</style>
