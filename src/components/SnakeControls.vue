<template>
  <div class="snake__controls">
      <div 
        class="snake__control" 
        v-for="moveKey in Object.keys(controls)" 
        :key="moveKey"
        @click="changeDirection(controls[moveKey])"
      >
        <div class="snake__control-inner" :class="'snake__control-inner_' + moveKey">
        </div>
      </div>
    </div>
</template>

<script>
  import store from '@/store'

  export default {
    data: function () {
      return {
        controls: {'top' : [0, 1], 'left': [-1, 0], 'right': [1, 0], 'bottom': [0, -1]}
      }
    },
    methods: {
      changeDirection (coords) {
        store.commit('changeDirection', {'x': coords[0], 'y': coords[1]})
      }
    }
  }
</script>

<style scoped>

</style>