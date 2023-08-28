<script setup lang="ts">
import { ref } from 'vue'
import { CustomInput, GratitudeList, CubeLoader } from '@/components'
import { buildStudents, parseGratitudes, fetchGratitudes } from '@/shared/helpers'
import { computedAsync } from '@vueuse/core'

const username = ref('')

const response = computedAsync(() => fetchGratitudes(), null)

const table = computedAsync(async () => {
  if (!response.value?.ok) {
    return []
  }
  const gratitudes = await parseGratitudes(response.value)
  const students = buildStudents(gratitudes)
  return Array.from(students.values())
}, [])
</script>

<template>
  <main v-if="response?.ok !== false" class="small-padding">
    <CustomInput class="username-input" @username-change="username = $event" />
    <GratitudeList v-if="table.length" class="gratitude-list" :username="username" :table="table" />
    <CubeLoader v-else />
  </main>
  <main v-else class="middle-align center-align">
    <a
      href="https://app.rs.school/"
      target="_blank"
      class="large-elevate link underline bold large-text"
    >
      <h2>https://app.rs.school/</h2>
    </a>
  </main>
</template>

<style scoped>
main {
  width: 480px;
  height: 480px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.username-input {
  flex-shrink: 0;
  margin: 0;
}
.gratitude-list {
  overflow-y: auto;
}
</style>
