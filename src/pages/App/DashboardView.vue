<template>
  <v-content class="dashboard">

    <BiNavigationRightBar :notifications="notifications"></BiNavigationRightBar>

    <v-layout row wrap class="dashboard__current">
      <v-flex xs12 sm5 md4 d-flex class="dashboard__current__accounts">
        <div class="dashboard__current__accounts__content">
          <v-layout row wrap>
            <v-flex xs6 sm12 d-flex column>

              <BiAccountTile name="Courant"
                             class="dashboard__current__accounts__content__type"
                             :amount="942"
                             :chartData="dataChartLineCurrentAccount1.data"
                             :chartOptions="dataChartLineCurrentAccount1.options"
              ></BiAccountTile>

            </v-flex>
            <v-flex xs6 sm12 d-flex column>

              <BiAccountTile name="Epargne"
                             class="dashboard__current__accounts__content__type"
                             :amount="14942"
                             :chartData="dataChartLineCurrentAccount2.data"
                             :chartOptions="dataChartLineCurrentAccount2.options"
              ></BiAccountTile>

            </v-flex>
          </v-layout>
        </div>
      </v-flex>
      <v-flex xs12 sm7 md8 d-flex>
        <v-card class="dashboard__current__month d-flex column">
          <v-container>
            <v-layout row wrap>
              <v-flex xs12 md6 class="text-xs-center">
                <div class="headline dashboard__current__month__title">This month:</div>
              </v-flex>
              <v-flex xs12 md6 class="text-xs-center mb-4">
                  <span class="dashboard__current__month__diff"
                        :class="{'dashboard__current__month__diff--down' : monthDiff < 0}">
                    <v-icon class="dashboard__current__month__diff__icon" v-show="monthDiff > 0">trending_up</v-icon>
                    <v-icon class="dashboard__current__month__diff__icon" v-show="monthDiff < 0">trending_down</v-icon>
                    <span class="dashboard__current__month__diff__amount">{{ monthDiff }} €</span>
                  </span>
              </v-flex>
              <v-flex xs12 md6>
                <div class="dashboard__current__month__earnings">

                  <BiChartLabelDoughnut :data="dataChartDoughnutCurrentEarnings.data"
                                        :options="dataChartDoughnutCurrentEarnings.options"
                                        :chartHeight="80"
                                        title="33%"
                                        subtitle="of 3.253 €"
                                        class="dashboard__current__month__earnings__chart"
                  ></BiChartLabelDoughnut>

                </div>
              </v-flex>
              <v-flex xs12 md6>
                <div class="dashboard__current__month__expenses">

                  <BiChartLabelDoughnut :data="dataChartDoughnutCurrentExpenses.data"
                                        :options="dataChartDoughnutCurrentExpenses.options"
                                        :chartHeight="80"
                                        title="70%"
                                        subtitle="of 2.759 €"
                                        class="dashboard__current__month__expenses__chart"
                  ></BiChartLabelDoughnut>

                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

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

      <BiChartLine :data="dataChartLineYearlyHistory.data"
                   :options="dataChartLineYearlyHistory.options"
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
  import BiChartLabelDoughnut from "../../components/chart/label-doughnut"
  import BiChartLine from "../../components/chart/line"
  import BiFormYearSelector from "../../components/form/year-selector"
  import BiNavigationRightBar from "../../components/navigation/rightbar"
  import DataChartLineCurrentAccount1 from '../../data/DataChartLineCurrentAccount1'
  import DataChartLineCurrentAccount2 from '../../data/DataChartLineCurrentAccount2'
  import DataChartDoughnutCurrentEarnings from '../../data/DataChartDoughnutCurrentEarnings'
  import DataChartDoughnutCurrentExpenses from '../../data/DataChartDoughnutCurrentExpenses'
  import DataChartLineYearlyHistory from '../../data/DataChartLineYearlyHistory'

  export default {
    components: {
      BiAccountTile,
      BiChartLabelDoughnut,
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
        dataChartLineCurrentAccount1: DataChartLineCurrentAccount1,
        dataChartLineCurrentAccount2: DataChartLineCurrentAccount2,
        dataChartDoughnutCurrentEarnings: DataChartDoughnutCurrentEarnings,
        dataChartDoughnutCurrentExpenses: DataChartDoughnutCurrentExpenses,
        dataChartLineYearlyHistory: DataChartLineYearlyHistory,
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
