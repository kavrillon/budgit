<template>
  <div class="account-history">
    <bi-chart-line
      :chart-data="chartData"
      :options="chartOptions"
      class="dashboard__history__chart">
    </bi-chart-line>
  </div>
</template>

<script>
  import BiChartLine from "../../components/chart/line";

  export default {
    name: 'BiAccountHistory',
    components: {
      BiChartLine,
    },
    props: {
      data: {
        type: Array,
        required: true,
      },
    },
    computed: {
      chartData() {
        return {
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
          datasets: [
            {
              label: '',
              pointRadius: 4,
              pointBorderWidth: 2,
              pointBorderColor: '#ffffff',
              backgroundColor: '#42a5f6',
              borderColor: '#42a5f6',
              borderWidth: 1,
              data: this.data,
              type: 'line',
              //lineTension: 0
            },
            /*{
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
            }*/
          ],
        }
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          layout:  {
            padding: {
              top: 0,
              left: 30,
              right: 30,
              bottom: 15
            }
          },
          animation: {
            duration: 1000,
            onComplete: function() {
              var chartInstance = this.chart,
                ctx = chartInstance.ctx;

              ctx.font = Chart.helpers.fontString(
                14,
                'bold',
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';
              ctx.fillStyle = 'white'

              this.data.datasets.forEach(function(dataset, i) {
                var meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function(bar, index) {
                  var data = dataset.data[index] + ' €';
                  if (dataset.data[index] > 0) {
                    data = '+' + data;
                  }
                  ctx.fillText(data, bar._model.x, chartInstance.height);
                });
              });
            }
          },
          legend: {
            display: false,
          },
          tooltips: {
            backgroundColor: 'transparent',
            bodyFontStyle: 'bold',
            caretSize: 0,
            cornerRadius: 0,
            displayColors: false,
            enabled: false,
            xAlign: 'center',
            yAlign: 'bottom',
            callbacks: {
              title: () => {
                return ''
              },
              label: (tooltipItem, data) => {
                var label = data.datasets[tooltipItem.datasetIndex].label || '';

                if (parseInt(tooltipItem.yLabel) > 0) {
                  label += `${tooltipItem.xLabel}: +${tooltipItem.yLabel} €`;
                } else {
                  label += `${tooltipItem.xLabel}: ${tooltipItem.yLabel} €`;
                }
                return label;
              }
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
                color: '#42a5f6'
              },
              ticks: {
                fontColor: "white",
              }
            }],
            yAxes: [{
              stacked: false,
              ticks: {
                display: false,
              },
              gridLines: {
                display: false,
                color: '#1e88e5',
                zeroLineColor: '#42a5f6',
                zeroLineBorderDash: [5, 5],
              }
            }],
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'history';
</style>
