<template>
  <v-content>

    <v-container>
      <v-layout>
      <v-flex xs12 sm6>
        <bi-chart-bar :data="datasets"
                  :options="chartOptions"
                  class="chart-bar">
        </bi-chart-bar>
      </v-flex>
      <v-flex xs12 sm6>
      </v-flex>
      </v-layout>
    </v-container>

  </v-content>
</template>

<script>
  export default {
    asyncData ({ store, route }) {
      return store.dispatch('fetchUser', '5a7eaf51b9bb8f0deeb548a3')
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      datasets: function () {
        return {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'September', 'October', 'November', 'December'],
          datasets: [
            {
              label: 'Diff',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: '#75a3f8',
              borderWidth: 3,
              data: this.earns.map((val, index) => val + this.expenses[index]),
              type: 'line'
            },
            {
              label: 'Earnings',
              backgroundColor: '#8af89d',
              borderWidth: 0,
              data: this.earns
            },
            {
              label: 'Expenses',
              backgroundColor: '#f87979',
              borderWidth: 0,
              data: this.expenses
            }
          ]
        }
      }
    },
    data () {
      return {
        earns: [20, 200, 50, 90, 80, 160, 120, 110, 150],
        expenses: [-120, -240, -40, -70, -100, -130, -200, -80, -30],
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              stacked: true,
            }],
            yAxes: [{
              stacked: true
            }]
          }
        }
      }
    },
    created: function() {
    },
    methods: {
    }
  }
</script>

<style>
  .chart-bar {
    height: 200px;
  }
</style>
