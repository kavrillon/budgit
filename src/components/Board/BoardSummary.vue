<template>
  <router-link
    :to="`/board/${board.id}`"
    class="board-summary"
    data-test="boardSummary"
  >
    <span class="board-summary__text">{{ board.name }}</span>
  </router-link>
</template>
<script lang="ts">
import Vue from 'vue';

import { Board } from '@/@types';

export default Vue.extend({
  name: 'BoardSummary',
  props: {
    board: {
      type: Object as () => Board,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.board-summary {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 100%;
  background: $color-primary;
  text-decoration: none;
  color: $color-text-opposite;

  &__text {
    @include title;

    flex: 0 0 auto;
  }
}
</style>
