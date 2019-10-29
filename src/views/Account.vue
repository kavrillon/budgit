<template>
  <section class="account" v-if="account">
    <h1 class="accounts__title">Account: {{ account.name }}</h1>
    <figure class="accounts__balance">{{ account.balance }} €</figure>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import { getAccount } from '@/services/account.service';
import { Account } from '@/@types';

export default Vue.extend({
  data() {
    return {
      account: null as Account | null,
      error: ''
    };
  },
  async created() {
    this.account = await getAccount(parseInt(this.$route.params.number));
  }
});
</script>
