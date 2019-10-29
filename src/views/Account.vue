<template>
  <main class="account" v-if="account">
    <section class="account__header">
      <h1 class="accounts__header__title">Account: {{ account.name }}</h1>
      <figure class="accounts__header__balance">{{ account.balance }} €</figure>
    </section>
    <section class="accounts__operations">
      <header class="accounts__operations__head">
        Operations: {{ account.operations.length }}
      </header>
      <ul class="accounts__operations__list">
        <li
          v-for="(op, index) in account.operations"
          :key="index"
          class="accounts__operations__list__item"
        >
          {{ op.date }} - {{ op.name }}: {{ op.value }}
        </li>
      </ul>
    </section>
  </main>
</template>
<script lang="ts">
import Vue from "vue";
import { getAccount } from "@/services/account.service";
import { Account } from "@/@types";

export default Vue.extend({
  data() {
    return {
      account: null as Account | null,
      error: ""
    };
  },
  async created() {
    this.account = await getAccount(parseInt(this.$route.params.number));
  }
});
</script>
