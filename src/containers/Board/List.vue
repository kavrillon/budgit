<template>
  <div class="list">
    <ul class="list__content">
      <li
        class="list__content__item"
        data-test="boardListItem"
        v-for="(item, key) in items"
        :key="key"
      >
        <board-summary :board="item" />
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import { Board } from '@/@types';
import BoardSummary from '@/components/Board/Summary.vue';
import { ACTION_BOARD_FETCH_LIST } from '@/store/board/actions';

const namespace = 'board';

@Component({ components: { BoardSummary } })
export default class BoardList extends Vue {
  @Action(ACTION_BOARD_FETCH_LIST, { namespace }) fetchBoards!: Function;
  @Getter('list', { namespace }) items!: Board[];

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
      transition-delay: 1s;

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
