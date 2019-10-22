<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <footer>
      <div v-if="user">User: {{ user.email }}</div>
      <div v-if="!user" @click="openLogin">Login</div>
      <div v-if="user" @click="openLogout">Logout</div>
    </footer>
    <router-view />
    <div id="netlify-modal"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
const netlifyIdentity = require('netlify-identity-widget');

@Component({
  data() {
    return {
      user: null
    };
  },
  mounted() {
    netlifyIdentity.init({
      container: '#netlify-modal'
    });

    this.user = netlifyIdentity.currentUser();
    netlifyIdentity.on('login', this.logged);
    netlifyIdentity.on('logout', this.loggedOut);
  },
  methods: {
    openLogin() {
      netlifyIdentity.open();
    },
    openLogout() {
      netlifyIdentity.open();
    },
    logged(user) {
      console.log('TCL: logged -> logged');
      this.user = user;
      netlifyIdentity.close();
    },
    loggedOut() {
      console.log('TCL: loggedOut -> loggedOut');
      this.user = null;
      netlifyIdentity.close();
    }
  }
})
export default class App extends Vue {}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
