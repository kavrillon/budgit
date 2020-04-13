<template>
  <div class="app" :class="{ 'app--scrolled': scrolled }" data-test="page">
    <section v-if="error" class="app__error" data-test="pageError">
      Error: {{ error }}
    </section>

    <section
      v-if="!error && loading"
      class="app__loading"
      data-test="pageLoading"
    >
      Loading...
    </section>

    <section
      v-if="!error && !loading"
      class="app__content"
      data-test="pageContent"
    >
      <header class="app__content__header" data-test="pageHeader">
        <transition name="slide" appear mode="out-in">
          <router-view name="header" :key="id" />
        </transition>
      </header>
      <main
        class="app__content__container"
        data-test="pageScroller"
        v-on:scroll.passive="onScroll"
      >
        <div class="app__content__container__scroller">
          <transition name="content" appear mode="out-in">
            <router-view name="content" :key="id" />
          </transition>
        </div>
      </main>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';

import store from '@/store';
import {
  ACTION_FETCH_BOARD,
  ACTION_FETCH_BOARD_LIST,
  ACTION_REMOVE_ACTIVE_BOARD,
} from '@/store/actions.type';

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave']);

@Component
export default class App extends Vue {
  @Prop({ default: null }) readonly id!: number;

  @Watch('$route', { immediate: true, deep: true })
  async onUrlChange(to: Route) {
    if (typeof to.params.id !== 'undefined') {
      await store.dispatch(ACTION_FETCH_BOARD, parseInt(to.params.id, 10));
    } else {
      await store.dispatch(ACTION_FETCH_BOARD_LIST);
    }
  }

  scrolled = false;
  error = null;
  loading = false;

  onScroll(e: UIEvent) {
    const el = e.target as HTMLElement;
    if (el !== null) {
      this.scrolled = el.scrollTop > 0;
    }
  }

  async beforeRouteEnter(to: Route, from: Route, next: Function) {
    next();
  }

  async beforeRouteLeave(to: Route, from: Route, next: Function) {
    await store.dispatch(ACTION_REMOVE_ACTIVE_BOARD);
    next();
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

        .app--scrolled & {
          padding-top: 42px;
        }
      }
    }
  }
}
</style>
