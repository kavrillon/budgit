<template>
  <div class="board">
    <div v-if="error" class="board__error" data-test="boardError">
      Error
    </div>
    <div v-if="loading" class="board__loading" data-test="boardLoading">
      Loading...
    </div>
    <div v-if="board && !error" class="board__item" data-test="board">
      <h1 class="board__item__title" data-test="boardTitle">
        {{ board.name }}
      </h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Board } from '@/@types';
import { boardService } from '@/services/board.service';

@Component
export default class PageBoard extends Vue {
  board: Board | null = null;
  error: string | null = null;
  loading = true;

  created() {
    this.init();
  }

  async init() {
    const id = parseInt(this.$route.params.id);
    this.board = await boardService.getBoard(id);

    if (this.board === null) {
      this.error = 'No board matching the request';
    }

    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
.board {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  overflow: hidden;
  justify-content: stretch;
  align-items: stretch;

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
  }

  &__item {
    &__title {
      @include title;
    }
  }
}
</style>
