<template>
  <layout-page :loading="loading" :error="error">
    <template v-slot:title>
      Your boards
    </template>
    <template v-slot:content>
      <div class="home">
        <ul class="home__list" data-test="boardsList">
          <li class="home__list__item" v-for="(item, key) in items" :key="key">
            <board-summary :board="item" />
          </li>
        </ul>
      </div>
    </template>
  </layout-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import { Board } from '@/@types';
import BoardSummary from '@/components/Board/Summary.vue';
import LayoutPage from '@/layout/Page.vue';
import { ACTION_BOARD_FETCH_LIST } from '@/store/board/actions';

const namespace = 'board';

@Component({
  components: {
    BoardSummary,
    LayoutPage,
  },
})
export default class PageHome extends Vue {
  @Action(ACTION_BOARD_FETCH_LIST, { namespace }) fetchBoards!: Function;
  @Getter('list', { namespace }) items!: Board[];
  @State('loading') loading!: boolean;
  @State('error') error?: string | null;

  mounted() {
    this.init();
  }

  async init() {
    await this.fetchBoards();
  }
}
</script>
<style lang="scss" scoped>
.home {
  &__list {
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
