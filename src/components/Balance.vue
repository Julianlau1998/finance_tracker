<template>
  <div class="mt-5 mr-3 is-justify-content-center is-flex-wrap-wrap">
    <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
      <div class="column is-3 mt-2 is-calc-left-column">
        {{ $t('income.title') }}:
      </div>
      <div class="column is-2 ml-negative-5">
        {{ income }}{{currency}}
      </div>
    </div>
    <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
      <div class="column is-3 mt-2 is-calc-left-column">
        {{ $t('expenses.title') }}:
      </div>
      <div class="column is-2 ml-negative-5">
        {{ expenses }}{{currency}}
      </div>
    </div>
    <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
      <div class="column is-3 mt-2 is-calc-left-column">
        {{ $t('balance') }}:
      </div>
      <div class="column is-2 ml-negative-5">
        {{ balance }}{{currency}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Balance",
  data () {
    return {
      currency: '€',
      income: 0,
      expenses: 0,
      balance: 0,
      allExpenses: [],
      allIncomes: []
    }
  },
  watch: {
    reloadBalance (val) {
      if (val) this.loadBalances()
    }
  },
  created () {
    this.loadBalances()
    const localCurrency = localStorage.getItem('currency')
    if (localCurrency) {
      this.currency = JSON.parse(localCurrency)
    }
  },
  methods: {
    loadBalances () {
      let loadedExpenses = JSON.parse(localStorage.getItem('expenses'))
      this.allExpenses = loadedExpenses === undefined || loadedExpenses === null ? [] : loadedExpenses

      let loadedIncomes = JSON.parse(localStorage.getItem('incomes'))
      this.allIncomes  = loadedIncomes === undefined || loadedIncomes === null ? [] : loadedIncomes

      let totalIncome = 0
      this.allIncomes.forEach((income) => {
        totalIncome += parseFloat(income.amount)
      })

      let totalExpense = 0
      this.allExpenses.forEach((expense) => {
        totalExpense += parseFloat(expense.amount)
      })
      this.expenses = totalExpense
      this.income = totalIncome
      this.balance = this.income - this.expenses
    }
  }
}
</script>