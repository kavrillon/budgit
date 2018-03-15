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
          layout: {
            padding: {
              top: 15,
              left: 30,
              right: 30,
              bottom: 45
            }
          },
          hover: {
            animationDuration: 1
          },
          animation: {
            duration: 1000,
            onComplete: function () {
              const chartInstance = this.chart;
              const rotation = this.chart.scales['x-axis-0'].labelRotation;
              let ctx = chartInstance.ctx;

              const font = Chart.helpers.fontString(
                'bold',
                Chart.defaults.global.defaultFontFamily
              );
              ctx.textAlign = 'center';
              ctx.textBaseline = 'bottom';

              this.data.datasets.forEach(function (dataset, i) {
                const meta = chartInstance.controller.getDatasetMeta(i);
                meta.data.forEach(function (bar, index) {
                  let data = dataset.data[index] + ' €';
                  if (dataset.data[index] > 0) {
                    data = '+' + data;
                  }
                  drawString(ctx, data, bar._model.x, chartInstance.height - 30, 'white', -rotation, font, 14);
                });
              });
            },
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

  function drawString(ctx, text, posX, posY, textColor, rotation, font, fontSize) {
    var lines = text.split("\n");
    if (!rotation) rotation = 0;
    if (!font) font = "'serif'";
    if (!fontSize) fontSize = 16;
    if (!textColor) textColor = '#ffffff';
    ctx.save();
    ctx.font = fontSize + "px " + font;
    ctx.fillStyle = textColor;
    ctx.translate(posX, posY);
    ctx.rotate(rotation * Math.PI / 180);
    for (var i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], 0, i * fontSize);
    }
    ctx.restore();
  }
</script>

<style lang="scss" scoped>
  @import 'history';
</style>
