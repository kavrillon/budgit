<template>
  <div v-if="loading === false && boards.length > 0" class="list">
    <transition-slide
      :enter="{ active: true, delay: 300, inverse: true, vertical: true }"
      :group="{ active: true, tag: 'ul', tagClass: 'list__content' }"
    >
      <li
        class="list__content__item"
        data-test="boardListItem"
        v-for="(item, index) in boards"
        :key="item.id"
        :data-index="index"
      >
        <board-summary :board="item" />
      </li>
    </transition-slide>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import TransitionSlide from '@libs/components/Transition/Slide.vue';
import { Board } from '@types';
import BoardSummary from '@app/components/Board/Summary.vue';
import { ACTION_BOARD_FETCH_LIST } from '@app/store/board/actions';

const namespace = 'board';

@Component({ components: { BoardSummary, TransitionSlide } })
export default class BoardList extends Vue {
  @Action(ACTION_BOARD_FETCH_LIST, { namespace }) fetchBoards!: Function;
  @Getter('list', { namespace }) boards!: Board[];
  @State('loading') loading!: boolean;

  async mounted() {
    await this.fetchBoards();
  }
}
</script>
<style lang="scss" scoped>
.list {
  &__content {
    margin: 0 auto;
    padding: 0;
    list-style: none;

    @media (min-width: $sm) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }

    &__item {
      margin-top: var(--gutter-lg);

      &:first-of-type {
        margin-top: 0;
      }

      @media (min-width: $sm) {
        flex: 0 0 calc(50% - var(--gutter));

        &:nth-of-type(2) {
          margin-top: 0;
        }
      }
    }
  }
}
</style>
