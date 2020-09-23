<template>
  <div class='snake'>
    <div class="snake__field">
      <div class="snake__box">
        <div class="snake__box-row" v-for="(i, rowIdx) in keysY" :key="i">
          <div class="snake__box-row-element" 
            v-for="(i, elIdx) in keysX" 
            :key="i"
            :class="{
              'active': checkDot(elIdx, rowIdx),
              'food': checkForFood(elIdx, rowIdx)
            }"
          > 
          </div>
        </div>
      </div>
    </div>

    <Controls />
  </div>
</template>

<script>
  import store from '@/store'
  import Controls from '@/components/SnakeControls.vue'

  export default {
    components: {Controls},
    data: function () {
      return {
        keysX: [...Array(store.state.boardSizeX).keys()], 
        keysY: [...Array(store.state.boardSizeY).keys()],
        controls: {'top' : [0, 1], 'left': [-1, 0], 'right': [1, 0], 'bottom': [0, -1]}
      }
    },
    methods: {
      checkDot: function (x, y) {
        return store.getters.checkDot(x, y)
      },
      moveOnce: function () {
        store.commit('moveOnce')
        store.commit('checkForLimits')
        if (this.checkForFail()) {
          alert(`Game over! \nScore: ${store.state.dots.length - 2}`)
          store.commit('reset')
        }
      },
      timer () {
        setInterval(() => {
          this.moveOnce()
          if (store.state.food.x === null) {this.generateFood()}
        }, store.state.frameRate)
      },
      getRandomInRange (max, min = 0) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      generateFood () {
        const x = this.getRandomInRange(this.keysX[this.keysX.length - 1])
        const y = this.getRandomInRange(this.keysY[this.keysY.length - 1])
        store.commit('setFood', {'x': x, 'y': y})
      },
      checkForFood: function (x,y) {
        return store.getters.isDotFood(x, y)
      },
      checkForFail () {
        const getSnake = () => [...store.state.dots]
        let snake = getSnake()
        const head = snake.pop()
        const fail = snake.some(dot => {
          return dot.x === head.x && dot.y === head.y
        })

        return fail
      }
    },
    mounted () {
      this.timer()
      this.generateFood()
      
    }
  }
</script>

<style lang='scss'>
  .snake {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    padding-top: 15px;

    &__field {
      width: 100%;
      position: relative;

      &:before{
        content: "";
        display: block;
        padding-top: 100%;
      }
    }

    &__box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #0b090a;

      display: grid;
      grid-template-rows: repeat(21, 1fr);
      grid-row-gap: 3px;
      border: 3px solid #0b090a;
    }

    &__box-row {
      // background-color: red;
      display: grid;
      grid-template-columns: repeat(21, 1fr);
      grid-column-gap: 3px;
    }

    &__box-row-element {
      background-color: #161a1d;
      font-size: 5px;
      border-radius: 2px;
      position: relative;
      overflow: hidden;

      &.active::after, &.food::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
      }

      &.active::after {
        background-color: rgba(255, 99, 71, .5) !important;
      }

      &.food::after {
        background-color: rgba(160, 255, 71, 0.5);
      }
    }

    &__controls {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 3px;
      padding: 0 3px 3px;
      background-color: #0b090a;
    }

    &__control {
      position: relative;
      background-color:  #161a1d;
      border-radius: 2px;

      &::before {
        content: "";
        display: block;
        padding-top: 100%;
      }
    }

    &__control-inner {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: grid;
      place-items: center;

      &::before {
        content: '';
        width: 50%;
        height: 50%;
        background-image: url('../assets/next.svg');
        background-position: center;
        background-repeat: no-repeat;
        background-size: 50%;
        color: rgb(255, 99, 71);
      }
      
      &_left {
        transform: rotate(180deg);
      }

      &_top {
        transform: rotate(-90deg);
      }

      &_bottom {
        transform: rotate(90deg);
      }
    }
  }

  
</style>