<script setup lang="ts">
const model = defineModel()
</script>

<template>
  <input
    v-model="model"
    class="w-full border p-1.5 outline-none focus-visible:[box-shadow:inset_0_0_6px_1px_#f5f5f5] [&:hover:not(:focus)]:bg-neutral-100"
    placeholder="Search"
  />
</template>
