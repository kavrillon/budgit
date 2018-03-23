<template>
  <v-card class="account-tile">
    <v-card-title class="account-tile__content d-flex">
      <v-layout row wrap>
        <v-flex xs6 sm12 class="account-tile__content__title">
          {{ name }}
        </v-flex>
        <v-flex xs6 sm12 md7 class="account-tile__content__amount">
          <div class="account-tile__content__amount__value">{{ amount }} €</div>
        </v-flex>
        <v-flex xs12 md5 class="account-tile__content__chart">
          <bi-chart-line
            :chart-data="chartData"
            :options="chartOptions"
            class="account-tile__content__chart__item">
          </bi-chart-line>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-actions class="account-tile__footer">
      <div class="account-tile__footer__text">
        Last synchro: {{ formatDate(lastSynchro) }}
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
  import BiChartLine from "../../components/chart/line";
  import {utc} from "moment";

  export default {
    name: 'BiAccountTile',
    components: {
      BiChartLine,
    },
    props: {
      name: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      lastSynchro: {
        type: Date,
        required: true,
      },
      chartData: {
        type: Object,
        required: true,
      },
    },
    computed: {
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              display: false,
            }],
            yAxes: [{
              display: false,
            }],
          },
          tooltips: {
            enabled: false,
          }
        }
      }
    },
    methods: {
      formatDate: function(date) {
        return utc(date).format('L');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import './tile';
</style>
