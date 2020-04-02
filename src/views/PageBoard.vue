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

import axios from 'axios';
import { Board } from '@/@types';

@Component
export default class PageBoard extends Vue {
  board: Board | null = null;
  error: Error | null = null;
  loading = true;

  created() {
    this.init();
  }

  async init() {
    try {
      const result = await axios.get<Board[]>('/data/boards.json');
      if (result.data && result.data.length > 0) {
        this.board =
          result.data.find(i => i.id === parseInt(this.$route.params.id)) ||
          null;

        if (this.board === null) {
          throw new Error('No data');
        }
      }
    } catch (e) {
      this.error = e;
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
