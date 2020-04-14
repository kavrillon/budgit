<template>
  <layout-page :loading="initialized === false" :error="error">
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
import { Action, Getter } from 'vuex-class';

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

  initialized = false;

  get error(): string | null {
    return this.initialized === true && this.board === null
      ? 'No board matching the request'
      : null;
  }

  mounted() {
    this.init();
  }

  async init() {
    const id = parseInt(this.$route.params.id, 10);
    await this.fetchBoard(id);
    this.initialized = true;
  }
}
</script>
