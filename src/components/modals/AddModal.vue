<template>
  <div class="modal is-add-modal">
      <h3 v-if="edit">
          {{ type === 'expenses' ? $t('expenses.modal.save') : $t('income.modal.save') }}
      </h3>
      <h3 v-else>
        {{ type === 'expenses' ? $t('expenses.modal.add') : $t('income.modal.add') }}
      </h3>
      <input
        v-model="title"
        ref="title"
        type="text"
        class="input mt-1"
        :placeholder="$t('calculator.modal.input')"
        autofocus
        @keydown.enter="add"
      >
      <br>
      <input
          v-model="amount"
          ref="amount"
          type="text"
          class="input mt-1"
          :placeholder="$t('calculator.modal.amountInput')"
          @keydown.enter="add"
      >
      <div class="mt-3">
        <button @click="close" class="button">
            {{ this.$t('calculator.modal.close') }}
        </button>
        <button @click="add" class="button">
            {{ edit ? $t('calculator.modal.saveButton') : $t('calculator.modal.addButton') }}
        </button>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        edit: {
            type: Boolean,
            default: false,
            required: false
        },
        editElement: {
            type: Object,
            default: () => {},
            required: false
        },
        type: {
          type: String,
          default: '',
          required: true
        }
    },
    data () {
        return {
            title: '',
            amount: ''
        }
    },
    created () {
      if (this.edit) {
        this.title = this.editElement.title
        this.amount = this.editElement.amount
      }
    },
    mounted () {
        this.$refs.title.focus()
    },
    methods: {
        add () {
            if (this.title.length && this.amount > 0) {
              this.$emit('add', { title: this.title, amount: this.amount, uuid: this.editElement ? this.editElement.uuid : ''})
            }
        },
        close () {
            this.$emit('close')
        }
    }
}
</script>