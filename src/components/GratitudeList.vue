<script setup lang="ts">
import { computed, ref, type UnwrapNestedRefs } from 'vue'
import { type UseOffsetPaginationReturn } from '@vueuse/core'
import { StudentListButton } from '@/components'
import type { Student } from '@/shared/interfaces'
import { sortStudents } from '@/shared/helpers'
import { UseOffsetPagination } from '@vueuse/components'

const props = defineProps({
  username: String,
  table: Array<Student>
})

const sortColumn = ref<'senders' | 'recipients'>('senders')
const sortProps = { senders: 'inSum', recipients: 'outSum' } as const

const filteredTable = computed(() => {
  const [table, username] = [props.table ?? [], props.username ?? '']
  const filtered = table.filter(({ github }) => github.includes(username))
  return sortStudents(filtered, sortProps[sortColumn.value])
})

const pageSize = 8
const currentPage = ref(1)
const getFirstItemIndex = () => {
  return (currentPage.value - 1) * pageSize
}

const slicedTable = computed(() => {
  const firstItemIndex = getFirstItemIndex()
  return filteredTable.value.slice(firstItemIndex, firstItemIndex + pageSize)
})

const kek = (pagination: UnwrapNestedRefs<UseOffsetPaginationReturn>) => {
  currentPage.value = pagination.currentPage
}
</script>

<template>
  <UseOffsetPagination
    v-slot="{ currentPage, prev, next }"
    :total="() => filteredTable.length"
    :page-size="pageSize"
    @page-change="kek"
  >
    <div class="pagination">
      <nav class="no-space">
        <button class="border left-round no-padding" @click="prev"><i>navigate_before</i></button>
        <button class="border no-round no-padding fill">{{ currentPage }}</button>
        <button class="border right-round no-padding" @click="next"><i>navigate_next</i></button>
      </nav>
    </div>
  </UseOffsetPagination>
  <table class="gratitude-list border center-align">
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
      <tr v-for="(row, i) in slicedTable" :key="i">
        <td class="left-align">
          {{ i + getFirstItemIndex() + 1 }}.
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

<style scoped>
.pagination {
  grid-area: pagination;
  display: flex;
  align-items: center;
}
.pagination .field {
  margin: 0;
  width: 3em;
}
.pagination input {
  padding: 0;
  text-align: center;
}
.gratitude-list {
  grid-area: gratitude-list;
}
</style>
