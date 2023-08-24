<script setup lang="ts">
import CustomInput from './components/CustomInput.vue'
import { ref } from 'vue'
import { getGratitudes, buildStudents } from './shared/helpers'
import { computedAsync } from '@vueuse/core'

const username = ref('55')

const table = computedAsync(async () => {
  const gratitudes = await getGratitudes()
  const students = buildStudents(gratitudes)
  return Array.from(students.values())
})

const handleUsernameChange = (value: string) => {
  username.value = value
}
</script>

<template>
  <main>
    <CustomInput @username-change="handleUsernameChange" />
    <div>
      <div v-for="(student, i) in table" :key="i">{{ student }}</div>
    </div>
  </main>
</template>

<style scoped>
main {
  padding: 1em;
  min-width: 200px;
}
</style>
