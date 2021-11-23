import '../../../css/style.css';
import '../../../css/gadget-page.css';
import {getProductByHash} from './getProductByHash';
import {fillCard} from './fillActiveCard';
import {createReview} from './review';
import {addCard, fillOrder, saveCard} from './addCardInToBasket';
import {addReview} from './addReview';
import {checkAuth} from './checkAuth';


const hash = window.location.search.slice(6);

// определяяем выбранную карточку товара и заполняем ее данными
(async () => {
  const activeCard = getProductByHash(hash);
  const card = JSON.parse(await activeCard);
  await checkAuth();
  fillCard(await card);
  createReview(hash, await card); // заполняем комментарии
})();

// выбор цвета и памяти
const choice = document.querySelectorAll('div[class="item-value"]');
for (let i = 0; i < choice.length; i++) {
  choice[i].children.forEach(button => button.addEventListener('click', function (){
    for (let j = 0; j < choice[i].children.length; j++) {
      choice[i].children[j].classList.remove('selected');
      event.currentTarget.classList.add('selected');
    }
  }));
}
// заполняем обновленные данные о комментариях
export const updateCard = async () => {
  const activeCard = getProductByHash(hash);
  const card = JSON.parse(await activeCard);
  createReview(hash, await card);
};

// отображение отзывов
const reviews = document.getElementById('reviews');
const characteristics = document.getElementById('characteristics');
const reviewsPane = document.getElementById('reviewsPane');
const characteristicsPane = document.getElementById('characteristicsPane');
reviews.onclick = (event) => {
  event.target.classList.add('active');
  reviewsPane.classList.add('show');
  characteristics.classList.remove('active');
  characteristicsPane.classList.remove('show');
};

characteristics.onclick = (event) => {
  event.target.classList.add('active');
  characteristicsPane.classList.add('show');
  reviews.classList.remove('active');
  reviewsPane.classList.remove('show');
};


// отображаем содержимое корзины
const popup = document.querySelector('div[class="popup_back"]');
const popupCard = document.querySelector('div[class="popup_form popup_cart"]');
const popupOpen = document.getElementById('cartIcon');
popupOpen.onclick = (event) => {
  popup.classList.add('visible');
  popupCard.classList.add('popup-show');
};

// скрываем содержимое корзины
const popupClose = popupCard.querySelector('img[alt="Close icon"]');
popupClose.onclick = (event) => {
  popup.classList.remove('visible');
  popupCard.classList.remove('popup-show');
};

// добавляем текущий товар в корзину
const addInBasket = document.querySelector('div[class="price_block"]').querySelector('button');
addInBasket.onclick = (event) => {
  (async () => {
    const activeCard = getProductByHash(hash);
    const card = JSON.parse(await activeCard);
    saveCard(await card);
    fillOrder(await card);
    addInBasket.textContent = 'Товар добавлен в корзину';
    addInBasket.disabled = true;
  })();
};

// добавляем уже существующие товары в корзине
addCard();

// добавляем комментарий
const sendReview = document.querySelector('input[class="btn-blue"]');
sendReview.onclick = async (event) => {
  event.preventDefault();
  await addReview(hash);
  const activeReview = getProductByHash(hash);
  const card = JSON.parse(await activeReview);
  await createReview(hash, await card);
};


// console.log(JSON.parse(localStorage.getItem('token')));
// console.log(JSON.parse(localStorage.getItem('cardsOrders')));
// localStorage.removeItem('token');
// localStorage.removeItem('cardsOrders');
