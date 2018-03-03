export default {
  data: {
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
        data: [120, 240, 40, 70, 100, 130, 200, 80, 30],
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
