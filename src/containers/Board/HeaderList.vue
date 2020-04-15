<template>
  <div class="headerlist">
    <h1 class="headerlist__title" data-test="pageTitle">
      Your boards ({{ items.length }})
    </h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Board } from '@/@types';
import { ACTION_BOARD_FETCH_LIST } from '@/store/board/actions';

const namespace = 'board';

@Component
export default class BoardHeaderList extends Vue {
  @Action(ACTION_BOARD_FETCH_LIST, { namespace }) fetchBoards!: Function;
  @Getter('list', { namespace }) items!: Board[];

  async mounted() {
    await this.fetchBoards();
  }
}
</script>
<style lang="scss" scoped>
.headerlist {
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
