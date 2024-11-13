<script setup lang="ts">
import { useInfiniteScroll } from '@vueuse/core'
import clsx from 'clsx'
import { computed, ref, watch } from 'vue'
import type { Contributor, Student } from '~/utils/get-gratitudes-summary'

const GITHUB_URL = 'https://github.com/'
const PAGE_SIZE = 15

type SortMode = 'received-desc' | 'sent-desc'

const props = defineProps<{ studentList: Student[] }>()
defineEmits<{ openContributorsModal: [contributorList: Contributor[]] }>()

const sortMode = ref<SortMode>('received-desc')
const infiniteScrollElement = ref<HTMLElement | null>(null)
const infiniteScrollLength = ref<number>(PAGE_SIZE)

const sortedStudentList = computed(() =>
  props.studentList.toSorted((a: Student, b: Student) => {
    switch (sortMode.value) {
      case 'received-desc':
        return b.senders.count - a.senders.count || a.github.localeCompare(b.github)
      case 'sent-desc':
        return b.receivers.count - a.receivers.count || a.github.localeCompare(b.github)
    }
  })
)

const currentStudentList = computed(() => sortedStudentList.value.slice(0, infiniteScrollLength.value))

const resetInfiniteScroll = () => {
  infiniteScrollElement.value?.scrollTo({ top: 0, behavior: 'instant' })
  infiniteScrollLength.value = PAGE_SIZE
}

const incrementInfiniteScrollLength = () => {
  infiniteScrollLength.value += PAGE_SIZE
}

const handleChangeSortMode = (newSortMode: SortMode) => {
  sortMode.value = newSortMode
  resetInfiniteScroll()
}

useInfiniteScroll(infiniteScrollElement, incrementInfiniteScrollLength, { distance: PAGE_SIZE })

watch(() => props.studentList, resetInfiniteScroll)
</script>

<template>
  <ul
    ref="infiniteScrollElement"
    :class="
      clsx(
        'grid grid-cols-[min-content_auto_repeat(2,5rem)]',
        'max-h-[442px] overflow-y-auto [&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar]:w-2'
      )
    "
  >
    <li class="contents">
      <span class="sticky top-0 border bg-neutral-200 p-1.5 text-center font-medium">№</span>
      <span class="pointer-events-none sticky top-0 border bg-neutral-200 p-1.5 font-medium">
        Github ({{ studentList.length }})
      </span>
      <button
        @click="handleChangeSortMode('received-desc')"
        :class="
          clsx(
            'sticky top-0 border bg-neutral-200 p-1.5 font-medium',
            'hover:border-neutral-300 hover:bg-neutral-300',
            'focus-visible:bg-neutral-300 focus-visible:outline-1',
            sortMode === 'received-desc' && 'border-neutral-300 bg-neutral-300'
          )
        "
      >
        Received
      </button>
      <button
        @click="handleChangeSortMode('sent-desc')"
        :class="
          clsx(
            'sticky top-0 border bg-neutral-200 p-1.5 font-medium',
            'hover:border-neutral-300 hover:bg-neutral-300',
            'focus-visible:bg-neutral-300 focus-visible:outline-1',
            sortMode === 'sent-desc' && 'border-neutral-300 bg-neutral-300'
          )
        "
      >
        Sent
      </button>
    </li>

    <li
      v-if="studentList.length < 1"
      class="col-span-full border bg-white p-1.5 text-center"
    >
      Students not found
    </li>

    <li
      v-else
      v-for="(student, index) in currentStudentList"
      class="contents"
      :key="`${student.github}${student.receivers.count}${student.senders.count}`"
    >
      <span class="border bg-white p-1.5 text-center">{{ index + 1 }}</span>
      <a
        :href="`${GITHUB_URL}${student.github}`"
        :title="`${GITHUB_URL}${student.github}`"
        :class="clsx('overflow-x-hidden text-ellipsis border bg-white p-1.5', 'hover:bg-neutral-100')"
      >
        {{ student.github }}
      </a>
      <button
        @click="$emit('openContributorsModal', student.senders.list)"
        :title="`from ${student.senders.list.length} contributors`"
        :class="clsx('border bg-white p-1.5', 'hover:enabled:bg-neutral-100')"
        :disabled="student.senders.count < 1"
      >
        {{ student.senders.count }}
      </button>
      <button
        @click="$emit('openContributorsModal', student.receivers.list)"
        :title="`to ${student.receivers.list.length} contributors`"
        :class="clsx('border bg-white p-1.5', 'hover:enabled:bg-neutral-100')"
        :disabled="student.receivers.count < 1"
      >
        {{ student.receivers.count }}
      </button>
    </li>
  </ul>
</template>
