<script setup lang="ts"></script>

<template>
  <Teleport to="body">
    <div class="wrapper small-blur middle-align center-align absolute">
      <div class="cube">
        <div
          v-for="n in 6"
          :key="n"
        ></div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes cube {
  0% {
    transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
  }

  50% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
  }

  100% {
    transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
  }
}

.wrapper {
  position: fixed;
  z-index: 5;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--on-background);
  text-align: center;

  background-color: #008c8c20;
  backdrop-filter: blur(0.5rem);
}

.cube {
  transform-style: preserve-3d;
  width: 40px;
  height: 40px;
  animation: cube 2s infinite ease;

  div {
    position: absolute;

    width: 100%;
    height: 100%;

    background-color: #008c8c20;
    border: 2px solid #008c8c;

    &:nth-of-type(1) {
      transform: translateZ(-20px) rotateY(180deg);
    }

    &:nth-of-type(2) {
      transform-origin: top right;
      transform: rotateY(-270deg) translateX(50%);
    }

    &:nth-of-type(3) {
      transform-origin: center left;
      transform: rotateY(270deg) translateX(-50%);
    }

    &:nth-of-type(4) {
      transform-origin: top center;
      transform: rotateX(90deg) translateY(-50%);
    }

    &:nth-of-type(5) {
      transform-origin: bottom center;
      transform: rotateX(-90deg) translateY(50%);
    }

    &:nth-of-type(6) {
      transform: translateZ(20px);
    }
  }
}
</style>
