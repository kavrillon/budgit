<template>
  <v-content class="dashboard">
    <BiNavigationRightBar :notifications="notifications"></BiNavigationRightBar>

    <div class="dashboard__current">
      <v-layout row wrap>
        <v-flex xs12 sm5 md4 d-flex class="dashboard__current__accounts">
          <div class="dashboard__current__accounts__content">
            <v-layout row wrap>
              <v-flex xs6 sm12 d-flex column>
                <BiAccountTile name="Courant"
                               class="dashboard__current__accounts__content__type"
                               :amount="942"
                               :chartData="chartAccountOptions"
                               :chartOptions="datasetsAccounts"
                ></BiAccountTile>
              </v-flex>

              <v-flex xs6 sm12 d-flex column>
                <BiAccountTile name="Epargne"
                               class="dashboard__current__accounts__content__type"
                               :amount="14942"
                               :chartData="chartAccountOptions"
                               :chartOptions="datasetsAccounts2"
                ></BiAccountTile>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs12 sm7 md8 d-flex>
          <v-card class="headline dashboard__current__month d-flex column">
            <v-container>
              <div class="headline dashboard__current__month__title text-xs-center mb-5">
                <span>State of month: </span>
                <span class="dashboard__current__month__title__diff">+ 494 €</span>
              </div>

              <v-layout row wrap>
                <v-flex xs12 md6>
                  <div class="dashboard__current__month__earnings">
                    <div class="dashboard__current__month__earnings__total subheading text-xs-center mb-2">
                      Estimated: 3.253 €
                    </div>
                    <BiChartDoughnut :data="doughnut2Dataset"
                                       :options="doughnut1Options"
                                       class="dashboard__current__month__earnings__chart">
                    </BiChartDoughnut>
                    <div class="dashboard__current__month__earnings__percent headline text-xs-center">
                      33%
                    </div>
                  </div>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="dashboard__current__month__expenses">
                    <div class="dashboard__current__month__expenses__total subheading text-xs-center mb-2">
                      Budget: 2.759 €
                    </div>
                    <BiChartDoughnut :data="doughnut1Dataset"
                                       :options="doughnut1Options"
                                       class="dashboard__current__month__expenses__chart">
                    </BiChartDoughnut>
                    <div class="dashboard__current__month__expenses__percent headline text-xs-center">
                      70%
                    </div>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </div>

    <div class="dashboard__history">
      <v-layout raw wrap>
        <v-flex class="dashboard__history__top text-xs-center text-sm-left" xs12 sm4>
          <div class="headline">History</div>
          <div class="subheading">Saving by month for year {{ activeYear }}</div>
        </v-flex>
        <v-flex class="dashboard__history__year text-xs-center text-sm-right mb-5" xs12 sm8>
          <BiFormYearSelector :data="availableYears"
                                 :activeYear="activeYear"
                                 v-on:formYearSelectorYearChange="selectYear"
          ></BiFormYearSelector>
        </v-flex>
      </v-layout>

      <BiChartLine :data="datasets"
                     :options="historyChartOptions"
                     class="dashboard__history__chart">
      </BiChartLine>
    </div>

    <div class="dashboard__details">
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <div class="dashboard__details__savings">
            <BiChartLine :data="datasets"
                           :options="historyChartOptions"
                           class="dashboard__details__savings__chart">
            </BiChartLine>
          </div>
        </v-flex>
        <v-flex xs12 sm4>
          <div class="dashboard__details__capacity">
            Capacité d'épargne
          </div>
        </v-flex>
        <v-flex xs12 sm4>
          <div class="dashboard__details__categories">
            <BiChartLine :data="datasets"
                           :options="historyChartOptions"
                           class="dashboard__details__categories__chart">
            </BiChartLine>
          </div>
        </v-flex>
      </v-layout>
    </div>

    <div class="dashboard__previous">
      <v-layout>
        <v-flex>
        </v-flex>
      </v-layout>
    </div>

  </v-content>
