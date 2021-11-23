import {createCardList} from '../createCardList';
import {cardsArray} from '../index';

export const ownCardPayment = () => {
  const cardBottom = document.querySelector('div[id="ownCard"]');
  const dropdown = cardBottom.querySelector('div[class="dropdown"]');
  const dropdownToggle = cardBottom.querySelector('div[class="dropdown__toggle"]');
  const chooseCard = cardBottom.querySelector('input[class="form__input"]');
  const list = cardBottom.querySelector('div[class="dropdown__list"]');
  cardBottom.querySelector('img[class="info__icon"]').onclick = (event) => {
    list.innerHTML = null;
    dropdown.classList.toggle('dropdown--open');
    dropdownToggle.classList.toggle('active');
    for (let i = 0; i < cardsArray.length; i++){
      createCardList(cardsArray[i].card, cardsArray[i].system, list);
    }
  };
  list.onclick = (event) => {
    chooseCard.value = event.target.closest('div').innerText;
    dropdownToggle.querySelector('img').src = event.target.closest('div').querySelector('img').src;
    dropdown.classList.toggle('dropdown--open');
    dropdownToggle.classList.toggle('active');
  };
};
console.log(JSON.parse(localStorage.getItem('token')));
