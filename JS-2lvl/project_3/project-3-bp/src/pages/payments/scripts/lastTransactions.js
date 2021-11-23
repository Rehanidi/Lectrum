import {getCards} from '../../cards/scripts/getCards';
import {getTransactions} from '../../cards/scripts/getTransaction';

export const lastTransactions = async (transactions) => {
  const transactionsList = document.querySelector('div[class="transaction__main "]');
  transactionsList.innerHTML = null;
  if (transactions.length > 0) {
    for (let i = 0; i < transactions.length; i++) {
      transactionsList.insertAdjacentHTML('afterbegin', `<div class="transaction__item">
    <img class="transaction__item__icon" src="img/transaction/home.svg" alt="">
    <div>
      <p class="transaction__item__type">${transactions[i].title}</p>
      <p class="transaction__item__data">${transactions[i].description}</p>
    </div>
     <div class="transaction__item__value">${transactions[i].title === 'Пополнение карты' ? '' : '-'}$${transactions[i].amount}</div>
       <img src="img/icon/dots-icon.svg" class="transaction__item__more" alt="">
     </div>`);
    }
  }
};

export const transactions = async () => {
  const cards = await getCards();
  const cardsArray = JSON.parse(cards);
  let transactions = [];
  let transactionsArray = [];
  for (let i = 0; i < cardsArray.length; i++) {
    if (transactions.length === 0) {
      transactions = JSON.parse(await getTransactions(cardsArray[i].card));
    } else {
      const tempArray = JSON.parse(await getTransactions(cardsArray[i].card));
      transactionsArray = transactions.concat(tempArray);
    }
  }
  const sortArray = transactionsArray.sort(function (a, b){
    return (a.created < b.created) ? -1 : ((a.created > b.created) ? 1 : 0);
  });
  return  sortArray;
};
