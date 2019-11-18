<template>
  <main class="account" v-if="account !== null">
    <section class="account__header">
      <h1 class="account__header__title">Account: {{ account.name }}</h1>
      <account-summary :account="account" />
    </section>
    <section class="account__history">
      <h2 class="account__header__title">History</h2>
      <div
        class="account__history__year"
        v-for="(year, index) in account.history"
        :key="index"
      >
        <div class="account__history__year__header">
          <div class="account__history__year__header__label">
            {{ year.label }}
          </div>
          <div class="account__history__year__header__balance">
            Balance: {{ year.balance | amount(0) }}
          </div>
          <div class="account__history__year__header__incomes">
            Incomes: {{ year.incomes | amount(0) }}
          </div>
          <div class="account__history__year__header__outgoings">
            Outgoings: {{ year.outgoings | amount(0) }}
          </div>
        </div>
        <div class="account__history__year__months">
          <div
            v-for="(month, indexOp) in year.months"
            :key="indexOp"
            class="account__history__year__months__month"
          >
            <div class="account__history__year__months__month__header">
              <div class="account__history__year__months__month__header__label">
                {{ month.label }}
              </div>
              <div
                class="account__history__year__months__month__header__balance"
              >
                Balance: {{ month.balance | amount(0) }}
              </div>
              <div
                class="account__history__year__months__month__header__incomes"
              >
                Incomes: {{ month.incomes | amount(0) }}
              </div>
              <div
                class="account__history__year__months__month__header__outgoings"
              >
                Outgoings: {{ month.outgoings | amount(0) }}
              </div>
            </div>
            <ul class="account__history__year__months__month__operations">
              <li
                v-for="(operation, indexOp) in month.operations"
                :key="indexOp"
                class="account__history__year__months__month__operations__item"
              >
                <div
                  class="account__history__year__months__month__operations__item__date"
                >
                  {{ operation.date }}
                </div>
                <div
                  class="account__history__year__months__month__operations__item__name"
                >
                  {{ operation.name }}
                </div>
                <div
                  class="account__history__year__months__month__operations__item__amount"
                >
                  {{ operation.value | amount(2, true) }}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<script lang="ts">
import Vue from 'vue';
import { getAccount } from '@/services/account.service';
import AccountSummary from '@/components/Account/Summary.vue';
import { Account, Operation } from '@/@types';

export default Vue.extend({
  components: {
    AccountSummary,
  },
  data() {
    return {
      account: null as Account | null,
      error: '',
    };
  },
  async created() {
    this.account = await getAccount(parseInt(this.$route.params.number));
  },
});
</script>
<style lang="scss" scoped>
.account {
  padding: $gutter-size;

  &__header {
    &__title {
      @include title;

      margin: 0 0 $gutter-size;
      padding: 0;
    }
  }

  &__history {
    &__year {
      &__header {
        @include subtitle;

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
}
</style>
