import '../../../styles/index.scss';
import dominosArray from './data/dominos.json';
import kfcArray from './data/kfc.json';
import macArray from './data/mac.json';


class Dish {
    #count;
    constructor(item) {
        this.id = item.id;
        this.price = item.price;
        this.title = item.title;
        this.img = item.img;
        this.#count = item.count;
    }

    getCount(){
        return this.#count;
    }

    setCount(value){
        if (typeof value !== 'number' || value < 0 || isNaN(value)){
            console.log(Error.name);
            return false;
        }
        this.#count = value;
    }
}

const dominosOrders = dominosArray.map((item)=> new Dish(item));
const kfcOrders = kfcArray.map((item)=> new Dish(item));
const macOrders = macArray.map((item)=> new Dish(item));

const restaurantList = [
    dominosOrders,
    macOrders,
    kfcOrders
];

// находим и записываем название доступных ресторанов
const restaurantListNames = [];
const restaurantNames = document.querySelectorAll('h4[class="h4"]');
for (let i = 0; i< restaurantNames.length; i++){
    restaurantListNames[i] = restaurantNames[i].textContent;
}

// создание карточки товаров для динамической вставки
const cardProductCreate = (order) => {
    const div = document.createElement('div');
    div.classList.add('dish');
    cardProductList.appendChild(div);
    div.insertAdjacentHTML('beforeEnd', '<img class="dish__image" src="' + order.img + '" alt="">');
    div.insertAdjacentHTML('beforeEnd', '<div class="dish__title">' + order.title + '</div>');
    const divDishInfo = document.createElement('div');
    divDishInfo.classList.add('dish__info');
    div.appendChild(divDishInfo);
    divDishInfo.insertAdjacentHTML('beforeEnd', '<div class="dish__price">' + order.price + ' грн</div>');
    const divCounter = document.createElement('div');
    divCounter.classList.add('counter');
    divDishInfo.appendChild(divCounter);
    divCounter.insertAdjacentHTML('beforeEnd', '<button class="counter__button counter__button--increase" data-id="' + order.id + '"></button>');
    divCounter.insertAdjacentHTML('afterbegin', '<span style="display: none;" class="counter__number">' + order.getCount() + '</span>');
    divCounter.insertAdjacentHTML('afterbegin', '<button style="display: none;" class="counter__button counter__button--decrease"  data-id="' + order.id + '" ></button>');
};

// функция для удаления карточек товара
const cardProductList = document.querySelector('div[class="tabs__content"]');
const deleteCards = () => {
    while (cardProductList.children.length > 0) {
        cardProductList.removeChild(cardProductList.lastChild);
    }
};

// удалаяем замоканные карточки
deleteCards();

// выделяем выбранный фастфуд
const fastFoodList = document.querySelectorAll('a[class="featured__item featured-item"]');

// определяем доминос, как выбор по умолчанию
fastFoodList[1].classList.add('active');
// наполняем страницу карточками товара по умолчанию
for (let i = 0; i < macOrders.length; i++) {
    cardProductCreate(macOrders[i]);
}

// определение ИД активного ресторана
const activeRestaurant = () => {
    let orderID;
        for (let i = 0; i < fastFoodList.length; i++) {
            if (fastFoodList[i].classList.contains('active')) {
                orderID = fastFoodList[i].dataset.restaurantid;
            }
        }
        return orderID;
};

// добавляем логику работы кнопок количеста заказа
const createDecreaseButton = () => {
    let activeDish;
    let buttonCount;
    let increaseCount = document.querySelectorAll('button[class="counter__button counter__button--increase"]');
    let decreaseOn = document.querySelectorAll('button[class="counter__button counter__button--decrease"]');
    let countOn = document.querySelectorAll('span[class="counter__number"]');
    let basket = document.querySelector('span[class="icon-button__badge"]');
    // обработка кнопки "плюс"
    increaseCount.forEach(button => button.addEventListener("click", function () {
        let orderID = activeRestaurant();
        let increaseButton = event.target.dataset.id;
        buttonCount = increaseButton - 1;
        activeDish = restaurantList[orderID][buttonCount];
        activeDish.setCount(activeDish.getCount() + 1);
        if (activeDish.getCount() >= 1){
            decreaseOn[buttonCount].style.display = 'inherit';
            countOn[buttonCount].textContent = activeDish.getCount();
            countOn[buttonCount].style.display = 'inherit';
        }
        let count = 0;
        for (let i = 0; i < restaurantList[orderID].length; i++){
            if (restaurantList[orderID][i].getCount() > 0){
                count++;
            }
        }
        basket.textContent = count.toString();
    }));

    // обработка кнопки "минус"
    decreaseOn.forEach(button => button.addEventListener('click', function () {
        let orderID = activeRestaurant();
        let decreaseButton = event.target.dataset.id;
        buttonCount = decreaseButton - 1;
        activeDish = restaurantList[orderID][buttonCount];
        activeDish.setCount(activeDish.getCount() - 1);
        if (activeDish.getCount() === 0){
            decreaseOn[buttonCount].style.display = 'none';
            countOn[buttonCount].style.display = 'none';
        }
        countOn[buttonCount].textContent = activeDish.getCount();

        let count = 0;
        for (let i = 0; i < restaurantList[orderID].length; i++){
            if (restaurantList[orderID][i].getCount() > 0){
                count++;
            }
        }
        basket.textContent = count.toString();
    }));
};


