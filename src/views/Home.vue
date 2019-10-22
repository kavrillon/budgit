<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div id="netlify-modal"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const netlifyIdentity = require('netlify-identity-widget');

@Component({
  components: {},
  mounted() {
    netlifyIdentity.init({
      container: '#netlify-modal'
    });
    netlifyIdentity.open();
  }
})
export default class Home extends Vue {}
</script>
