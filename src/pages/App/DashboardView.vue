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
                               :chartData="dataChartDailyAccount1.data"
                               :chartOptions="dataChartDailyAccount1.options"
                ></BiAccountTile>
              </v-flex>

              <v-flex xs6 sm12 d-flex column>
                <BiAccountTile name="Epargne"
                               class="dashboard__current__accounts__content__type"
                               :amount="14942"
                               :chartData="dataChartDailyAccount2.data"
                               :chartOptions="dataChartDailyAccount2.options"
                ></BiAccountTile>
              </v-flex>
            </v-layout>
          </div>
        </v-flex>
        <v-flex xs12 sm7 md8 d-flex>
          <v-card class="headline dashboard__current__month d-flex column">
            <v-container>
              <v-layout row wrap>
                <v-flex xs12 md6 class="text-xs-center">
                  <div class="headline dashboard__current__month__title">This month:</div>
                </v-flex>
                <v-flex xs12 md6 class="text-xs-center mb-4">
                  <span class="dashboard__current__month__diff"
                        :class="{'dashboard__current__month__diff--down' : monthDiff < 0}"
                  >
                    <v-icon class="dashboard__current__month__diff__icon"
                            v-show="monthDiff > 0"
                    >trending_up</v-icon>
                    <v-icon class="dashboard__current__month__diff__icon"
                            v-show="monthDiff < 0"
                    >trending_down</v-icon>

                    <span class="dashboard__current__month__diff__amount">{{ monthDiff }} €</span>
                  </span>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="dashboard__current__month__earnings">
                    <BiChartDoughnut :data="dataChartMonthlyEarnings.data"
                                     :options="dataChartMonthlyEarnings.options"
                                     class="dashboard__current__month__earnings__chart">
                    </BiChartDoughnut>
                    <div class="dashboard__current__month__earnings__percent headline text-xs-center">
                      33%
                    </div>
                    <div class="dashboard__current__month__earnings__total subheading text-xs-center mt-3">
                      Estimated: 3.253 €
                    </div>
                  </div>
                </v-flex>
                <v-flex xs12 md6>
                  <div class="dashboard__current__month__expenses">
                    <BiChartDoughnut :data="dataChartMonthlyExpenses.data"
                                     :options="dataChartMonthlyExpenses.options"
                                     class="dashboard__current__month__expenses__chart">
                    </BiChartDoughnut>
                    <div class="dashboard__current__month__expenses__percent headline text-xs-center">
                      70%
                    </div>
                    <div class="dashboard__current__month__expenses__total subheading text-xs-center mt-3">
                      Budget: 2.759 €
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

      <BiChartLine :data="dataChartYearlyHistory.data"
                   :options="dataChartYearlyHistory.options"
                   class="dashboard__history__chart">
      </BiChartLine>
    </div>

    <div class="dashboard__details">
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <div class="dashboard__details__savings">
          </div>
        </v-flex>
        <v-flex xs12 sm4>
          <div class="dashboard__details__capacity">
          </div>
        </v-flex>
        <v-flex xs12 sm4>
          <div class="dashboard__details__categories">
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
  import BiAccountTile from "../../components/account/tile"
  import BiChartDoughnut from "../../components/chart/doughnut"
  import BiChartLine from "../../components/chart/line"
  import BiFormYearSelector from "../../components/form/year-selector"
  import BiNavigationRightBar from "../../components/navigation/rightbar"
  import DataChartDailyAccount1 from './DataChartDailyAccount1'
  import DataChartDailyAccount2 from './DataChartDailyAccount2'
  import DataChartMonthlyEarnings from './DataChartMonthlyEarnings'
  import DataChartMonthlyExpenses from './DataChartMonthlyExpenses'
  import DataChartYearlyHistory from './DataChartYearlyHistory'

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
    },
    data() {
      return {
        dataChartDailyAccount1: DataChartDailyAccount1,
        dataChartDailyAccount2: DataChartDailyAccount2,
        dataChartMonthlyEarnings: DataChartMonthlyEarnings,
        dataChartMonthlyExpenses: DataChartMonthlyExpenses,
        dataChartYearlyHistory: DataChartYearlyHistory,
        monthDiff: 494,
        activeYear: parseInt((new Date()).getFullYear()),
        availableYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
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
      selectYear: function (year) {
        this.activeYear = year
      }
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables";
  @import "DashboardView";
</style>
