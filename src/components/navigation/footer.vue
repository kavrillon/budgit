<template>
  <v-footer dark class="white--text">
    <v-layout row>
      <v-flex xs10 class="text-xs-left">
        <div class="ml-3">
          Made with
          <v-icon class="red--text">favorite</v-icon>
          by
          <a href="https://github.com/kavrillon/budgit" class="white--text">
            Kevin Avrillon
          </a>
        </div>
      </v-flex>
      <v-flex xs2 class="text-xs-right">
        <div class="mr-3">
          <router-link
            to="/tests"
            class="ml-3">
            <v-icon color="white">whatshot</v-icon>
          </router-link>
        </div>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
  export default {
    name: 'bi-footer'
  }
</script>
