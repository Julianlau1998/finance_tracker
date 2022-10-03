<template>
  <div class="modal">
      <h3>
          {{ edit ? $t('calculator.modal.save') : $t('calculator.modal.add') }}
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
        editTitle: {
            type: String,
            default: '',
            required: false
        }
    },
    data () {
        return {
            title: this.editTitle,
        }
    },
    mounted () {
        this.$refs.title.focus()
    },
    methods: {
        add () {
            this.$emit('add', this.title)
        },
        close () {
            this.$emit('close')
        }
    }
}
</script>