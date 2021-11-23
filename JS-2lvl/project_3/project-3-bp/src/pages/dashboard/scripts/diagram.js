export const diagram = (arr) => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const incomeArray = arr.filter(item => item.title === 'Пополнение карты');
  const costArray = arr.filter(item => item.title !== 'Пополнение карты');

  let data = [];
  for (let i = 1; i <= 31; i++) {
    data.push(i);
  }

  const income = [];
  for (let i = 0; i < data.length; i++ ){
    for (let j = 0; j < incomeArray.length; j++ ){
      if (data[i] === Number(incomeArray[j].data)){
        if (income[i] > 0 ) {
          income[i] += incomeArray[j].amount;
        } else {
          income[i] = incomeArray[j].amount;
        }
      }
    }
  }

  const cost = [];
  for (let i = 0; i < data.length; i++ ){
    for (let j = 0; j < costArray.length; j++ ){
      if (data[i] === Number(costArray[j].data)){
        if (cost[i] > 0 ) {
          cost[i] += costArray[j].amount;
        } else {
          cost[i] = costArray[j].amount;
        }
      }
    }
  }
  const dataFirst = {
    label: 'Доходы',
    data: income ,
    backgroundColor: '#FFF8DC',
    pointBorderColor: 'orange',
    borderColor: '#00CED1',
    fill: false,
    spanGaps: true,
  };
  const dataSecond = {
    label: 'Расходы',
    data: cost,
    backgroundColor: '#FF00FF',
    pointBorderColor: 'blue',
    borderColor: '#FF1493',
    fill: false,
    spanGaps: true,
  };
  let speedData = {
    labels: data,
    datasets: [dataFirst, dataSecond],
  };
  let chartOptions = {
    scales: {
      xAxes: [{
        ticks: {
          callback: function (value, index, values) {
            return value + ` ${incomeArray[0].month}`;},
        },
      }],
    },
  };
  let myChart = new Chart(ctx, {
    type: 'line',
    data: speedData,
    options: chartOptions,
  });
};
