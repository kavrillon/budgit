<template>
  <router-link
    :to="{ name: 'board', params: { id: board.id } }"
    class="board-summary"
    data-test="boardSummary"
  >
    <span class="board-summary__text">{{ board.name }}</span>
  </router-link>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Board } from '@app/@types';

@Component
export default class BoardSummary extends Vue {
  @Prop() readonly board!: Board;
}
</script>
<style lang="scss" scoped>
.board-summary {
  @include tile-highlight;

  flex: 1 1 100%;
  text-decoration: none;

  &__text {
    @include subtitle;

    flex: 0 0 auto;

    @media (min-width: $sm) {
      @include title;
    }
  }
}
</style>
