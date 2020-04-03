<template>
  <div class="home">
    <div v-if="error" class="home__error" data-test="boardsError">
      Error
    </div>
    <div v-if="loading" class="home__loading" data-test="boardsLoading">
      Loading...
    </div>
    <div v-if="!loading && !error" class="home__content">
      <h1 class="home__content__title">
        Your boards
      </h1>
      <div class="home__content__board">
        <ul class="home__content__board__list" data-test="boardsList">
          <li
            class="home__content__board__list__item"
            v-for="(item, key) in items"
            :key="key"
            data-test="boardsListItem"
          >
            <board-summary :board="item" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Board } from '@/@types';
import BoardSummary from '@/components/Board/Summary.vue';
import { boardService } from '@/services/board.service';

@Component({
  components: {
    BoardSummary,
  },
})
export default class PageHome extends Vue {
  error: string | null = null;
  items: Board[] | null = null;
  loading = true;

  created() {
    this.init();
  }

  async init() {
    this.items = await boardService.getBoards();
    if (this.items === null) {
      this.error = 'No board';
    }
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: hidden;

    &__title {
      @include title;

      flex: 0 0 auto;
      max-width: 1200px;
      margin: 0 auto;
      padding: $gutter-lg;
      width: 100%;
    }

    &__board {
      flex: 1 1 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      overflow-y: auto;
      width: 100%;

      &__list {
        flex: 1 1 100%;
        overflow-y: auto;
        margin: 0 auto;
        padding: 0 $gutter-lg;
        list-style: none;
        max-width: 1200px;

        @media (min-width: $sm) {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        &__item {
          margin-bottom: $gutter-lg;

          @media (min-width: $sm) {
            flex: 0 0 calc(50% - #{$gutter});
          }
        }
      }
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
  }
}
</style>