</template>

<script>
  import BiAccountTile from "../../components/account/tile";
  import BiChartDoughnut from "../../components/chart/doughnut";
  import BiChartLine from "../../components/chart/line";
  import BiFormYearSelector from "../../components/form/year-selector";
  import BiNavigationRightBar from "../../components/navigation/rightbar";

  export default {
    components: {
      BiAccountTile,
      BiChartDoughnut,
      BiChartLine,
      BiNavigationRightBar,
      BiFormYearSelector
    },
    asyncData({store, route}) {
      return store.dispatch('fetchUser', '5a7eaf51b9bb8f0deeb548a3')
    },
    computed: {
      user() {
        return this.$store.state.user
      },
      datasets: function () {
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
              data: this.earns.map((val, index) => val + this.expenses[index]),
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
      datasetsAccounts: function () {
        return {
          labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9'],
          datasets: [
            {
              label: '',
              pointRadius: 0,
              pointBorderWidth: 0,
              pointBorderColor: '#FF6384',
              backgroundColor: '#FF6384',
              borderColor: '#FF6384',
              borderWidth: 0,
              data: this.expenses.map((e) => {
                return -e
              }),
              type: 'line'
            },
          ]
        }
      },
      datasetsAccounts2: function () {
        return {
          labels: ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7', 'day8', 'day9'],
          datasets: [
            {
              label: '',
              pointRadius: 0,
              pointBorderWidth: 0,
              pointBorderColor: '#42a5f6',
              backgroundColor: '#42a5f6',
              borderColor: '#42a5f6',
              borderWidth: 0,
              data: this.earns,
              type: 'line'
            },
          ]
        }
      },
      doughnut1Dataset: function () {
        return {
          labels: [
            "% Budget",
            "Budget"
          ],
          datasets: [
            {
              data: [300, (400 - 300)],
              borderWidth: 1,
              backgroundColor: [
                "#FF6384",
                "#dddddd"
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#dddddd"
              ]
            }]
        }
      },
      doughnut2Dataset: function () {
        return {
          labels: [
            "% Budget",
            "Budget"
          ],
          datasets: [
            {
              data: [50, (150 - 50)],
              borderWidth: 1,
              backgroundColor: [
                "#4bc1c0",
                "#dddddd"
              ],
              hoverBackgroundColor: [
                "#4bc1c0",
                "#dddddd"
              ]
            }]
        }
      }
    },
    data() {
      return {
        activeYear: parseInt((new Date()).getFullYear()),
        availableYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        earns: [20, 200, 50, 90, 80, 160, 120, 110, 150],
        expenses: [-120, -240, -40, -70, -100, -130, -200, -80, -30],
        historyChartOptions: {
          //showAllTooltips: true,
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          tooltips: {
            enabled: true,
            yAlign: 'bottom',
            xAlign: 'center',
            custom: function(tooltipModel) {
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

                titleLines.forEach(function(title) {
                  innerHtml += '<tr><th>' + title + '</th></tr>';
                });
                innerHtml += '</thead><tbody>';

                bodyLines.forEach(function(body, i) {
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
            }
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
        },
        chartAccountOptions: {
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
        },
        doughnut1Options: {
          showAllTooltips: true,
          cutoutPercentage: 60,
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
        },
        notifications: [
          {
            name: 'Achat 1',
            account: 'Banq 1',
            amount: '-10 €'
          },
          {
            name: 'Achat 2',
            account: 'Livret A',
            amount: '+100 €'
          },
          {
            name: 'Achat 3 - ver veryyyy veryyyyyy long',
            account: 'Banq 2',
            amount: '+100 €'
          },
        ]
      }
    },
    methods: {
      selectYear: function(year) {
        this.activeYear = year
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables";
  @import "DashboardView";

  .theme--dark .toolbar, .application .theme--dark.toolbar {
    background: $dark-2;
  }

</style>
