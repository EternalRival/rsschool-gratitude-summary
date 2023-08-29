<script setup lang="ts">
import { ref } from 'vue'
import { UsernameInput, GratitudeList, CubeLoader } from '@/components'
import { buildStudents, parseGratitudes, fetchGratitudes } from '@/shared/helpers'
import { computedAsync } from '@vueuse/core'
import type { Student } from './shared/interfaces'

const username = ref('')

const table = computedAsync<Student[]>(async () => {
  const { cachedStudents } = await chrome.storage.local.get('cachedStudents')
  const now = Date.now()
  const cacheTimeLimit = 5 * 60 * 1000

  if (now - cachedStudents?.time < cacheTimeLimit) {
    return cachedStudents.data
  }

  const responses = await fetchGratitudes()
  if (responses.some(({ ok }) => !ok)) {
    return null
  }

  const promises = responses.map(parseGratitudes)
  const gratitudes = await Promise.all(promises)
  const students = buildStudents(gratitudes.flat())

  await chrome.storage.local.set({ cachedStudents: { data: students, time: now } })
  return students
})
</script>

<template>
  <main v-if="table === null" class="middle-align center-align">
    <a
      href="https://app.rs.school/"
      target="_blank"
      class="large-elevate link underline bold large-text"
    >
      <h2>https://app.rs.school/</h2>
    </a>
  </main>
  <main v-else class="small-padding">
    <UsernameInput @username-change="username = $event" />
    <CubeLoader v-if="!table" />
    <GratitudeList v-else :username="username" :table="table" />
  </main>
</template>

<style scoped></style>
