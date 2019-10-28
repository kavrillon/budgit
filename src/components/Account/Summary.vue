<template>
  <section class="account-summary">
    <figure class="account-summary__balance">{{ account.balance }} €</figure>
    <h2 class="account-summary__name">
      {{ account.name }}
    </h2>
    <footer class="account-summary__footer">
      {{ formattedLastUpdated }}
    </footer>
  </section>
</template>
<script lang="ts">
import Vue from 'vue';
import { Account } from '@/@types';

export default Vue.extend({
  props: {
    account: {
      type: Object as () => Account,
      required: true
    }
  },
  computed: {
    formattedLastUpdated() {
      return new Intl.DateTimeFormat('fr-FR').format(this.account.lastUpdate);
    }
  }
});
</script>
