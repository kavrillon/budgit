<template>
  <router-link
    :to="{ name: 'account', params: { number: account.number } }"
    class="account-summary"
  >
    <figure class="account-summary__balance">{{ account.balance }} €</figure>
    <h2 class="account-summary__name">
      {{ account.name }}
    </h2>
    <footer class="account-summary__footer">
      {{ account.lastUpdated }}
    </footer>
  </router-link>
</template>
<script lang="ts">
import Vue from 'vue';
import { Account } from '@/@types';

export default Vue.extend({
  props: {
    account: {
      type: Object as () => Account,
      required: true,
    },
  },
});
</script>
<style lang="scss" scoped>
.account-summary {
  @include link;
}
</style>
