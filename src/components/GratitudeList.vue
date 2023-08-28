<script setup lang="ts">
import { computed, ref } from 'vue'
import { useInfiniteScroll } from '@vueuse/core'
import type { Student } from '@/shared/interfaces'
import { StudentsModal } from '@/components'

const props = defineProps({
  username: { type: String, required: true },
  table: { type: Array<Student>, required: true }
})

const tableSizes = [6, 3, 3] as const
const sortProps = { senders: 'inSum', recipients: 'outSum' } as const
const sortColumn = ref<keyof typeof sortProps>('senders')

const filtered = computed(() => {
  const { table, username } = props
  return table.filter(({ github }) => github.includes(username))
})

const sorted = computed(() => {
  return [...filtered.value].sort((a, b) => {
    const prop = sortProps[sortColumn.value]
    return a[prop] === b[prop] ? a.github.localeCompare(b.github) : b[prop] - a[prop]
  })
})

const watchedElement = ref<HTMLElement>()
const distance = 10
const currentLength = ref(distance)
const rendered = computed(() => {
  return sorted.value.slice(0, currentLength.value)
})

const handleSortClick = (column: typeof sortColumn.value) => {
  sortColumn.value = column
  currentLength.value = distance
}
useInfiniteScroll(
  watchedElement,
  () => {
    currentLength.value += distance
  },
  { distance }
)

const modalStudentList = ref<Map<string, number> | null>(null)
const displayStudents = (students: Map<string, number>) => {
  modalStudentList.value = students
}
</script>

<template>
  <StudentsModal
    v-if="modalStudentList"
    :students="modalStudentList"
    @modal-close="modalStudentList = null"
  />
  <div class="gratitude-list grid no-space center-align" ref="watchedElement">
    <div :class="`s${tableSizes[0]} padding middle-align bold elevate`">Github</div>
    <div :class="`s${tableSizes[1]} tiny-padding elevate`">
      <button class="circle transparent" @click="handleSortClick('senders')">
        <i>call_received</i>
      </button>
    </div>
    <div :class="`s${tableSizes[2]} tiny-padding elevate`">
      <button class="circle transparent" @click="handleSortClick('recipients')">
        <i>call_made</i>
      </button>
    </div>
    <template v-for="(el, i) in rendered" :key="i">
      <div :class="`s${tableSizes[0]} middle-align elevate github`">
        <a target="_blank" class="small-padding" :href="`https://github.com/${el.github}`">
          <div class="list-index center-align">{{ i + 1 }}.</div>
          <span class="link underline">{{ el.github }}</span>
        </a>
      </div>
      <div :class="`s${tableSizes[1]} elevate small-padding`">
        <button class="chip elevate" @click="displayStudents(el.senders)" :disabled="!el.inSum">
          {{ el.inSum }}<i>patient_list</i>
        </button>
      </div>
      <div :class="`s${tableSizes[2]} elevate small-padding`">
        <button class="chip elevate" @click="displayStudents(el.recipients)" :disabled="!el.outSum">
          {{ el.outSum }}<i>patient_list</i>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.list-index {
  width: 2.5em;
}

.gratitude-list {
  overflow-y: auto;
}
</style>
