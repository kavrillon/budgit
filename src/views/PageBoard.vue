<template>
  <layout-page :loading="loading" :error="error">
    <template v-slot:title>
      <span v-if="board">{{ board.name }}</span>
    </template>
    <template v-slot:content>
      <section v-if="board" class="board" data-test="board">
        <board-total :board="board" />
      </section>
    </template>
  </layout-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action, Getter, State } from 'vuex-class';
import { Board } from '@/@types';
import LayoutPage from '@/layout/Page.vue';
import BoardTotal from '@/components/Board/Total.vue';
import { ACTION_BOARD_FETCH_ITEM } from '@/store/board/actions';

const namespace = 'board';

@Component({
  components: {
    BoardTotal,
    LayoutPage,
  },
})
export default class PageBoard extends Vue {
  @Action(ACTION_BOARD_FETCH_ITEM, { namespace }) fetchBoard!: Function;
  @Getter('current', { namespace }) board?: Board | null;
  @State('loading') loading!: boolean;

  get error(): string | null {
    return this.loading === false && this.board === null
      ? 'No board matching the request'
      : null;
  }

  mounted() {
    this.init();
  }

  async init() {
    const id = parseInt(this.$route.params.id, 10);
    await this.fetchBoard(id);
  }
}
</script>
