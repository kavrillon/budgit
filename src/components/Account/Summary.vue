<template>
  <router-link
    :to="{ name: 'account', params: { number: account.number } }"
    class="account-summary"
  >
    <h2 class="account-summary__name">
      {{ account.name }}
    </h2>

    <figure class="account-summary__balance">
      {{ account.total | amount(0) }}
    </figure>

    <figure class="account-summary__start">
      {{ account.startTotal | amount(0) }}
    </figure>

    <footer class="account-summary__footer">
      {{ account.startDate }} to {{ account.lastUpdate }}
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
  @include link-reset;

  display: flex;
  background: $color-bg-alt;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: $gutter-size 0;
  padding: $gutter-size;
  cursor: pointer;

  &__balance {
    @include title;

    margin: $gutter-size-small 0 0;
  }

  &__start {
    margin-bottom: $gutter-size-small;
  }
}
</style>
