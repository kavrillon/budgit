<script>
  import {Line, mixins} from 'vue-chartjs'
  const { reactiveProp } = mixins

  export default {
    name: 'BiChartLine',
    extends: Line,
    mixins: [reactiveProp],
    props: ['chartData', 'options'],
    mounted () {
      // Register custom positioner
      if (Chart.Tooltip.positioners.top === undefined) {
        registerPositioner()
      }

      // Register plugin
      this.renderChart(this.chartData, this.options)
    }
  }

  function registerPositioner() {
    Chart.Tooltip.positioners.top = (elements) => {
      if (!elements.length) {
        return false
      }

      var i, len
      var x = 0
      var y = 0
      var count = 0
      var minY = null

      for (i = 0, len = elements.length; i < len; ++i) {
        var el = elements[i]
        if (el && el.hasValue()) {
          var pos = el.tooltipPosition()
          x += pos.x
          y += pos.y
          if (minY === null || pos.y < minY) minY = pos.y
          ++count
        }
      }
      return {
        x: Math.round(x / count),
        y: 50
      }
    }
  }

</script>
