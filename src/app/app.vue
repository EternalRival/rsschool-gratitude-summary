<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, onBeforeMount, ref } from 'vue'
import ContributorModal from '~/components/contributor-modal.vue'
import CubeLoader from '~/components/cube-loader.vue'
import SearchStudentInput from '~/components/search-student-input.vue'
import StudentList from '~/components/student-list.vue'
import type { Contributor } from '~/utils/get-gratitudes-summary'
import getGratitudesSummary from '~/utils/get-gratitudes-summary'

const RSSCHOOL_URL = 'https://app.rs.school/'

const isModalOpen = ref<boolean>(false)
const modalContent = ref<Contributor[]>([])
const searchValue = ref<string>('')

const { isPending, isError, data } = useQuery({
  queryKey: ['gratitudes'],
  queryFn: getGratitudesSummary,
})

const filteredStudentList = computed(() => {
  if (!data.value) return []

  return data.value.filter((item) => item.github.toLowerCase().includes(searchValue.value.toLowerCase()))
})

const handleOpenContributorsModal = (contributorList: Contributor[]) => {
  isModalOpen.value = true
  modalContent.value = contributorList
}

onBeforeMount(async () => {
  if (import.meta.env.MODE === 'development') return

  const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const isPathCorrect = currentTabs.every((tab) => tab.url?.startsWith(RSSCHOOL_URL))

  if (isPathCorrect) return

  await chrome.tabs.create({ url: RSSCHOOL_URL })
})
</script>

<template>
  <header>
    <SearchStudentInput v-model="searchValue" />
  </header>

  <main>
    <ContributorModal
      :is-open="isModalOpen"
      :contributor-list="modalContent"
      @close="isModalOpen = false"
    />

    <CubeLoader v-if="isPending" />

    <div
      v-else-if="isError"
      class="fixed inset-0 flex items-center justify-center bg-white p-1.5"
    >
      An error occurred while fetching data. Please try again later.
    </div>

    <StudentList
      v-else-if="data"
      :student-list="filteredStudentList"
      @open-contributors-modal="handleOpenContributorsModal"
    />
  </main>
</template>
