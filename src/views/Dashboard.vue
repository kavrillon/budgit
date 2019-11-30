<template>
  <main class="dashboard" v-if="board !== null">
    <h1 class="dashboard__title">List of accounts</h1>
    <header class="dashboard__resume">
      <div class="dashboard__resume__line">
        Total: {{ board.total | amount(0) }}
      </div>
    </header>

    <div class="dashboard__list">
      <account-summary
        v-for="(account, index) in board.accounts"
        :key="index"
        :account="account"
      />
    </div>
    <section class="dashboard__history">
      <h2 class="dashboard__history__title">Savings</h2>
      <figure>{{ savingsTotal | amount(0) }}</figure>
    </section>

    <section class="dashboard__history">
      <h2 class="dashboard__history__title">History</h2>
      <div
        class="dashboard__history__year"
        v-for="(year, index) in board.history.years"
        :key="index"
      >
        <div class="dashboard__history__year__header">
          <div class="dashboard__history__year__header__label">
            {{ year.label }}
          </div>
          <div class="dashboard__history__year__header__start">
            Start total: {{ year.totalStart | amount(0) }}
          </div>
          <div class="dashboard__history__year__header__end">
            End total: {{ year.totalEnd | amount(0) }}
          </div>
          <div class="dashboard__history__year__header__balance">
            Balance: {{ year.balance | amount(0) }}
          </div>
          <div class="dashboard__history__year__header__incomes">
            Incomes: {{ year.incomes | amount(0) }}
          </div>
          <div class="dashboard__history__year__header__outgoings">
            Outgoings: {{ year.outgoings | amount(0) }}
          </div>
        </div>
        <div class="dashboard__history__year__months">
          <div
            v-for="(month, indexOp) in year.months"
            :key="indexOp"
            class="dashboard__history__year__months__month"
          >
            <div class="dashboard__history__year__months__month__header">
              <div
                class="dashboard__history__year__months__month__header__label"
              >
                {{ month.label }}
              </div>
              <div
                class="dashboard__history__year__months__month__header__balance"
              >
                Balance: {{ month.balance | amount(0) }}
              </div>
              <div
                class="dashboard__history__year__months__month__header__incomes"
              >
                Incomes: {{ month.incomes | amount(0) }}
              </div>
              <div
                class="dashboard__history__year__months__month__header__outgoings"
              >
                Outgoings: {{ month.outgoings | amount(0) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="dashboard__operations">
      <h2 class="dashboard__operations__title">Operations this month</h2>
      <ul class="dashboard__operations__list">
        <li
          v-for="(operation, index) in board.lastOperations"
          :key="index"
          class="dashboard__operations__list__item"
        >
          <div class="dashboard__operations__list__item__date">
            {{ operation.date }}
          </div>
          <div class="dashboard__operations__list__item__account">
            {{ operation.accountName }}
          </div>
          <div class="dashboard__operations__list__item__name">
            {{ operation.name }}
          </div>
          <div class="dashboard__operations__list__item__value">
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
  computed: {
    savingsTotal(): number {
      if (this.board !== null) {
        return this.board.accounts.reduce((total, account) => {
          return total + (account.savings ? account.total : 0);
        }, 0);
      }
      return 0;
    },
  },
  async created() {
    this.board = await getBoard(1);
  },
});
</script>
<style lang="scss" scoped>
.dashboard {
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

  &__history {
    &__title {
      @include title;
    }

    &__year {
      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 0 $gutter-size;
      }

      &__months {
        margin: 0 0 $gutter-size;

        &__month {
          margin: 0 0 $gutter-size;
          background: $color-bg-alt;
          padding: $gutter-size;

          &__header {
            @include heading;

            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0 0 $gutter-size;
          }

          &__operations {
            margin: 0;
            padding: 0;
            list-style: none;

            &__item {
              display: flex;

              &__date {
                flex: 0 0 150px;
              }

              &__name {
                flex: 1 1 auto;
              }

              &__amount {
                flex: 0 0 auto;
              }
            }
          }
        }
      }
    }
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
