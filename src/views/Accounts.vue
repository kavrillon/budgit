<template>
  <main class="accounts">
    <h1 class="accounts__title">List of accounts</h1>
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
import AccountSummary from '@/components/Account/Summary.vue';
import Vue from 'vue';
import { getAccounts } from '@/services/account.service';
import { Account, Operation } from '@/@types';

export default Vue.extend({
  components: {
    AccountSummary,
  },
  async created() {
    this.accounts = await getAccounts();
  },
  data() {
    return {
      accounts: [] as Account[],
    };
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
}
</style>
