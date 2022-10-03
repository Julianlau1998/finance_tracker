<template>
  <div class="pb-6">
    <div class="mt-5 mr-3 is-justify-content-center is-flex-wrap-wrap">
        <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
            <div class="column is-3-5 mt-2 is-calc-left-column">
                {{ $t('devices.monthly') }}
            </div>
            <div class="column is-2 ml-negative-5">
                {{ monthly }}{{currency}}
            </div>
        </div>
        <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
            <div class="column is-3 mt-2 is-calc-left-column">
                {{ $t('devices.yearly') }}
            </div>
            <div class="column is-2 ml-negative-5">
                {{ yearly }}{{currency}}
            </div>
        </div>
        <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
            <div class="column is-3 mt-2 is-calc-left-column">
                {{ $t('devices.daily') }}
            </div>
            <div class="column is-2 ml-negative-5">
                {{ daily }}{{currency}}
            </div>
        </div>
    </div>
    <div class="hr mt-5" />
    <div class="mt-5 mb-6 is-justify-content-center is-flex-wrap-wrap devices">
      <miniDevice
        v-for="device in devices"
        :key="device.uuid"
        :device="device"
        @delete="openDeleteModal"
        @edit="editDevice"
        />
    </div>
    <div v-if="devices.length < 2" class="filler-1">
    </div>
    <div class="is-justify-content-center">
        <button @click="$emit('home')" ref="addButton" class="button is-devices-button is-add-button">
            {{ $t('devices.add') }}
        </button>
    </div>
    <DeleteModal
        v-if="showDeleteModal"
        :device="deviceToDelete"
        @delete="deleteDevice"
        @cancel="hideDeleteModal"
    />
  </div>
</template>

<script>
import miniDevice from '@/components/MiniDevice'
import DeleteModal from '@/components/modals/DeleteModal'

export default {
    components: {
        miniDevice,
        DeleteModal
    },
    data () {
        return {
            devices: [],
            deviceToDelete: {},
            showDeleteModal: false,
            currency: ""
        }
    },
    created () {
        let devices = JSON.parse(localStorage.getItem('devices'))
        this.devices = devices === undefined || devices === null ? [] : devices 
        setTimeout(() => {
            this.$refs.addButton.style.opacity = 1
        }, 300)

        const localCurrency = localStorage.getItem('currency')
        if (localCurrency) {
            this.currency = JSON.parse(localCurrency)
        }
    },
    beforeDestroy () {
        this.$refs.addButton.style.opacity = 0
    },
    methods: {
        openDeleteModal (device) {
            this.showDeleteModal = true
            this.deviceToDelete = device
        },
        hideDeleteModal () {
            this.showDeleteModal = false
            this.deviceToDelete = {}
        },
        deleteDevice (uuid) {
            let devices = this.devices
            devices = devices.filter(el => el.uuid !== uuid)
            localStorage.setItem('devices', JSON.stringify(devices))
            this.devices = devices
            this.showDeleteModal = false
            this.deviceToDelete = {}
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