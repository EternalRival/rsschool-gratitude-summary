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
  <main>
    <CustomInput @username-change="username = $event" />
    <GratitudeList :username="username" :table="table"></GratitudeList>
  </main>
</template>

<style scoped>
main {
  padding: 1em;
  min-width: 200px;
}
</style>
