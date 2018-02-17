<template>
  <v-app>
    <BiNavigationTopbar></BiNavigationTopbar>

    <v-slide-y-transition mode="out-in">
      <router-view></router-view>
    </v-slide-y-transition>

  </v-app>
</template>

<script>
  import Meta from 'assets/meta'
  import BiNavigationTopbar from '../components/navigation/topbar'

  export default {
    mixins: [Meta],
    components: {
      BiNavigationTopbar
    },
    data() {
      return {
        title: 'Budg\'It'
      }
    }
  }
</script>

<style lang="scss">
  @import '../assets/app.scss';
</style>
