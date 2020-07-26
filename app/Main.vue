<template>
  <div id="main" class="main">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@app/assets/scss/global.scss';

.main {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  overflow: hidden;
}
</style>
