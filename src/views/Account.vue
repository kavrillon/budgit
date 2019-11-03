<template>
  <main v-if="account" class="account">
    <section class="account__header">
      <h1 class="account__header__title">Account: {{ account.name }}</h1>
      <figure class="account__header__balance">{{ account.balance }} €</figure>
    </section>
    <section class="account__operations">
      <header class="account__operations__head">
        Operations: {{ account.operations.length }}
      </header>
      {{ years.length }}
      <ul class="account__operations__list">
        <li
          v-for="(op, index) in account.operations"
          :key="index"
          class="account__operations__list__item"
        >
          {{ op.date }} - {{ op.name }}: {{ op.value }}
        </li>
      </ul>
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
  computed: {
    years(): string[] {
      if (this.account !== null) {
        return this.account.operations.reduce(
          (acc: string[], item: Operation) => {
            const year = item.date.split('/')[2];
            if (acc.indexOf(year) === -1) {
              acc.push(year);
            }
            return acc;
          },
          []
        );
      }
      return [];
    },
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
