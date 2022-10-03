<template>
  <div v-touch:swipe="swipeHandler" class="is-flex-center mt-7">
    <div>
      <span
        class="is-pointer is-nav-element mr-1"
        :class="page===0 ? 'is-current-page' : ''"
        @click="page=0"
      >
        {{ $t('calculator.title') }}
      </span> 
      <span
        class="is-pointer is-nav-element ml-1"
        :class="page===1 ? 'is-current-page' : ''"
        @click="page=1"
      >
        {{ $t('devices.title') }}
      </span>
    </div>
    <transition
      :name= componentTransitionName 
      mode="out-in"
      ref="componentTransition"
    >
      <calculator :editDevice="device" @changePage="page=1" v-if="page===0" />
      <devices @home="page=0" @edit="editDevice" @changePage="page=1" v-else />
    </transition>
  </div>
</template>

<script>
import calculator from '@/components/Calculator'
import devices from '@/components/Devices'
import Vue2TouchEvents from 'vue2-touch-events'
import Vue from 'vue'

Vue.use(Vue2TouchEvents)

export default {
  name: 'Home',
  components: {
    calculator,
    devices
  },
  data () {
    return {
      page: 0,
      device: {},
      currentComponent: 'Calculator',
      componentTransitionName: 'swipe-component-left',
    }
  },
    watch: {
      page (val) {
        if (val === 0) {
          this.componentTransitionName = 'swipe-component-right'
        } else {
          this.componentTransitionName = 'swipe-component-left'
        }
      }
  },
  methods: {
    editDevice (device) {
      this.device = device
      this.page = 0
    },
    swipeHandler (direction) {
      if (
        this.page === 0 &&
        direction == 'left'
      ) { 
        this.componentTransitionName = 'swipe-component-left'
        this.page = 1
      } else if (
        this.page === 1 &&
        direction == 'right'
      ) {
        this.device = {}
        this.componentTransitionName = 'swipe-component-right'
        this.page = 0
      }
    },
  }
}
</script>

<style scoped>
  .swipe-component-left-enter-active,
   .swipe-component-left-leave-active {
    transition: transform 0.25s;
  }
  .swipe-component-left-enter {
    transform: translateX(100%);
  }
  .swipe-component-left-enter-to {
    transform: translateX(0%);
  }
  .swipe-component-left-leave {
    transform: translateX(0%);
  }
  .swipe-component-left-leave-to {
    transform: translateX(-100%);
  }

  .swipe-component-right-enter-active,
  .swipe-component-right-leave-active{
    transition: transform 0.25s;
  }
  .swipe-component-right-enter {
    transform: translateX(-100%);
  }
  .swipe-component-right-enter-to {
    transform: translateX(0%);
  } 
  .swipe-component-right-leave {
    transform: translateX(0%);
  }
  .swipe-component-right-leave-to {
    transform: translateX(100%);
  }
</style>