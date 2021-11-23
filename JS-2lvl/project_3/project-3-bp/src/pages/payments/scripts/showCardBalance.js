import {getCards} from '../../cards/scripts/getCards';

export const balance = async () => {
  const cards = await getCards();
  const cardsArray = JSON.parse(cards);
  const cardBalance = document.querySelector('div[class="balance__block__main"]');
  cardBalance.innerHTML = null;
  for (let i = 0; i < cardsArray.length; i++) { // отображаем баланс карт
    showCardBalance(cardsArray[i]);
  }
};

export const showCardBalance = (card) => {
  const cardBalance = document.querySelector('div[class="balance__block__main"]');
  cardBalance.insertAdjacentHTML('beforeend', `<div class="card__balance card__balance__item">
    <img src="img/icon/${card.system}-icon.svg" class="card__balance__icon" alt="">
    <div>
      <p class="card__balance__type">Личная карта</p>
      <p class="card__balance__number">${card.card.slice(0, 4)} **** **** ${card.card.slice(-4)}</p>
    </div>
    <p class="card__balance__data">$${card.balance}</p>
    <img src="img/icon/increase-icon.svg" class="card__balance__status" alt="">
    </div>`);
};
