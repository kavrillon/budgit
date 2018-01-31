<template>
  <v-content>
    <v-container>
      <v-layout column justify-center align-center>
        <v-flex xs12 sm8>
          <div class="text-xs-center mb-5">
            <div>List des users:</div>
            <ul>
              <li v-for="u in users" v-text="u.firstname"></li>
            </ul>
          </div>
          <div class="text-xs-center mb-5">
            <div>User {{ userId }} email: {{ userEmail }}</div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    data () {
      return {
        users: [],
        userId: '5a6f93264e7161d1c1e9748a',
        userEmail: ''
      }
    },
    created: function()
    {
      this.fetchItems()
    },
    methods: {
      fetchItems()
      {
        const uri = 'http://localhost:8080/api/users'

        this.axios.get(uri).then((response) => {
          this.users = response.data
        })

        this.axios.get(`${uri}/5a6f93264e7161d1c1e9748a`).then((response) => {
          this.userEmail = response.data.email
        })
      }
    }
  }
</script>
