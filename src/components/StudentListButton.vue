<script setup lang="ts">
const props = defineProps({ list: Map, size: Number })
</script>

<template>
  <button class="chip small-elevate">
    <span class="content">{{ props.size }}<i>patient_list</i></span>
    <table v-if="props.size" class="tooltip bottom no-space max">
      <tr v-for="([name, num], i) in props.list" :key="i">
        <td class="counter">{{ num }}</td>
        <td class="name">&nbsp;- {{ name }}</td>
      </tr>
    </table>
  </button>
</template>

<style scoped>
.tooltip {
  width: 200px;
}
.name {
  width: auto;
}
.content {
  flex-shrink: 0;
}
</style>
