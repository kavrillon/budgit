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

    <div class="accounts__operations">
      <h2 class="accounts__operations__title">Operations this month</h2>
      <ul class="accounts__operations__list">
        <li
          v-for="(operation, index) in board.lastOperations"
          :key="index"
          class="accounts__operations__list__item"
        >
          <div class="accounts__operations__list__item__date">
            {{ operation.date }}
          </div>
          <div class="accounts__operations__list__item__account">
            {{ operation.accountName }}
          </div>
          <div class="accounts__operations__list__item__name">
            {{ operation.name }}
          </div>
          <div class="accounts__operations__list__item__value">
            {{ operation.value }}
          </div>
        </li>
      </ul>
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

  &__operations {
    &__title {
      @include title;
    }

    &__list {
      margin: 0;
      padding: 0;
      list-style: none;

      &__item {
        display: flex;
        justify-content: flex-start;

        &__date {
          flex: 0 0 150px;
        }

        &__account {
          flex: 1 1 auto;
        }

        &__name {
          flex: 1 1 auto;
        }

        &__value {
          flex: 0 0 auto;
        }
      }
    }
  }
}
</style>
