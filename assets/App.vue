<template>
  <v-app>
    <NavigationTopbar></NavigationTopbar>

    <v-slide-y-transition mode="out-in">
      <router-view></router-view>
    </v-slide-y-transition>

    <v-footer dark class="white--text">
      <v-layout row>
        <v-flex xs6 class="text-xs-left">
          <div class="ml-3">
            Made with
            <v-icon class="red--text">favorite</v-icon>
          </div>
        </v-flex>
        <v-flex xs6 class="text-xs-right">
          <div class="mr-3">
            <router-link
              :to="item.to"
              :key="item.to"
              v-for="(item) in menuFooter">
              <v-icon color="white" v-text="item.icon"></v-icon>
            </router-link>
          </div>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import Meta from 'mixins/meta'

  export default {
    mixins: [Meta],

    data () {
      return {
        menuFooter: [
          { icon: 'whatshot', title: 'Tests', to: '/tests' }
        ],
        title: 'Budg\'It'
      }
    }
  }
</script>
