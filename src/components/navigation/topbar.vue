<template>
  <div>
    <v-navigation-drawer temporary
                         clipped
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

    <v-toolbar dark flat>
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
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
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
    name: 'BiNavigationTopbar',
    props: ['user'],
    data() {
      let data = {
        drawer: false,
        menuApp: [],
        menuHome: [
          {icon: 'person', title: 'Login', to: '/login'}
        ],
        title: 'Budg\'It'
      }
      if (this.user) data.menuApp.push({icon: 'person', title: this.username, to: '/app/accounts'})
      return data
    },
    computed: {
      username() {
        if (this.user) {
          return `${this.user.firstname} ${this.user.lastname}`
        } else {
          return ''
        }
      },
      links() {
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
      isHiddenOnMobile() {
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

<style lang="scss" scoped>
  @import "../../assets/variables";

  .theme--dark .toolbar, .application .theme--dark.toolbar {
    background: $dark-1;
  }
</style>
