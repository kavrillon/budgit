<template>
  <div class="home">
    <div v-if="error" class="home__error" data-test="boardError">
      Error
    </div>
    <div v-if="loading" class="home__loading" data-test="boardLoading">
      Loading...
    </div>
    <div v-if="!loading && !error" class="home__list" data-test="boardList">
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
      error: null,
      items: null as Board[] | null,
      loading: true,
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const result = await axios.get<Board[]>('/data/boards.json');
        this.items = result.data;
      } catch (e) {
        this.error = e;
      }
      this.loading = false;
    },
  },
});
</script>
