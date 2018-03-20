<template>
  <v-layout column class="account-percent">
    <div class="account-percent__infos">
      <div class="account-percent__infos__title">
        {{ title }}
      </div>
      <div class="account-percent__infos__value">
        {{ value }} €
      </div>
    </div>

    <bi-chart-label-doughnut
      :data="chartData"
      :options="chartOptions"
      :chart-height="chartHeight"
      :title="parseInt(percent) + ' %'"
      :subtitle="'of '+ total + ' €'"
      class="account-percent__chart"
    ></bi-chart-label-doughnut>
  </v-layout>
</template>

<script>
  import BiChartLabelDoughnut from "../../components/chart/label-doughnut";

  export default {
    name: 'BiAccountPercent',
    components: {
      BiChartLabelDoughnut,
    },
    props: {
      chartHeight: {
        type: Number,
      },
      title: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      chartColor: {
        type: String,
        default: '#000'
      }
    },
    computed: {
      percent() {
        return this.value * 100 / this.total
      },
      chartData() {
        return {
          datasets: [
            {
              data: [this.value, (this.total - this.value)],
              borderWidth: 1,
              backgroundColor: [
                this.chartColor,
                "#eee"
              ],
              hoverBackgroundColor: [
                this.chartColor,
                "#eee"
              ]
            }]
        }
      },
      chartOptions() {
        return {
          showAllTooltips: true,
          cutoutPercentage: 85,
          title: {
            display: false,
          },
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            enabled: false,
            backgroundColor: 'transparent',
            titleFontSize: 16,
            titleFontColor: '#0066ff',
            bodyFontColor: '#000',
            bodyFontSize: 14,
            displayColors: false,
          },
          legend: {
            display: false,
          },
          rotation: 1 * Math.PI,
          circumference: 1 * Math.PI
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import './percent';
</style>
