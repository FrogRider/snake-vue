import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dots: [{'x': 10, 'y': 10}, {'x': 10, 'y': 10}], 
    boardSizeX: 21,
    boardSizeY: 21,
    xDirection: 0,
    yDirection: -1,
    length: 1,
    food: {'x': null, 'y': null},
    frameRate: 400,
    failed: false
  },
  mutations: {
    reset (state) {
      state.dots = [{'x': 10, 'y': 10}, {'x': 10, 'y': 10}]
      state.xDirection = 0
      state.yDirection = -1
    },
    moveOnce (state) {
      if(state.dots.length && !state.failed) {
        const head = this.getters.getHead
        state.dots.push({'x': head.x + state.xDirection, 'y': head.y - state.yDirection})
        if(head.x !== state.food.x || head.y !== state.food.y) {
          state.dots.splice(0,1)
        }
        if(head.x === state.food.x && head.y ===state.food.y) {
          state.food = {'x': null, 'y': null}
        }
        
      }
    },
    say (state) {
      state
      console.log('moved')
    },
    changeDirection (state, coords) {
      if (state.xDirection + coords.x === 0 || state.yDirection + coords.y === 0) {
        if(state.xDirection !== coords.x || state.yDirection !== coords.y) {
          state.dots.reverse()
        }
      }

      state.xDirection = coords.x
      state.yDirection = coords.y
    },
    checkForLimits (state) {
      state.dots.forEach(dot => {
        Object.keys(dot).forEach(key => {
          if (dot[key] === -1) dot[key] = 20
          if (dot[key] > 20) dot[key] = 0
        })
      })
    }, 
    setFood (state, coords) {
      state.food.x = coords.x
      state.food.y = coords.y
    }
  },
  getters: {
    checkDot: state => (x, y) => {
      return state.dots.some(el => el.x === x && el.y === y)
    },
    isDotFood: state => (x,y) => {
      return state.food.x === x && state.food.y === y
    },
    getHead: state => {
      return state.dots[state.dots.length - 1]
    }
  }
})
