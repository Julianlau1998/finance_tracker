<template>
  <div class="modal">
      <h3>
          Add Device to list
      </h3>
      <input v-model="title" type="text" class="input mt-1" placeholder="Device Name">
      <br>
      <div class="mt-3">
        <button @click="close" class="button">
            Close
        </button>
        <button @click="add" class="button">
            Add Device
        </button>
      </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            title: ''
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