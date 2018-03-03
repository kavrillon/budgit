<template>
  <div class="chart-label-doughnut" :style="'height:' + chartHeight + 'px'">

    <BiChartDoughnut
      :data="data"
      :options="options"
      :height="chartHeight"
      class="chart-label-doughnut__chart"
    ></BiChartDoughnut>

    <div class="chart-label-doughnut__infos text-xs-center">
      <div class="chart-label-doughnut__infos__title" v-html="title"></div>
      <div class="chart-label-doughnut__infos__subtitle" v-html="subtitle"></div>
    </div>
  </div>
</template>

<script>
  import BiChartDoughnut from './doughnut'

  export default {
    name: 'BiChartLabelDoughnut',
    components: {
      BiChartDoughnut,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
      options: {
        type: Object
      },
      chartHeight: {
        type: Number,
        default: 100,
      },
      title: {
        type: String
      },
      subtitle: {
        type: String
      },
    },
  }
</script>

<style lang="scss">
  @import './label-doughnut';
</style>
