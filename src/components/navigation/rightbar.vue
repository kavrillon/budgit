<template>
  <v-navigation-drawer app right>
    <v-toolbar flat dark>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            Notifications
          </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-toolbar>

    <v-list two-line class="pt-0" v-for="i in [0, 1, 2, 3]" :key="i">
      <v-list-tile v-for="notif in notifications" :key="notif.name" @click="">
        <v-list-tile-content>
          <v-list-tile-title>{{ notif.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ notif.account }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          {{ notif.amount }}
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'BiNavigationRightbar',
    props: {
      notifications: {
        type: Array,
        required: true,
      },
    }
  }
</script>
