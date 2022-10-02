<template>
  <div class="is-device pb-1 mb-2 pl-3 pr-3">
        <h3 class="is-secondary">
            {{ device.title }}
        </h3>
        <p class="mt-negative-4 is-device-title">
            <span> 
                Hours:
            </span> 
            {{ device.hours }}h/Day
            <br>
            <span> 
                Power:
            </span> 
            {{ device.watts }}W
            <br>
            <span> Price/KWh: </span> 
            {{ device.price }}
        </p>
        <div class="mt-negative-3 mb-2">
            <button class="button" @click="$emit('delete', device)">
                Delete
            </button>
            <button class="button" @click="$emit('edit', device.uuid)">
                Edit
            </button>
        </div>
  </div>
</template>

<script>
export default {
    props: {
        device: {
            type: Object,
            required: true
        }
    }
}
</script>