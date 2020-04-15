<template>
  <div class="boardheader">
    <h1 v-if="board" class="boardheader__title" data-test="pageTitle">
      {{ board.name }}
    </h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Board } from '@/@types';
import { ACTION_BOARD_FETCH_ITEM } from '@/store/board/actions';

const namespace = 'board';

@Component
export default class BoardHeader extends Vue {
  @Action(ACTION_BOARD_FETCH_ITEM, { namespace }) fetchBoard!: Function;
  @Getter('current', { namespace }) board?: Board | null;
  @Prop({ default: -1 }) readonly boardId!: number;

  async mounted() {
    await this.fetchBoard(this.boardId);
  }
}
</script>
<style lang="scss" scoped>
.boardheader {
  &__title {
    @include title;

    transition: font-size $transition-duration-fast $transition-effect-default;
    will-change: font-size;

    .app--scrolled & {
      font-size: var(--font-size-subtitle);
    }
  }
}
</style>
