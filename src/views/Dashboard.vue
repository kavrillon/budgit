<template>
  <main class="accounts" v-if="board !== null">
    <h1 class="accounts__title">List of accounts</h1>
    <header class="accounts__resume">
      <div class="accounts__resume__line">
        Total: {{ board.total | amount(0) }}
      </div>
    </header>

    <div class="accounts__list">
      <account-summary
        v-for="(account, index) in board.accounts"
        :key="index"
        :account="account"
      />
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue';
import { getBoard } from '@/services/board.service';
import { Account, Board, Operation } from '@/@types';
import AccountSummary from '@/components/Account/Summary.vue';

export default Vue.extend({
  components: {
    AccountSummary,
  },
  data() {
    return {
      board: null as Board | null,
    };
  },
  async created() {
    this.board = await getBoard(1);
  },
});
</script>
<style lang="scss" scoped>
.accounts {
  padding: $gutter-size;
  text-align: center;

  &__title {
    @include title;

    margin: 0 0 $gutter-size;
    padding: 0;
  }

  &__list {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
