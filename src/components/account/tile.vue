<template>
  <v-card class="account-tile d-flex">
    <v-container>
      <div class="account-tile__title text-xs-center text-sm-right subheading">
        {{ name }}
      </div>
      <v-layout row wrap align-center reverse>
        <v-flex xs12 md7 class="text-xs-center text-sm-right">
          <div class="account-tile__amount">{{ amount }} €</div>
        </v-flex>
        <v-flex xs12 md5 class="hidden-xs-only">
          <BiChartLine :data="chartData"
                       :options="chartOptions"
                       class="account-tile__chart">
          </BiChartLine>
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
      chartOptions: {
        type: Object,
        required: true,
      },
    },
  }
</script>

<style lang="scss" scoped>
  @import './tile';
</style>
