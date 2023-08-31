<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps({
  students: { type: Array<[String, Number]>, required: true }
})

const emit = defineEmits(['modal-close'])

const studentList = ref<HTMLElement>()

onClickOutside(studentList, () => emit('modal-close'))
</script>

<template>
  <Teleport to="body">
    <div class="wrapper absolute">
      <div class="grid background no-space large-elevate padding" ref="studentList">
        <template v-for="[name, num] in props.students" :key="name">
          <div class="s2 border tiny-padding center-align">{{ num }}</div>
          <div class="s10 border tiny-padding">
            <a :href="`https://github.com/${name}`">{{ name }}</a>
          </div>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.wrapper {
  background-color: #00000030;
  inset: 0;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid {
  width: 240px;
  max-height: 320px;
  overflow: auto;
}
</style>
