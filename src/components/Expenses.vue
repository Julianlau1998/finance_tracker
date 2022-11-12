<template>
  <div class="pb-6">
    <div class="hr mt-5" />
    <div v-if="!expenses.length" class="px-4">
      <h4>
        {{ $t('expenses.welcomeTitle') }}
        <br>
        {{ $t('expenses.welcome') }}
      </h4>
    </div>
    <div class="mt-5 mb-6 is-justify-content-center is-flex-wrap-wrap devices">
      <miniDevice
        v-for="expense in expenses"
        :key="expense.uuid"
        :device="expense"
        :type="'expenses'"
        @delete="openDeleteModal"
        @edit="editExpense"
        />
    </div>
    <div v-if="expenses.length < 2" class="filler-1">
    </div>
    <div class="is-justify-content-center">
        <button @click="showAddModal = true" ref="addButton" class="button is-devices-button is-add-button">
            +
        </button>
    </div>
    <DeleteModal
        v-if="showDeleteModal"
        :device="deviceToDelete"
        @delete="deleteDevice"
        @cancel="hideDeleteModal"
    />
    <addExpenseModal
        @close="closeAddModal"
        @add="saveExpense"
        v-if="showAddModal"
        :type="'expenses'"
        :edit-element="deviceToEdit"
        :edit="edit"
    />
  </div>
</template>

<script>
import miniDevice from '@/components/MiniDevice'
import addExpenseModal from '@/components/modals/AddModal'
import DeleteModal from '@/components/modals/DeleteModal'
import {v4 as uuid} from "uuid";

export default {
    components: {
        miniDevice,
        DeleteModal,
        addExpenseModal
    },
    data () {
        return {
            expenses: [],
            deviceToDelete: {},
            showDeleteModal: false,
            currency: "",
            showAddModal: false,
            edit: false,
            deviceToEdit: {}
        }
    },
    created () {
        let expenses = JSON.parse(localStorage.getItem('expenses'))
        this.expenses = expenses === undefined || expenses === null ? [] : expenses
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
        openDeleteModal (expense) {
            this.showDeleteModal = true
            this.deviceToDelete = expense
        },
        hideDeleteModal () {
            this.showDeleteModal = false
            this.deviceToDelete = {}
        },
        deleteDevice (uuid) {
            let expenses = this.expenses
            expenses = expenses.filter(el => el.uuid !== uuid)
            localStorage.setItem('expenses', JSON.stringify(expenses))
            this.expenses = expenses
            this.showDeleteModal = false
            this.deviceToDelete = {}
            this.$emit('reloadBalance')
        },
        editExpense (uuid) {
            let expenses = this.expenses
            expenses = expenses.filter(el => el.uuid === uuid)
            this.deviceToEdit = expenses[0]
            this.edit = true
            this.showAddModal = true
        },
        closeAddModal () {
          this.showAddModal = false
          this.edit = false
        },
        saveExpense (added) {
          const expense = { hours: this.hours, watts: this.watts, price: this.price }
          let expenses = JSON.parse(localStorage.getItem('expenses'))
          if (expenses === undefined || expenses === null ) { expenses = [] }

          if (this.edit) {
            const index = expenses.findIndex((expense => expense.uuid === added.uuid))
            expenses[index].title = added.title
            expenses[index].amount = added.amount
          } else {
            expense.uuid = uuid()
            expense.title = added.title
            expense.amount = added.amount
            expense.uuid = uuid()
            expenses.push(expense)
          }

          localStorage.setItem('expenses', JSON.stringify(expenses))
          this.expenses = expenses
          this.showAddModal = false
          this.edit = false
          this.$emit('reloadBalance')
        }
    },
    computed: {
        hourly () {
            let total = 0
            this.expenses.forEach(expense => {
                const value = (expense.watts * expense.price) / 1000
                total += value  
            });
            
            return total
        },
        daily () {
            let total = 0
            this.expenses.forEach(expense => {
                let value = (expense.watts * expense.price) / 1000
                value = value * expense.hours
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