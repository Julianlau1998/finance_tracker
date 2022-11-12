<template>
    <div class="calculator">
        <div class="is-justify-content-center">
            <div class="field pt-3 pb-5" ref="calculator">
                <div class="hr mb-5-5" />
                <div class="control mt-3">
                    <div class="columns is-mobile is-justify-content-center mt-2">
                        <div class="column is-6 is-result-columns is-calc-left-column">
                            <label for="price" class="is-size-4">
                                {{ $t('calculator.income') }}
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
                <button class="button">
                  {{ $t('calculator.addIncome') }}
                </button>

                <div class="hr" />

                <div class="control mt-6">
                  <div class="columns is-mobile is-justify-content-center mt-2">
                    <div class="column is-6 is-result-columns is-calc-left-column">
                      <label for="price" class="is-size-4">
                        {{ $t('calculator.expense') }}
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
                <button class="button">
                  {{ $t('calculator.addExpense') }}
                </button>
                <div class="hr" />
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
import addDeviceModal from '@/components/modals/AddModal'

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