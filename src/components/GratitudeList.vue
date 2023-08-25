<script setup lang="ts">
import { ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import { StudentListButton } from '@/components'
import type { Student } from '@/shared/interfaces'
import { sortStudents } from '@/shared/helpers'

const props = defineProps({
  username: String,
  table: Array<Student>
})

const sortColumn = ref<'senders' | 'recipients'>('senders')
const sortProps = { senders: 'inSum', recipients: 'outSum' } as const

const filteredData = computedAsync(async () => {
  const [table, username] = [props.table ?? [], props.username ?? '']
  const filtered = (table ?? []).filter(({ github }) => github.includes(username ?? ''))
  return sortStudents(filtered, sortProps[sortColumn.value])
})
</script>

<template>
  <table class="border center-align">
    <thead>
      <tr>
        <th class="left-align bold">Github</th>
        <th class="center-align bold">
          <button class="transparent small" @click="sortColumn = 'senders'">
            <i>call_received</i>
          </button>
        </th>
        <th class="center-align bold">
          <button class="transparent small" @click="sortColumn = 'recipients'">
            <i>call_made</i>
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, i) in filteredData" :key="i">
        <td class="left-align">
          {{ i + 1 }}.
          <a :href="`https://github.com/${row.github}`" class="link underline">{{ row.github }}</a>
        </td>
        <td>
          <StudentListButton :list="row.senders" :size="row.inSum" />
        </td>
        <td>
          <StudentListButton :list="row.recipients" :size="row.outSum" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped></style>
