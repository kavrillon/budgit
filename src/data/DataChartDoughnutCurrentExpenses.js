export default {
  data: {
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
  },
  options: {
    showAllTooltips: true,
    cutoutPercentage: 85,
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
  }
}
