<template>
  <div class="home">
    <div class="home__list" data-test="boardList">
      <div
        class="home__list__item"
        v-for="(item, key) in items"
        :key="key"
        data-test="boardListItem"
      >
        <board-summary :board="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

import { Board } from '@/@types';
import BoardSummary from '@/components/Board/BoardSummary.vue';

export default Vue.extend({
  components: {
    BoardSummary,
  },
  data() {
    return {
      items: null as Board[] | null,
    };
  },
  async created() {
    this.items = (await axios.get<Board[]>('/data/boards.json')).data;
  },
});
</script>
