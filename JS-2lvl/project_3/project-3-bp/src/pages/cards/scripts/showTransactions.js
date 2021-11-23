import {getTransactions} from './getTransaction';
import {displayPeriod} from './displayPeriod';

export const showTransactions = async (cardNumber) => {
  const transaction = JSON.parse(await getTransactions(cardNumber));
  const preloadPage = document.querySelector('article[data-status="download"]');
  const completed = document.querySelector('article[data-status="completed"]');
  preloadPage.style.display = 'none';
  completed.style.display = 'inline';
  const transactionsList = document.querySelector('div[class="transaction__main overflow"]');
  transactionsList.innerHTML = null;
  for (let i = 0; i < transaction.length; i++) {
    const date = new Date(Date.parse(transaction[i].created));
    if (date.getMonth() + 1 === displayPeriod().month && date.getFullYear() === Number(displayPeriod().year)){
      transactionsList.insertAdjacentHTML('afterbegin', `<div class="transaction__item">
        <img class="transaction__item__icon" src="img/transaction/home.svg" alt="">
        <div>
          <p class="transaction__item__type">${transaction[i].title}</p>
          <p class="transaction__item__data">${transaction[i].description}</p>
        </div>
        <div class="transaction__item__value">${transaction[i].title === 'Списание с карты' ? '-' : ''} $${transaction[i].amount}</div>
        <img src="img/icon/dots-icon.svg" class="transaction__item__more" alt="">
      </div>`);
    }
  }
};
