<template>
  <div class="app" :class="{ 'app--scrolled': scrolled }">
    <section v-show="error" class="app__error" data-test="pageError">
      {{ error }}
    </section>

    <section v-show="displayLoader" class="app__loader" data-test="pageLoader">
      <heart-beat color="#00b3bd" />
    </section>

    <section
      v-show="displayContent"
      class="app__content"
      data-test="pageContent"
    >
      <header class="app__content__header" data-test="pageHeader">
        <transition-slide :leave="{ active: true }">
          <router-view name="header" />
        </transition-slide>
      </header>
      <main
        class="app__content__main"
        v-on:scroll.passive="onScroll"
        data-test="pageScroller"
      >
        <div class="app__content__main__scroller">
          <transition-slide
            :leave="{ active: true, vertical: true, inverse: false }"
          >
            <router-view name="content" />
          </transition-slide>
        </div>
      </main>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State } from 'vuex-class';
import HeartBeat from '@libs/components/Loader/HeartBeat.vue';
import TransitionSlide from '@libs/components/Transition/Slide.vue';

@Component({ components: { HeartBeat, TransitionSlide } })
export default class ViewApp extends Vue {
  @State('error') error?: string | null;
  @State('loading') loading!: boolean;

  scrolled = false;

  get displayContent() {
    return this.loading === false && this.error === null;
  }

  get displayLoader() {
    return this.loading === true && this.error === null;
  }

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

.app {
  display: flex;
  flex: 1 1 auto;

  &__error {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
  }

  &__loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
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

      .app--scrolled & {
        padding: var(--gutter) var(--gutter-lg);
      }
      &__title {
        @include title;
        transition: font-size $transition-duration-fast
          $transition-effect-default;
        will-change: font-size;

        .app--scrolled & {
          font-size: var(--font-size-subtitle);
        }
      }
    }

    &__main {
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

        .app--scrolled & {
          padding-top: 42px;
        }
      }
    }
  }
}
</style>
