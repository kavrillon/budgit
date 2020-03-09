<template>
  <div id="app" class="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/global.scss';

.app {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
