import {getCards} from '../../cards/scripts/getCards';
import {getTransactions} from '../../cards/scripts/getTransaction';

const months = {
  '1': 'Января',
  '2': 'Февраля',
  '3': 'Марта',
  '4': 'Апреля',
  '5': 'Мая',
  '6': 'Июня',
  '7': 'Июля',
  '8': 'Августа',
  '9': 'Сентября',
  '10': 'Октября',
  '11': 'Ноября',
  '12': 'Декабря',
};
const data = [];
for (let i = 1; i <= 31; i++) {
  data.push(i);
}

const dynamicColors = function() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
};
export const dataDiagramForCard = async () => {
  const cards = await getCards();
  const cardsArray = JSON.parse(cards);
  let arrForDiagram = [];

  for (let i = 0; i < cardsArray.length; i++) {
    const tmpArr = [];
    const payments = await getTransactions(cardsArray[i].card);
    const paymentsArray = JSON.parse(payments);
    for (let i = 0; i < paymentsArray.length; i++) {
      let tempData = {};
      tempData.month = `${months[new Date(paymentsArray[i].created).getMonth() + 1]}`;
      tempData.data = `${new Date(paymentsArray[i].created).getDate()}`;
      tempData.amount = paymentsArray[i].amount;
      tempData.title = paymentsArray[i].title;
      tempData.card = paymentsArray[i].card;
      tmpArr.push(tempData);
    }
    arrForDiagram.push(tmpArr);
  }
  return arrForDiagram;
};


export const arrayParse = (arr) => {
  const incomeArray = arr.filter(item => item.title === 'Пополнение карты');
  const costArray = arr.filter(item => item.title !== 'Пополнение карты');
  const color = dynamicColors();
  const array = [];
  const income = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < incomeArray.length; j++) {
      if (data[i] === Number(incomeArray[j].data)) {
        if (income[i] > 0) {
          income[i] += incomeArray[j].amount;
        } else {
          income[i] = incomeArray[j].amount;
        }
      }
    }
  }
  const cost = [];
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < costArray.length; j++) {
      if (data[i] === Number(costArray[j].data)) {
        if (cost[i] > 0) {
          cost[i] += costArray[j].amount;
        } else {
          cost[i] = costArray[j].amount;
        }
      }
    }
  }
  const dataFirst = {
    label: `Доходы **** ${arr[0].card.slice(-4)}`,
    data: income,
    backgroundColor: color,
    pointBorderColor: 'green',
    borderColor: color,
    fill: false,
    spanGaps: true,
  };
  const dataSecond = {
    label: `Расходы **** ${arr[0].card.slice(-4)}`,
    data: cost,
    backgroundColor: color,
    pointBorderColor: 'red',
    borderColor: color,
    fill: false,
    spanGaps: true,
  };
  array.push(dataFirst);
  array.push(dataSecond);
  return array;
};

export const diagramForCard = (array) => {
  const ctx = document.getElementById('myChartForCard').getContext('2d');
  let speedData = {
    labels: data,
    datasets: array,
  };
  let chartOptions = {
    scales: {
      xAxes: [{
        ticks: {
          callback: function (value, index, values) {
            return value + ' April'; // при наличии выбора дат, месяц подставляем динамически
          },
        },
      }],
    },
    legend: {
      labels: {
        usePointStyle: true,
        boxWidth: 6,
      },
    },
  };
  let myChartForCard = new Chart(ctx, {
    type: 'line',
    data: speedData,
    options: chartOptions,
  });
};
