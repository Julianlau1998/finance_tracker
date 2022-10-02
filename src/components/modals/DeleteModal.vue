<template>
  <div class="modal is-delete-modal">
      <h3 class="mt-6">
          Are You Sure You want to delete the device "{{device.title}}"
      </h3>
      <div class="mt-1">
        <button @click="cancel" class="button">
            Cancel
        </button>
        <button @click="deleteDevice" class="button is-danger">
            Delete Device
        </button>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        device: {
            type: Object,
            default: () => {},
            required: true
        }
    },
    data () {
        return {
            title: ''
        }
    },
    methods: {
        deleteDevice () {
            this.$emit('delete', this.device.uuid)
        },
        cancel () {
            this.$emit('cancel')
        }
    }
}
</script>