<template>
  <v-app>

    <v-navigation-drawer
      temporary
      right
      v-model="drawer"
      fixed
    >
      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          exact
          router
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="item.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar class="elevation-0">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
    </v-toolbar>

    <v-toolbar fixed app dark class="elevation-0">
      <v-toolbar-side-icon>
        <v-icon large>show_chart</v-icon>
      </v-toolbar-side-icon>

      <v-toolbar-title
        v-text="title"
      ></v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items
        class="hidden-xs-only"
        v-for="(item) in items"
        :key="item.title"
      >
        <v-btn exact
               flat
               :to="item.to"
        >
          <span v-text="item.title"></span>
        </v-btn>
      </v-toolbar-items>

      <v-toolbar-side-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
    </v-toolbar>

    <v-slide-y-transition mode="out-in">
      <router-view></router-view>
    </v-slide-y-transition>
  </v-app>
</template>

<script>
  import Meta from 'mixins/meta'

  export default {
    mixins: [Meta],

    data () {
      return {
        drawer: false,
        items: [
          { icon: 'show_chart', title: 'Discover', to: '/' },
          { icon: 'person', title: 'Login', to: '/login' },
          { icon: 'whatshot', title: 'Tests', to: '/tests' }
        ],
        title: 'Budg\'It'
      }
    }
  }
</script>
