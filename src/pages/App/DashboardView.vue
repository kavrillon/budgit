<template>
  <v-content class="dashboard">

    <bi-navigation-right-bar :notifications="notifications"></bi-navigation-right-bar>

    <!-- MODULE CURRENT -->
    <v-layout row wrap class="dashboard__current">

      <v-flex xs12 sm3 class="dashboard__current__accounts">
        <v-flex xs12 class="dashboard__current__accounts__title">
          Accounts
        </v-flex>

        <v-flex
          xs12
          d-flex
          v-for="account in dataChartLineCurrentAccounts"
          :key="account.name"
        >
          <bi-account-tile
            class="dashboard__current__accounts__type"
            :name="account.name"
            :amount="account.total"
            :chart-data="account.data"
          ></bi-account-tile>
        </v-flex>
      </v-flex>

      <v-flex xs12 sm9 class="dashboard__current__month">
        <div class="dashboard__current__month__date">
          January, 2018
        </div>

        <v-card>
          <v-container>
            <v-layout row wrap>
              <v-flex xs6 md4 class="dashboard__current__month__expenses">
                <bi-account-percent
                  :chart-height="80"
                  :value="currentMonthExpenses"
                  :total="currentMonthTotalExpenses"
                  chart-color="#ff6384"
                  title="Expenses"
                  class="dashboard__current__month__expenses__chart"
                ></bi-account-percent>
              </v-flex>
              <v-flex xs6 md4 class="dashboard__current__month__earnings">
                <bi-account-percent
                  :chart-height="80"
                  :value="currentMonthEarnings"
                  :total="currentMonthTotalEarnings"
                  chart-color="#4bc1c0"
                  title="Earnings"
                  class="dashboard__current__month__earnings__chart"
                ></bi-account-percent>
              </v-flex>
              <v-flex xs12 md4 class="dashboard__current__month__diff">
                <v-layout row wrap>
                  <v-flex xs6 md12 class="dashboard__current__month__diff__block">
                    <div class="dashboard__current__month__diff__block__title">
                      Balance:
                    </div>
                    <div class="dashboard__current__month__diff__block__value"
                         :class="{'dashboard__current__month__diff__block__value--down' : monthDiff < 0}">
                      <v-icon class="dashboard__current__month__diff__block__value__icon" v-show="monthDiff > 0">
                        trending_up
                      </v-icon>
                      <v-icon class="dashboard__current__month__diff__block__value__icon" v-show="monthDiff < 0">
                        trending_down
                      </v-icon>
                      <span class="dashboard__current__month__diff__block__value__amount">{{ monthDiff }} €</span>
                    </div>
                  </v-flex>

                  <v-flex xs6 md12 class="dashboard__current__month__diff__block">
                    <div class="dashboard__current__month__diff__block__title">
                      Savings:
                    </div>
                    <div class="dashboard__current__month__diff__block__value"
                         :class="{'dashboard__current__month__diff__block__value--down' : 500 < 0}">
                      <v-icon class="dashboard__current__month__diff__block__value__icon" v-show="500 > 0">
                        trending_up
                      </v-icon>
                      <v-icon class="dashboard__current__month__diff__block__value__icon" v-show="500 < 0">
                        trending_down
                      </v-icon>
                      <span class="dashboard__current__month__diff__block__value__amount">{{ 500 }} €</span>
                    </div>
                  </v-flex>
                </v-layout>

                <v-divider class="dashboard__current__month__diff__separator"></v-divider>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>


      </v-flex>


    </v-layout>
    <!-- END MODULE CURRENT -->

    <!-- MODULE HISTORY -->
    <div class="dashboard__history">
      <v-layout raw wrap>
        <v-flex class="dashboard__history__top" xs8 sm4>
          <div class="dashboard__history__top__title">History</div>
          <div class="dashboard__history__top__subtitle">Saving by month in {{ activeYear }}</div>
        </v-flex>
        <v-flex class="dashboard__history__year" xs4 sm8>
          <bi-form-year-selector
            :data="availableYears"
            :active-year="activeYear"
            :visible-shortcuts="3"
            :minimise-on-mobile="true"
            v-on:formYearSelectorYearChange="selectYear"
          ></bi-form-year-selector>
        </v-flex>
      </v-layout>

      <bi-account-history
        :data="yearHistoryData"
        class="dashboard__history__chart"
      ></bi-account-history>
    </div>
    <!-- END MODULE HISTORY -->

    <!-- MODULE DETAILS -->
    <div class="dashboard__details">
      <v-layout row wrap>
        <v-flex xs12 sm4>
          <div class="dashboard__details__savings">
            <div class="dashboard__details__savings__title">Savings history</div>
          </div>
        </v-flex>
        <v-flex xs12 sm4>
          <div class="dashboard__details__capacity">
            <div class="dashboard__details__capacity__title">Savings for year</div>
          </div>
        </v-flex>
        <v-flex xs12 sm4>
          <div class="dashboard__details__categories">
            <div class="dashboard__details__categories__title">Categories</div>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <!-- END MODULE DETAILS -->

    <!-- MODULE PREVIOUS -->
    <div class="dashboard__previous">
      <v-layout>
        <v-flex>
        </v-flex>
      </v-layout>
    </div>
    <!-- END MODULE PREVIOUS -->

  </v-content>
</template>

<script>
  import BiAccountHistory from "../../components/account/history"
  import BiAccountPercent from "../../components/account/percent"
  import BiAccountTile from "../../components/account/tile"
  import BiChartLabelDoughnut from "../../components/chart/label-doughnut"
  import BiFormYearSelector from "../../components/form/year-selector"
  import BiNavigationRightBar from "../../components/navigation/rightbar"
  import DataChartLineCurrentAccounts from '../../data/DataChartLineCurrentAccounts'

  export default {
    components: {
      BiAccountHistory,
      BiAccountPercent,
      BiAccountTile,
      BiChartLabelDoughnut,
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
      monthDiff() {
        return this.currentMonthEarnings - this.currentMonthExpenses
      },
    },
    data() {
      return {
        dataChartLineCurrentAccounts: DataChartLineCurrentAccounts,
        currentMonthTotalExpenses: 2759,
        currentMonthExpenses: 1931,
        currentMonthTotalEarnings: 3253,
        currentMonthEarnings: 1073,
        activeYear: parseInt((new Date()).getFullYear()),
        availableYears: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018],
        yearHistoryData: this.generateFakeYearData(),
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
        this.yearHistoryData = this.generateFakeYearData()
      },
      generateFakeYearData() {
        return Array.from({length: 12}, () => Math.floor(Math.random() * 1000 * (Math.random() < 0.5 ? -1 : 1)))
      },
    }
  }
</script>

<style lang="scss">
  @import "../../assets/variables";
  @import "DashboardView";
</style>
