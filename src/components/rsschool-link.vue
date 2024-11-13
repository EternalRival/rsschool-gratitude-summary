<script setup lang="ts">
import clsx from 'clsx'

const RSSCHOOL_URL = 'https://app.rs.school/'
</script>

<template>
  <a
    :href="RSSCHOOL_URL"
    target="_blank"
    rel="noopener noreferrer"
    :class="clsx('bg-neutral-200 p-4 text-3xl font-bold shadow-md transition-colors', 'hover:bg-neutral-300')"
  >
    {{ RSSCHOOL_URL }}
  </a>
</template>
