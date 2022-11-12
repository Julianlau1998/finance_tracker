<template>
  <div class="pb-6">
    <div class="hr mt-5" />
    <div v-if="!incomes.length" class="px-4">
      <h4>
        {{ $t('income.welcomeTitle') }}
        <br>
        {{ $t('income.welcome') }}
      </h4>
    </div>
    <div class="mt-5 mb-6 is-justify-content-center is-flex-wrap-wrap devices">
      <miniDevice
        v-for="device in incomes"
        :key="device.uuid"
        :device="device"
        :type="'income'"
        @delete="openDeleteModal"
        @edit="editIncome"
        />
    </div>
    <div v-if="incomes.length < 2" class="filler-1">
    </div>
    <div class="is-justify-content-center">
        <button @click="showAddModal = true" ref="addButton" class="button is-devices-button is-add-button">
            +
        </button>
    </div>
    <DeleteModal
        v-if="showDeleteModal"
        :device="deviceToDelete"
        @delete="deleteIncome"
        @cancel="hideDeleteModal"
    />
    <addExpenseModal
        @close="closeAddModal"
        @add="saveIncome"
        v-if="showAddModal"
        :type="'income'"
        :edit-element="deviceToEdit"
        :edit="edit"
    />
  </div>
</template>

<script>
import miniDevice from '@/components/MiniDevice'
import DeleteModal from '@/components/modals/DeleteModal'
import addExpenseModal from '@/components/modals/AddModal'
import {v4 as uuid} from "uuid";

export default {
    components: {
        miniDevice,
        DeleteModal,
        addExpenseModal
    },
    data () {
        return {
            incomes: [],
            deviceToDelete: {},
            showDeleteModal: false,
            currency: "",
            showAddModal: false,
            edit: false,
            deviceToEdit: {}
        }
    },
    created () {
        let incomes = JSON.parse(localStorage.getItem('incomes'))
        this.incomes = incomes === undefined || incomes === null ? [] : incomes
        setTimeout(() => {
            this.$refs.addButton.style.opacity = 1
        }, 300)

        const localCurrency = localStorage.getItem('currency')
        if (localCurrency) {
            this.currency = JSON.parse(localCurrency)
        }
    },
    mounted () {
      this.$refs.addButton.style.opacity = 0
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
        deleteIncome (uuid) {
            let incomes = this.incomes
            incomes = incomes.filter(el => el.uuid !== uuid)
            localStorage.setItem('incomes', JSON.stringify(incomes))
            this.incomes = incomes
            this.showDeleteModal = false
            this.deviceToDelete = {}
            this.$emit('reloadBalance')
        },
        editIncome (uuid) {
            let incomes = this.incomes
            incomes = incomes.filter(el => el.uuid === uuid)
            this.deviceToEdit = incomes[0]
            this.edit = true
            this.showAddModal = true
        },
      closeAddModal () {
        this.showAddModal = false
        this.edit = false
        this.deviceToEdit = {}
      },
      saveIncome (added) {
        const income = { hours: this.hours, watts: this.watts, price: this.price }
        let incomes = JSON.parse(localStorage.getItem('incomes'))
        if (incomes === undefined || incomes === null ) { incomes = [] }

        if (this.edit) {
          const index = incomes.findIndex((income => income.uuid === added.uuid))
          incomes[index].title = added.title
          incomes[index].amount = added.amount
        } else {
          income.title = added.title
          income.amount = added.amount
          income.uuid = uuid()
          incomes.push(income)
        }

        localStorage.setItem('incomes', JSON.stringify(incomes))
        this.incomes = incomes
        this.showAddModal = false
        this.edit = false
        this.deviceToEdit = {}
        this.$emit('reloadBalance')
      }
    },
    computed: {
        /*hourly () {
            let total = 0
            this.incomes.forEach(device => {
                const value = (device.watts * device.price) / 1000      
                total += value  
            });
            
            return total
        },
        daily () {
            let total = 0
            this.incomes.forEach(income => {
                let value = (income.watts * income.price) / 1000
                value = value * income.hours
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
        }*/
    }
}
</script>