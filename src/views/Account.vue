<template>
  <main class="account" v-if="account">
    <section class="account__header">
      <h1 class="account__header__title">Account: {{ account.name }}</h1>
      <figure class="account__header__balance">{{ account.balance }} €</figure>
      <figure class="account__header__update">{{ account.lastUpdate }}</figure>
    </section>
    <section class="account__history">
      <div
        class="account__history__year"
        v-for="(year, index) in account.history"
        :key="index"
      >
        <div class="account__history__year__header">
          {{ year.label }}
          {{ year.balance }}
          {{ year.incomes }}
          {{ year.outgoings }}
        </div>
        <div class="account__history__year__months">
          <div
            v-for="(month, indexOp) in year.months"
            :key="indexOp"
            class="account__history__year__months__month"
          >
            <div class="account__history__year__months__month__header">
              {{ month.label }}
              {{ month.balance }}
              {{ month.incomes }}
              {{ month.outgoings }}
            </div>
            <ul class="account__history__year__months__month__operations">
              <li
                v-for="(operation, indexOp) in month.operations"
                :key="indexOp"
                class="account__history__year__months__month__operations__item"
              >
                {{ operation.date }} - {{ operation.value }}
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
import { Account, Operation } from '@/@types';

export default Vue.extend({
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

  &__operations {
    &__list {
      margin: 0;
      padding: 0;
      list-style: none;
    }
  }
}
</style>
