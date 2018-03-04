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
          labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'SEP', 'OCT', 'NOV', 'DEC'],
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
          //showAllTooltips: true,
          responsive: true,
          maintainAspectRatio: false,
          layout:  {
            padding: {
              top: 5,
              bottom: 5
            }
          },
          legend: {
            display: false,
          },
          tooltips: {
            /*enabled: true,
            yAlign: 'bottom',
            xAlign: 'center',
            custom: function (tooltipModel) {
              var tooltipEl = document.getElementById('chartjs-tooltip');
              console.log(tooltipEl)
              // Create element on first render
              if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.innerHTML = "<table></table>"
                document.body.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              if (tooltipModel.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
              }

              // Set caret Position
              tooltipEl.classList.remove('above', 'below', 'no-transform');
              if (tooltipModel.yAlign) {
                tooltipEl.classList.add(tooltipModel.yAlign);
              } else {
                tooltipEl.classList.add('no-transform');
              }

              function getBody(bodyItem) {
                return bodyItem.lines;
              }

              // Set Text
              if (tooltipModel.body) {
                var titleLines = tooltipModel.title || [];
                var bodyLines = tooltipModel.body.map(getBody);

                var innerHtml = '<thead>';

                titleLines.forEach(function (title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';

                bodyLines.forEach(function (body, i) {
                  var colors = tooltipModel.labelColors[i];
                  var style = 'background:' + colors.backgroundColor;
                  style += '; border-color:' + colors.borderColor;
                  style += '; border-width: 2px';
                  var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                  innerHtml += '<tr><td>' + span + body + '</td></tr>';
                });
                innerHtml += '</tbody>';

                var tableRoot = tooltipEl.querySelector('table');
                tableRoot.innerHTML = innerHtml;
              }

              // `this` will be the overall tooltip
              var position = this._chart.canvas.getBoundingClientRect();

              // Display, position, and set styles for font
              tooltipEl.style.opacity = 1;
              tooltipEl.style.left = position.left + tooltipModel.caretX + 'px';
              tooltipEl.style.top = position.top + tooltipModel.caretY + 'px';
              tooltipEl.style.fontFamily = tooltipModel._fontFamily;
              tooltipEl.style.fontSize = tooltipModel.fontSize;
              tooltipEl.style.fontStyle = tooltipModel._fontStyle;
              tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            }*/
          },
          scales: {
            xAxes: [{
              stacked: false,
              gridLines: {
                display: false,
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
                display: true,
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
