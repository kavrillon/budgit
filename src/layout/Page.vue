<template>
  <div class="page">
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
      <header class="page__content__header">
        <h1 class="page__content__header__title" data-test="pageTitle">
          <slot name="title" />
        </h1>
      </header>
      <main class="page__content__container">
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
      padding: $gutter-lg;
      width: 100%;

      &__title {
        @include title;
      }
    }

    &__container {
      flex: 1 1 auto;
      overflow-y: auto;

      &__scroller {
        max-width: $max-width;
        margin: 0 auto;
        width: 100%;
        padding: 0 $gutter-lg $gutter-lg;
      }
    }
  }
}
</style>
