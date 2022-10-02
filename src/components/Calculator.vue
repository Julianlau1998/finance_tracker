<template>
    <div class="calculator">
        <div class="is-justify-content-center">
            <div class="field pt-3 pb-5" ref="calculator">
                <div class="hr mb-5-5" />
                <div class="control mt-3">
                    <div class="columns is-mobile is-justify-content-start is-align--center mt-2">
                        <div class="column is-4 is-result-columns is-calc-left-column">
                            <label for="price" class="is-size-4">
                                Hours per day:
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
                    <div class="columns is-mobile is-justify-content-start is-align-items-center">
                        <div class="column is-4 mt-3 is-calc-left-column">
                            <label for="shipping" class="is-size-4">
                                Power (Watts):
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
                    <div class="columns is-mobile is-justify-content-start is-align-items-center">
                        <div class="column is-4 mt-3 is-calc-left-column">
                            <label for="shipping" class="is-size-4">
                                Price per KWh:
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
                    <div class="columns is-mobile is-justify-content-start is-align-items-center is-result-columns">
                        <div class="column is-3 mt-2 is-calc-left-column">
                            Cost per Month:
                        </div>
                        <div class="column is-7">
                            {{ monthly }}
                        </div>
                    </div>
                    <div class="columns is-mobile is-justify-content-start is-align-items-center is-result-columns">
                        <div class="column is-3 mt-2 is-calc-left-column">
                            Cost per Year:
                        </div>
                        <div class="column is-7">
                            {{ yearly }}
                        </div>
                    </div>
                    <div class="columns is-mobile is-justify-content-start is-align-items-center is-result-columns">
                        <div class="column is-3 mt-2 is-calc-left-column">
                            Cost per Day:
                        </div>
                        <div class="column is-7">
                            {{ daily }}
                        </div>
                    </div>
                    <div class="columns is-mobile is-justify-content-start is-align-items-center is-result-columns">
                        <div class="column is-3 mt-2 is-calc-left-column">
                            Cost per Hour:
                        </div>
                        <div class="column is-7">
                            {{ hourly }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="openModal" class="button is-devices-button">
            {{ this.edit ? 'Save' : 'Add Device to list' }}
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
import { uuid } from 'vue-uuid'
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
            edit: false
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
                device.uuid = uuid.v4()
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
        }
    }
}
</script>