// динамически заполняем карточки в соответсвии с выбранным рестораном
fastFoodList.forEach(button => button.addEventListener("click", function() {
    let basket = document.querySelector('span[class="icon-button__badge"]');
    basket.textContent = 0;
    for (let i = 0; i < restaurantList[activeRestaurant()].length; i++){
        restaurantList[activeRestaurant()][i].setCount(0);
    }
    for (let i = 0; i < fastFoodList.length; i++){
        fastFoodList[i].classList.remove('active');
    }
    event.currentTarget.classList.add('active');
    let id = event.currentTarget.dataset.restaurantid;
    deleteCards();
    // наполняем страницу карточками товара
    for (let i = 0; i < restaurantList[id].length; i++) {
        cardProductCreate(restaurantList[id][i]);
    }
    createDecreaseButton();
}));

// идентефицируем рестораны
for (let i = 0; i < fastFoodList.length; i++){
    fastFoodList[i].setAttribute('data-restaurantid', `${i}`);
}

createDecreaseButton();

// открываем/закрываем корзину
const basket = document.querySelector('button[class="icon-button icon-button--orange"]');
const openBasket = document.querySelector('div[class="overlay"]');
basket.onclick = (event) => {
    deleteBasketCards();
    openBasket.classList.add('visible');
    const basketRestaurantName = document.querySelector('div[class="drawer__main"]').querySelectorAll('h2[class="h2"]');
    basketRestaurantName[1].textContent = restaurantListNames[activeRestaurant()];
    const totalOrders = document.querySelector('span[class="subtitle"]');
    let totalOrdersCounter = 0;
    let totalPrice = 0;
    for (let i = 0; i < restaurantList[activeRestaurant()].length; i++){
        if (restaurantList[activeRestaurant()][i].getCount() > 0){
            orderBasketCard(restaurantList[activeRestaurant()][i]);
            totalPrice += restaurantList[activeRestaurant()][i].price * restaurantList[activeRestaurant()][i].getCount();
            totalOrdersCounter++;
        }
    }
    totalOrders.innerHTML = '<span class="subtitle">(' + totalOrdersCounter + ' наименования)</span>';
    const totalPriceButton = document.querySelector('button[class="button"]');
    const delivery = document.querySelector('div[class="delivery-price__info"]');
    const deliveryPrice = document.getElementsByClassName('badge badge');
    let price = parseInt(deliveryPrice[activeRestaurant()].textContent.match(/\d+/));
    if ( isNaN(price) || totalPrice === 0){
        price = 0;
    }
    totalPrice += price;
    totalPriceButton.innerHTML = '<span class="button__label">Оформить заказ</span> (' + totalPrice + ' грн)';
    delivery.innerHTML = '<span class="delivery-price__title">Доставка</span> <span>' + deliveryPrice[activeRestaurant()].textContent + '</span>';
    totalPriceButton.onclick = (event) => {
        let userOrders = JSON.parse(localStorage.getItem('orders')) || [];
        obj = {};
        obj.restaurant = restaurantListNames[activeRestaurant()];
        obj.checkout = new Date();
        obj.orders = ordersArray;
        ordersArray = [];
        userOrders.push(obj);
        localStorage.setItem('orders', JSON.stringify(userOrders));
        window.location.href = "orders.html";
    };
};

const closeBasket = document.querySelector('button[class="icon-button"]');
closeBasket.onclick = (event) => {
    openBasket.classList.remove('visible');
};

// создаем функцию формирование заказов для корзины
const parentElement = document.querySelector('div[class="order"]');
const deleteBasketCards = () => {
    while (parentElement.children.length > 0) {
        parentElement.removeChild(parentElement.lastChild);
    }
};
deleteBasketCards();

let obj = {};
let ordersArray = [];
const orderBasketCard = (order) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'order__item order-item');
    parentElement.appendChild(div);
    div.insertAdjacentHTML('afterbegin','<span class="order-item__quantity">' + order.getCount() + ' X</span>');
    div.insertAdjacentHTML('afterbegin','<img class="order-item__image" src="' + order.img + '" alt="">');
    const div_1 = document.createElement('div');
    div_1.setAttribute('class', 'order-item__info');
    div_1.insertAdjacentHTML('afterbegin','<div class="order-item__price">' + order.price + ' грн</div>');
    div_1.insertAdjacentHTML('afterbegin','<h3 class="order-item__title h3">' + order.title + '</h3>');
    div.appendChild(div_1);
    const button = document.createElement('button');
    button.setAttribute('class', 'icon-button icon-button--red');
    button.insertAdjacentHTML('afterbegin','<img src="img/icons/delete.svg" alt="">');
    div.appendChild(button);
    const ordersData = {};
    ordersData.id = order.id;
    ordersData.price = order.price;
    ordersData.title = order.title;
    ordersData.count = order.getCount();
    ordersArray.push(ordersData);
};

console.log(JSON.parse(localStorage.getItem('orders')));
// localStorage.clear();
