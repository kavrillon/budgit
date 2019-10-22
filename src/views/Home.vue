<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    <div id="netlify-modal">netlify-modal</div>
    <div data-netlify-identity-menu></div>

    <!-- Add a simpler button:
    Simple button that will open the modal.
  -->
    <div data-netlify-identity-button>Login with Netlify Identity</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
// import { authWithGitHub } from '@/services/github.service';
// import netlifyIdentity from 'netlify-identity-widget';
import GoTrue from 'gotrue-js';

@Component({
  components: {
    HelloWorld
  },
  created() {
    // Instantiate the GoTrue auth client with an optional configuration
    const auth = new GoTrue({
      APIUrl: 'https://budgit.avrillon.me/.netlify/identity',
      audience: '',
      setCookie: false
    });
    auth
      .login('kevin@avrillon.me', 'test')
      .then(response => {
        console.log('Success! Response: ' + JSON.stringify({ response }));
      })
      .catch(error => console.log('Failed :( ' + JSON.stringify(error)));

    // netlifyIdentity.init();
    // netlifyIdentity.open();
    /*
    authWithGitHub()
      .then(res => {
        console.log('ok', res);
      })
      .catch(err => {
        console.log('nok', err);
      });
      */
  }
})
export default class Home extends Vue {}
</script>
