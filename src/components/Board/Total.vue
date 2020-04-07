<template>
  <article class="total">
    <div class="total__value" data-test="boardTotal">{{ total }}</div>
  </article>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

import { Board } from '@/@types';
import { formatAmount } from '@libs/numbers';

@Component
export default class BoardTotal extends Vue {
  @Prop() readonly board!: Board;

  get total(): string {
    return formatAmount(this.board.total, 0, true);
  }
}
</script>
<style lang="scss" scoped>
.total {
  @include tile-highlight;

  &__value {
    @include highlight;
  }
}
</style>
