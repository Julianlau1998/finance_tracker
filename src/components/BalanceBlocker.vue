<template>
  <div class="mt-5 mr-3 is-justify-content-center is-flex-wrap-wrap">
    <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
      <div class="column is-3 mt-2 is-calc-left-column">
        {{ $t('income.title') }}:
      </div>
      <div class="column is-2 ml-negative-5">
        {{currency}}
      </div>
    </div>
    <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
      <div class="column is-3 mt-2 is-calc-left-column">
        {{ $t('expenses.title') }}:
      </div>
      <div class="column is-2 ml-negative-5">
        {{currency}}
      </div>
    </div>
    <div class="columns mx-4 is-mobile is-justify-content-start is-result-columns is-text-align-left">
      <div class="column is-3 mt-2 is-calc-left-column">
        {{ $t('balance') }}:
      </div>
      <div class="column is-2 ml-negative-5">
        {{currency}}
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
    }
  },
  created () {
    const localCurrency = localStorage.getItem('currency')
    if (localCurrency) {
      this.currency = JSON.parse(localCurrency)
    }
  }
}
</script>