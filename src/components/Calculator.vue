<template>
    <div class="calculator">
        <div class="is-justify-content-center">
            <div class="field pt-3 pb-5" ref="calculator">
                <div class="hr mb-5-5" />
                <div class="control mt-3">
                    <div class="columns is-mobile is-justify-content-start mt-2">
                        <div class="column is-4 is-result-columns is-calc-left-column">
                            <label for="price" class="is-size-4">
                                {{ $t('calculator.hoursInput') }}
                            </label>
                        </div>
                        <div class="column is-7 is-result-columns">
                            <input
                                id="price"
                                v-model="hours"
                                class="input is-input"
                                type="number"
                                min="0"
                                placeholder="0"
                                autocomplete="off"
                            >
                        </div>
                    </div>
                </div>
                <div class="control">
                    <div class="columns is-mobile is-justify-content-start">
                        <div class="column is-4 mt-3 is-calc-left-column">
                            <label for="shipping" class="is-size-4">
                                {{ $t('calculator.power') }}
                            </label>
                        </div>
                        <div class="column is-7">
                            <input
                                id="shipping"
                                v-model="watts"
                                class="input mt-1 is-input"
                                type="number"
                                min="0"
                                placeholder="0"
                                autocomplete="off"
                            >
                        </div>
                    </div>
                </div>
                <div class="control">
                    <div class="columns is-mobile is-justify-content-start">
                        <div class="column is-4 mt-3 is-calc-left-column">
                            <label for="shipping" class="is-size-4">
                                {{ $t('calculator.cost') }}{{ currency.length ? ` (${currency})` : '' }}:
                            </label>
                        </div>
                        <div class="column is-7">
                            <input
                                id="shipping"
                                v-model="price"
                                class="input mt-1 is-input"
                                type="number"
                                min="0"
                                placeholder="0"
                                autocomplete="off"
                            >
                        </div>
                    </div>
                </div>
                <div class="hr" />
                <div class="mt-5 ml-3">
                    <div class="columns is-mobile is-text-align-left is-justify-space-between is-result-columns">
                        <div class="column is-4 mt-2 is-calc-left-column">
                            {{ $t('calculator.month') }}
                        </div>
                        <div class="column is-3-5">
                            {{ monthly }}{{ currency }}
                        </div>
                    </div>
                    <div class="columns is-mobile is-text-align-left is-justify-space-between is-result-columns">
                        <div class="column is-4 mt-2 is-calc-left-column">
                            {{ $t('calculator.year') }}
                        </div>
                        <div class="column is-3-5">
                            {{ yearly }}{{ currency }}
                        </div>
                    </div>
                    <div class="columns is-mobile is-text-align-left is-justify-space-between is-result-columns">
                        <div class="column is-4 mt-2 is-calc-left-column">
                            {{ $t('calculator.day') }}
                        </div>
                        <div class="column is-3-5">
                            {{ daily }}{{ currency }}
                        </div>
                    </div>
                    <div class="columns is-mobile is-text-align-left is-justify-space-between is-result-columns">
                        <div class="column is-4 mt-2 is-calc-left-column">
                            {{ $t('calculator.hour') }}
                        </div>
                        <div class="column is-3-5">
                            {{ hourly }}{{ currency }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="openModal" class="button is-devices-button">
            {{ this.edit ? $t('calculator.save') : $t('calculator.add') }}
        </button>
        <addDeviceModal
            @close="closeAddModal"
            @add="saveDevice"
            v-if="showAddModal"
            :edit-title="editDevice.title"
            :edit="edit"
        />
    </div>
</template>

<script>
import { v4 as uuid } from "uuid";
import addDeviceModal from '@/components/modals/AddDeviceModal'

export default {
    components: { addDeviceModal },
    props: {
        editDevice: {
            type: Object,
            required: false,
            default: () => {}
        }
    },
    data () {
        return {
            hours: null,
            watts: null,
            price: null,
            showAddModal: false,
            edit: false,
            currency: ''
        }
    },
    created () {
        if (this.editDevice.uuid && this.editDevice.uuid.length) {
            console.log(this.editDevice)
            this.edit = true
            this.hours = this.editDevice.hours
            this.watts = this.editDevice.watts
            this.price = this.editDevice.price
        } else {
            this.edit = false
            this.hours = null
            this.watts = null
            this.price = null
        }

        //currency
        const localCurrency = localStorage.getItem('currency')
        if (localCurrency) {
            this.currency = JSON.parse(localCurrency)
        }
    },
    computed: {
        hourly () {
            const value = (this.watts * this.price) / 1000
            return Math.round(value * 10000) / 10000
        },
        daily () {
            const value = this.hourly * this.hours
            return Math.round(value * 10000) / 10000
        },
        monthly () {
            const value = this.daily * 30
            return Math.round(value * 10000) / 10000
        },
        yearly () {
            const value = this.daily * 365
            return Math.round(value * 10000) / 10000
        }
    },
    methods: {
        openModal () {
            if (
                !this.hours === null || this.hours <= 0 ||
                !this.watts === null || this.watts <= 0 ||
                !this.price === null || this.price <= 0
            ) return
            
            this.showAddModal = true
        },
        saveDevice (title) {
            const device = { hours: this.hours, watts: this.watts, price: this.price }
            let devices = JSON.parse(localStorage.getItem('devices'))
            if (devices === undefined || devices === null ) { devices = [] }
            
            device.title = title
            if (this.edit) {
                device.uuid = this.editDevice.uuid
                const index = devices.findIndex((device => device.uuid == this.editDevice.uuid));
                devices[index].title = title
                devices[index].hours = this.hours
                devices[index].watts = this.watts
                devices[index].price = this.price
            } else {
                device.uuid = uuid()
                devices.push(device)
            }

            localStorage.setItem('devices', JSON.stringify(devices))

            this.hours = null
            this.price = null
            this.watts = null
            this.$emit('changePage')
        },
        closeAddModal () {
            this.showAddModal = false
        },
        support () {
          if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toggleMessageHandler) {
            window.webkit.messageHandlers.toggleMessageHandler.postMessage({
              "message": 'Trigger reward-ad:'
            });
          }
        }
    }
}
</script>