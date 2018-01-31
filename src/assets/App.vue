<template>
  <v-app>
    <NavigationTopbar></NavigationTopbar>

    <v-slide-y-transition mode="out-in">
      <router-view></router-view>
    </v-slide-y-transition>

  <Footer></Footer>
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
