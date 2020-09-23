<template>
  <div id="app">
    <Snake />
  </div>
</template>

<script>
  import Snake from '@/components/Snake'

  export default {
    components: {Snake}
    
  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700;800&display=swap');

  html, body {
    font-family: 'Nunito', sans-serif;
  }
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  #app {
    max-width: 1200px;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;

    // display: grid;
    // place-items: center;
    
  }

</style>
