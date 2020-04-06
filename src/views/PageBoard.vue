<template>
  <layout-page :loading="loading" :error="error">
    <template v-slot:title>
      {{ board.name }}
    </template>
    <template v-slot:content>
      <section class="board" data-test="board">
        <board-total :board="board" />
      </section>
    </template>
  </layout-page>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import { Board } from '@/@types';
import LayoutPage from '@/layout/Page.vue';
import BoardTotal from '@/components/Board/Total.vue';
import { boardService } from '@/services/board.service';

@Component({
  components: {
    BoardTotal,
    LayoutPage,
  },
})
export default class PageBoard extends Vue {
  board: Board | null = null;
  error: string | null = null;
  loading = true;

  created() {
    this.init();
  }

  async init() {
    const id = parseInt(this.$route.params.id);
    this.board = await boardService.getBoard(id);

    if (this.board === null) {
      this.error = 'No board matching the request';
    }

    this.loading = false;
  }
}
</script>
