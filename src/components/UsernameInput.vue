<script setup lang="ts">
const emit = defineEmits(['usernameChange'])

const handleInput = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    emit('usernameChange', e.target.value)
  }
}
</script>

<template>
  <div class="username-input field label prefix small border">
    <i>search</i>
    <input @input="handleInput" />
    <label>Username</label>
  </div>
</template>

<style scoped>
.username-input {
  flex-shrink: 0;
  margin: 0;
}
</style>
