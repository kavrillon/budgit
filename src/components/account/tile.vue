<template>
  <v-card class="account-tile d-flex">
    <v-container>
      <v-layout row wrap class="account-tile__content">
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
    </v-container>
  </v-card>
</template>

<script>
  import BiChartLine from "../../components/chart/line";

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
    }
  }
</script>

<style lang="scss" scoped>
  @import './tile';
</style>
