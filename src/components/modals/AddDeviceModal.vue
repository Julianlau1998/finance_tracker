<template>
  <div class="modal">
      <h3>
          {{ edit ? 'Add device to list' : 'Edit device from list' }}
      </h3>
      <input
        v-model="title"
        type="text"
        class="input mt-1"
        placeholder="Device Name"
      >
      <br>
      <div class="mt-3">
        <button @click="close" class="button">
            Close
        </button>
        <button @click="add" class="button">
            {{ edit ? 'Save Device' : 'Add Device' }}
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