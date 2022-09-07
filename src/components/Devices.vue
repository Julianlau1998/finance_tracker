<template>
  <div class="pb-6">
    <div class="mt-5 mr-3 is-justify-content-center is-flex-wrap-wrap">
        <div class="columns is-mobile is-justify-content-start is-align-items-center is-result-columns">
            <div class="column is-3 mt-2 is-calc-left-column">
                Monthly Cost:
            </div>
            <div class="column is-7 ml-negative-5">
                {{ monthly }}
            </div>
        </div>
        <div class="columns is-mobile is-justify-content-start is-align-items-center is-result-columns">
            <div class="column is-3 mt-2 is-calc-left-column">
                Yearly Cost:
            </div>
            <div class="column is-7 ml-negative-5">
                {{ yearly }}
            </div>
        </div>
        <div class="columns is-mobile is-justify-content-start is-align-items-center is-result-columns">
            <div class="column is-3 mt-2 is-calc-left-column">
                Daily Cost:
            </div>
            <div class="column is-7 ml-negative-5">
                {{ daily }}
            </div>
        </div>
    </div>
    <div class="hr mt-5" />
    <div class="mt-5 mb-6 is-justify-content-center is-flex-wrap-wrap devices">
      <miniDevice
        v-for="device in devices"
        :key="device.uuid"
        :device="device"
        @delete="deleteDevice"
        @edit="editDevice"
        />
    </div>
    <div v-if="devices.length < 2" class="filler-1">
    </div>
    <div class="is-justify-content-center">
        <button @click="$emit('home')" ref="addButton" class="button is-devices-button is-add-button">
            Add Device
        </button>
    </div>
  </div>
</template>

<script>
import miniDevice from '@/components/MiniDevice'
export default {
    components: {
        miniDevice
    },
    data () {
        return {
            devices: [],
        }
    },
    created () {
        let devices = JSON.parse(localStorage.getItem('devices'))
        this.devices = devices === undefined || devices === null ? [] : devices 
        setTimeout(() => {
            this.$refs.addButton.style.opacity = 1
        }, 300)
    },
    beforeDestroy () {
        this.$refs.addButton.style.opacity = 0
    },
    methods: {
        deleteDevice (uuid) {
            let devices = this.devices
            devices = devices.filter(el => el.uuid !== uuid)
            localStorage.setItem('devices', JSON.stringify(devices))
            this.devices = devices
        },
        editDevice (uuid) {
            let devices = this.devices
            devices = devices.filter(el => el.uuid === uuid)
            this.$emit('edit', devices[0])
        }
    },
    computed: {
        hourly () {
            let total = 0
            this.devices.forEach(device => {
                const value = (device.watts * device.price) / 1000      
                total += value  
            });
            
            return total
        },
        daily () {
            let total = 0
            this.devices.forEach(device => {
                let value = (device.watts * device.price) / 1000     
                value = value * device.hours 
                total += value  
            });
            
            return Math.round(total * 10000) / 10000
        },
        monthly () {
            const value = this.daily * 30
            return Math.round(value * 10000) / 10000
        },
        yearly () {
            const value = this.daily * 365
            return Math.round(value * 10000) / 10000
        }
    }
}
</script>