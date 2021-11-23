import '../../../css/style.scss';
import {cardSelect} from './cardSelect';
import {currencySelect} from './currencySelect';
import {createCard} from './createCard';
const cardObj = {};
const cardList = document.querySelectorAll('div[class="dropdown"]');
const arrowPaySystem = document.querySelector('div[class="dropdown__toggle"]');
const arrowCurrency = document.querySelector('div[class="dropdown__toggle "]');
const cards = {
  'Виза': 'visa',
  'Mastercard': 'mastercard',
};
const currencies = {
  'Доллар': 'usd',
  'Евро': 'eur',
  'Гривна': 'uah',
  'Рубли': 'rub',
};

// добавляем выпадающие списки
cardList.forEach(button => button.addEventListener('click', function (){
  event.currentTarget.classList.toggle('dropdown--open');
}));
arrowPaySystem.onclick = (event) => {
  arrowPaySystem.classList.toggle('active');
};
arrowCurrency.onclick = (event) => {
  arrowCurrency.classList.toggle('active');
};

// выбор карты
cardSelect();

// выбор валюты
currencySelect();

// выпуск карты
const typeOfCard = document.querySelectorAll('input[type="radio"]');
typeOfCard.forEach(button => button.addEventListener('click', function (){
  cardObj.class = document.querySelector(`label[for="${event.currentTarget.id}"]`).textContent.toLowerCase();
}));
const cardIssue = document.querySelector('input[class="form__button form__submit"]');
cardIssue.onclick = (event) => {
  event.preventDefault();
  const cardType = document.getElementById('cardType');
  const paySystem = document.getElementById('paySystem');
  const currency = document.getElementById('currency');
  const cardDescr = document.getElementById('cardDescr');
  const checkBox = document.getElementById('terms');
  cardObj.issuer = cardType.value;
  cardObj.system = cards[paySystem.value];
  cardObj.currency = currencies[currency.value];
  cardObj.description = cardDescr.value;
  if ( checkBox.checked) {
    (async () => {
      await createCard(cardObj);
    })();
  }
};

console.log(JSON.parse(localStorage.getItem('token')));
