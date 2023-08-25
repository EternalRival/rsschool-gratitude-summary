<script setup lang="ts">
const props = defineProps({ list: Map, size: Number })
</script>

<template>
  <button class="chip small-elevate">
    <span>{{ props.size }}<i>patient_list</i></span>
    <div v-if="props.size" class="tooltip bottom no-space max">
      <div class="grid no-space" v-for="([name, num], i) in props.list" :key="i">
        <div class="s1">{{ num }}</div>
        <div class="s11">- {{ name }}</div>
      </div>
    </div>
  </button>
</template>

<style scoped>
.tooltip {
  max-width: 175px;
}
</style>
