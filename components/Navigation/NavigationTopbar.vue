<template>
  <div>
    <v-navigation-drawer temporary
                         right
                         v-if="isHiddenOnMobile && links.length > 0"
                         v-model="drawer"
                         fixed>
      <v-list>
        <v-list-tile v-for="(item, i) in links"
                     :key="i"
                     :to="item.to"
                     exact
                     router>
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar app dark class="elevation-0">
      <v-toolbar-items class="ml-0">
        <v-btn flat
               data-ripple="false"
               active-class=""
               class="title"
               to="/">
          <v-icon class="display-2" left>
            show_chart
          </v-icon>
          {{ title }}
        </v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>

      <v-toolbar-items v-for="(item) in links"
                       class="mr-0"
                       :class="{ 'hidden-xs-only': isHiddenOnMobile }"
                       :key="item.title">
        <v-btn exact
               flat
               :to="item.to">
          <v-icon left>{{ item.icon }}</v-icon>{{ item.title }}
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-side-icon class="hidden-sm-and-up mr-2"
                           v-if="isHiddenOnMobile && links.length > 0"
                           @click.stop="drawer = !drawer">
      </v-toolbar-side-icon>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    name: 'NavigationTopbar',
    data () {
      return {
        drawer: false,
        menuApp: [
          { icon: 'show_chart', title: 'Dashboard', to: '/app' },
          { icon: 'storage', title: 'My Accounts', to: '/app/accounts' },
        ],
        menuHome: [
          { icon: 'person', title: 'Login', to: '/login' }
        ],
        title: 'Budg\'It'
      }
    },
    computed: {
      links () {
        switch (this.$route.path) {
          case '/':
            return this.menuHome
          case '/login':
            return []
            break
          default:
            return this.menuApp
        }
      },
      isHiddenOnMobile () {
        switch (this.$route.path) {
          case '/':
            return false
            break
          default:
            return true
        }
      }
    }
  }
</script>
