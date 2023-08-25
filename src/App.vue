<script setup lang="ts">
import { ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import { CustomInput, GratitudeList } from '@/components'
import { buildStudents, getGratitudes } from '@/shared/helpers'

const username = ref('')
const table = computedAsync(async () => {
  const gratitudes = await getGratitudes()
  const students = buildStudents(gratitudes)
  return Array.from(students.values())
})
</script>

<template>
  <main v-if="table">
    <CustomInput @username-change="username = $event" />
    <GratitudeList :username="username" :table="table"></GratitudeList>
  </main>
  <main v-else>Fetching...</main>
</template>

<style scoped>
main {
  padding: 1em;
  width: 580px;
  max-height: 580px;
  overflow-y: auto;
  display: grid;
  column-gap: 1em;
  grid-template-columns: auto min-content;
  grid-template-areas: 'username-field pagination' 'gratitude-list gratitude-list ';
}
</style>
