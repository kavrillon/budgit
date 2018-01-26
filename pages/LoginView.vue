<template>
  <v-content>
    <v-container>
      <v-layout column align-center class="mt-4">
        <v-flex xs12 class="card-container">
          <div class="text-xs-center">
            <img src="/static/v.png" alt="Vuetify.js" class="mb-4" />
          </div>
          <v-card>
            <v-card-text>
              <v-layout row wrap align-center>
                <v-flex xs12 sm4>
                  <label for="input-login-email">Email</label>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    name="input-login-email"
                    id="input-login-email"
                    required
                    label="toto.cutugno@gmail.com"
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap align-center>
                <v-flex xs12 sm4>
                  <label for="input-login-password">Password</label>
                </v-flex>
                <v-flex xs12 sm8>
                  <v-text-field
                    name="input-login-password"
                    id="input-login-password"
                    label="Enter your password"
                    required
                    :rules="[() => 1== 1 ? true : 'Username or Password is incorrect.']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>

            <v-card-actions>
              <v-btn flat router to="/">Back</v-btn>
              <v-spacer></v-spacer>
              <v-btn flat color="info" router to="/app">Continue</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<style>
  .card-container {
    width: 100%;
  }
  @media(min-width: 400px) {
    .card-container {
      width: 400px;
    }
  }
</style>
