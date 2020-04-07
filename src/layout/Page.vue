<template>
  <div class="page" :class="{ 'page--scrolled': scrolled }" data-test="page">
    <section v-if="error" class="page__error" data-test="pageError">
      Error: {{ error }}
    </section>

    <section
      v-if="!error && loading"
      class="page__loading"
      data-test="pageLoading"
    >
      Loading...
    </section>

    <section
      v-if="!error && !loading"
      class="page__content"
      data-test="pageContent"
    >
      <header class="page__content__header" data-test="pageHeader">
        <h1 class="page__content__header__title" data-test="pageTitle">
          <slot name="title" />
        </h1>
      </header>
      <main
        class="page__content__container"
        data-test="pageScroller"
        v-on:scroll.passive="onScroll"
      >
        <div class="page__content__container__scroller">
          <slot name="content" />
        </div>
      </main>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LayoutPage extends Vue {
  @Prop({ default: null }) readonly error!: string | null;
  @Prop({ default: false }) readonly loading!: boolean;

  scrolled = false;

  onScroll(e: UIEvent) {
    const el = e.target as HTMLElement;
    if (el !== null) {
      this.scrolled = el.scrollTop > 0;
    }
  }
}
</script>
<style lang="scss" scoped>
$max-width: 1200px;

.page {
  display: flex;
  flex: 1 1 auto;

  &__error {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
  }

  &__loading {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;

    &__header {
      max-width: $max-width;
      margin: 0 auto;
      flex: 0 0 auto;
      padding: var(--gutter-lg);
      width: 100%;
      transition: all $transition-duration-fast $transition-effect-default;
      will-change: padding;

      .page--scrolled & {
        padding: var(--gutter) var(--gutter-lg);
      }

      &__title {
        @include title;

        transition: font-size $transition-duration-fast
          $transition-effect-default;
        will-change: font-size;

        .page--scrolled & {
          font-size: var(--font-size-subtitle);
        }
      }
    }

    &__container {
      flex: 1 1 auto;
      overflow-y: auto;

      &__scroller {
        max-width: $max-width;
        margin: 0 auto;
        width: 100%;
        padding: 0 var(--gutter-lg) var(--gutter-lg);

        transition: padding-top $transition-duration-fast
          $transition-effect-default;
        will-change: padding-top;

        .page--scrolled & {
          padding-top: 42px;
        }
      }
    }
  }
}
</style>
