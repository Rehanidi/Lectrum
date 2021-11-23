import '../../../css/style.scss';
import {getCards} from './getCards';
import {createCard} from './createCard';
import {showInfo} from './showCardInfo';

// удаляем замоканные карты
const cardList = document.querySelector('article[class="cards__info__layout"]');
while (cardList.children.length > 0){
  cardList.removeChild(cardList.firstChild);
}

(async () => {
  const cards = await getCards();
  const cardsArray = JSON.parse(cards);
  for (let i = 0; i < cardsArray.length; i++) { // отображаем карты
    createCard(cardsArray[i]);
  }
  await showInfo();
})();

console.log(JSON.parse(localStorage.getItem('token')));
