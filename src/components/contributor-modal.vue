<script setup lang="ts">
import clsx from 'clsx'
import type { Contributor } from '~/utils/get-gratitudes-summary'

const GITHUB_URL = 'https://github.com/'

defineProps<{ isOpen: boolean; contributorList: Contributor[] }>()
defineEmits<{ close: [] }>()
</script>

<template>
  <Teleport
    v-if="isOpen"
    to="body"
  >
    <div
      class="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
      @click="$event.target === $event.currentTarget && $emit('close')"
    >
      <ul
        :class="
          clsx(
            'grid max-h-[min(20rem,calc(100dvh-2rem))] w-60 grid-cols-[2.5rem_auto] overflow-auto border bg-white shadow-lg',
            '[&::-webkit-scrollbar-thumb]:bg-neutral-300 [&::-webkit-scrollbar-track]:bg-neutral-100 [&::-webkit-scrollbar]:w-2'
          )
        "
      >
        <li
          v-for="item in contributorList"
          :key="`${item.github}${item.count}`"
          class="contents"
        >
          <span class="border bg-white p-1 text-center">{{ item.count }}</span>
          <a
            :href="`${GITHUB_URL}${item.github}`"
            :title="`${GITHUB_URL}${item.github}`"
            :class="clsx('overflow-x-hidden text-ellipsis border bg-white p-1', 'hover:bg-neutral-100')"
          >
            {{ item.github }}
          </a>
        </li>
      </ul>
    </div>
  </Teleport>
</template>
