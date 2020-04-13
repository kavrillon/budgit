<template>
  <div class="listheader">
    <h1 class="listheader__title" data-test="pageTitle">
      Your Boards
    </h1>
  </div>
</template>
<style lang="scss" scoped>
.listheader {
  &__title {
    @include title;

    transition: font-size $transition-duration-fast $transition-effect-default;
    will-change: font-size;

    .app--scrolled & {
      font-size: var(--font-size-subtitle);
    }
  }
}
</style>
