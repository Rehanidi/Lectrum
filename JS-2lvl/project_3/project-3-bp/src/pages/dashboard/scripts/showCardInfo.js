import {getCards} from '../../cards/scripts/getCards';

export const showCardInfo = async (cardListParent) => {
  const cards = await getCards();
  const arrayCards = JSON.parse(cards);
  cardListParent.innerHTML = null;
  for ( let i = 0; i < arrayCards.length; i++) {
    cardListParent.insertAdjacentHTML('afterbegin', `<div class="card__balance card__balance__item">
    <img src="img/icon/${arrayCards[i].system}-icon.svg" class="card__balance__icon" alt="">
    <div>
      <p class="card__balance__type">Личная карта</p>
      <p class="card__balance__number">${arrayCards[i].card.slice(0, 4)} **** **** ${arrayCards[i].card.slice(-4)}</p>
    </div>
    <p class="card__balance__data">$${arrayCards[i].balance}</p>
    <img src="img/icon/increase-icon.svg" class="card__balance__status" alt="">
    </div>`);
  }
};
