<template>
  <div class="modal is-delete-modal">
      <h3 class="mt-6">
          {{ $t('devices.deleteModal.title') }} "{{device.title}}"
      </h3>
      <div class="mt-1">
        <button @click="cancel" class="button">
            {{ $t('devices.deleteModal.cancel') }}
        </button>
        <button @click="deleteDevice" class="button is-danger">
            {{ $t('devices.deleteModal.delete') }}
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