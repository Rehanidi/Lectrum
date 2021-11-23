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
export const dataDiagram = async () => {
  const cards = await getCards();
  const cardsArray = JSON.parse(cards);
  let arrForDiagram = [];
  for (let i = 0; i < cardsArray.length; i++) {
    const payments = await getTransactions(cardsArray[i].card);
    const paymentsArray = JSON.parse(payments);
    for (let i = 0; i < paymentsArray.length; i++) {
      const tempData = {};
      tempData.month = `${months[new Date(paymentsArray[i].created).getMonth() + 1]}`;
      tempData.data = `${new Date(paymentsArray[i].created).getDate()}`;
      tempData.amount = paymentsArray[i].amount;
      tempData.title = paymentsArray[i].title;
      arrForDiagram.push(tempData);
    }
  }
  return arrForDiagram;
};
