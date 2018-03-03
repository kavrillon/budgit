export default {
  data: {
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
        data: [20, 200, 50, 90, 80, 160, 120, 110, 150],
        type: 'line'
      },
    ]
  },
  options: {
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
  }
}
