export default {
  data: {
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
