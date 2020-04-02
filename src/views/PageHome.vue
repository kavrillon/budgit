<template>
  <div class="home">
    <div v-if="error" class="home__error" data-test="boardsError">
      Error
    </div>
    <div v-if="loading" class="home__loading" data-test="boardsLoading">
      Loading...
    </div>
    <div v-if="!loading && !error" class="home__list" data-test="boardsList">
      <div
        class="home__list__item"
        v-for="(item, key) in items"
        :key="key"
        data-test="boardsListItem"
      >
        <board-summary :board="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import axios from 'axios';

import { Board } from '@/@types';
import BoardSummary from '@/components/Board/Summary.vue';

@Component({
  components: {
    BoardSummary,
  },
})
export default class PageHome extends Vue {
  error: Error | null = null;
  items: Board[] | null = null;
  loading = true;

  created() {
    this.init();
  }

  async init() {
    try {
      const result = await axios.get<Board[]>('/data/boards.json');
      this.items = result.data;
    } catch (e) {
      this.error = e;
    }
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
  overflow: hidden;
  justify-content: stretch;
  align-items: stretch;

  &__list {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    flex: 1 1 auto;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: $gutter-large 0;

    @media (min-width: $sm) {
      padding: 0 $gutter-large;
    }

    &__item {
      display: flex;
      padding: $gutter-large $gutter-xlarge;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
      flex: 1 1 100%;

      @media (min-width: $sm) {
        flex: 1 1 auto;
        padding: $gutter-xlarge $gutter-large;
      }
    }
  }

  &__loading {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 1 auto;
  }
}
</style>
