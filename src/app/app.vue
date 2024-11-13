<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { computed, onBeforeMount, ref } from 'vue'
import ContributorModal from '~/components/contributor-modal.vue'
import CubeLoader from '~/components/cube-loader.vue'
import RsschoolLink from '~/components/rsschool-link.vue'
import SearchStudentInput from '~/components/search-student-input.vue'
import StudentList from '~/components/student-list.vue'
import type { Contributor } from '~/utils/get-gratitudes-summary'
import getGratitudesSummary from '~/utils/get-gratitudes-summary'

const RSSCHOOL_URL = 'https://app.rs.school/'

const isPathCorrect = ref<boolean>()
const isModalOpen = ref<boolean>(false)
const modalContent = ref<Contributor[]>([])
const searchValue = ref<string>('')

const { isPending, isError, data } = useQuery({
  queryKey: ['gratitudes'],
  queryFn: getGratitudesSummary,
  enabled: isPathCorrect,
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
  if (import.meta.env.MODE === 'development') {
    isPathCorrect.value = true
  } else {
    const currentTabs = await chrome.tabs.query({ active: true, currentWindow: true })

    isPathCorrect.value = currentTabs.every((tab) => tab.url?.startsWith(RSSCHOOL_URL))
  }
})
</script>

<template>
  <div
    v-if="!isPathCorrect"
    class="flex h-dvh items-center justify-center bg-white"
  >
    <RsschoolLink />
  </div>

  <div v-else>
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
  </div>
</template>
