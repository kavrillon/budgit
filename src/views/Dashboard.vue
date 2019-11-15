<template>
  <main class="accounts">
    <h1 class="accounts__title">List of accounts</h1>
    <header class="accounts__resume">Total: {{ total | amount(0) }}</header>

    <div class="accounts__list">
      <account-summary
        v-for="(account, index) in accounts"
        :key="index"
        :account="account"
      />
    </div>
  </main>
</template>
<script lang="ts">
import Vue from 'vue';
import { getAccounts } from '@/services/account.service';
import { Account, Operation } from '@/@types';
import AccountSummary from '@/components/Account/Summary.vue';

export default Vue.extend({
  components: {
    AccountSummary,
  },
  data() {
    return {
      accounts: [] as Account[],
    };
  },
  computed: {
    total(): number {
      return this.accounts.reduce((total, account) => {
        return (total += account.balance);
      }, 0);
    },
  },
  async created() {
    this.accounts = await getAccounts();
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
