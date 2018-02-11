<template>
  <v-app>
    <bi-navigation-topbar></bi-navigation-topbar>

    <v-slide-y-transition mode="out-in">
      <router-view></router-view>
    </v-slide-y-transition>

    <bi-footer></bi-footer>
  </v-app>
</template>

<script>
  import Meta from 'assets/meta'

  export default {
    mixins: [Meta],
    data () {
      return {
        title: 'Budg\'It'
      }
    }
  }
</script>
