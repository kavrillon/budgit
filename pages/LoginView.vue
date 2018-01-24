<template>
  <v-content>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8>
        <div class="text-xs-center">
          <img src="/static/v.png" alt="Vuetify.js" class="mb-4" />
        </div>
        <v-card>
          <v-card-text>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Normal with hint text</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  name="input-1-3"
                  label="Hint Text"
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs4>
                <v-subheader>Error</v-subheader>
              </v-flex>
              <v-flex xs8>
                <v-text-field
                  name="input-3-5"
                  label="Hint Text"
                  value="Input text"
                  :rules="[() => 'Username or Password is incorrect.']"
                  error
                  single-line
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" flat router to="/inspire">Continue</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-content>
</template>
