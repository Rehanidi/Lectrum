import '../../../styles/index.scss';
const restaurantListNames = [
    'Domino’s Pizza',
    'McDonald’s',
    'KFC'
];

const orderFieldList = [
    'id',
    'price',
    'title',
    'count'
];

class Checkout {
    #orders;
    #checkoutTime;
    #restaurant;
    constructor(item) {
        this.#orders = item.orders;
        this.#checkoutTime = item.checkout;
        this.#restaurant = item.restaurant;
    }

    getIsOrderFinished(){
        const end = new Date();
        const start = Date.parse(this.#checkoutTime);
        let result = end.getTime() - start;
        result = Math.ceil(result / (1000 * 60));
        if (result > 60){
            return true;
        }
        return false;
    }

    getRestaurant(){
        return this.#restaurant;
    }

    getOrderTime(){
        return this.#checkoutTime;
    }

    getCheckoutTime(){
        const end = new Date();
        const start = Date.parse(this.#checkoutTime);
        let result = end.getTime() - start;
        result = 60 - Math.ceil(result / (1000 * 60));
        return result;
    }

    getFormattedDate(){
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric"
        };
        return new Date(this.#checkoutTime).toLocaleDateString('ru-RU', options);
    }

    getFormattedTime(){
        const options = {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        };
        return new Date(this.#checkoutTime).toLocaleTimeString('ru-RU', options);
    }

    getOrders(){
        return this.#orders;
    }

    getCheckoutTimePercent(){
        const end = new Date();
        const start = Date.parse(this.#checkoutTime);
        let result = end.getTime() - start;
        result = 60 - Math.ceil(result / (1000 * 60));
        return Math.ceil(result / 60 * 100) + '%';
    }
}

const orders = JSON.parse(localStorage.getItem('orders')).map((item)=> new Checkout(item));



// првоеряем валидность даты
for (let i = 0; i < orders.length; i++) {
    let checkTime = (new Date(orders[i].getOrderTime()) === new Date()) ? true : false;
    // console.log(checkTime); // false если время не совпадает
}


// проверяем совпадают ли названия ресторанов из списка с наименованиями ресторано в заказах
let restaurantCount = 0;
for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < restaurantListNames.length; j++) {
        if (orders[i].getRestaurant() === restaurantListNames[j]){
            restaurantCount++;
        }
    }
}
let checkRestaurant = (restaurantCount === orders.length) ? true : false;
// console.log(checkRestaurant); // true если название ресторана в каждом заказе есть в списке ресторанов

// проверяем валидность заказов
let orderCount = 0;
for (let i = 0; i < orders.length; i++) {
    for (let j = 0; j < orders[i].getOrders().length; j++) {

        for (let key in orders[i].getOrders()[j]) {
            let flag = false;
            if ( key === 'id' && !(orders[i].getOrders()[j][key] > 0)) {
                console.log(orders[i].getOrders()[j][key]); // выводим id если он 0 или меньше
            }
            if ( key === 'price' && !(orders[i].getOrders()[j][key] > 0)) {
                console.log(orders[i].getOrders()[j][key]); // выводим price если она 0 или меньше
            }
            if ( key === 'title' && !(orders[i].getOrders()[j][key].length > 5 ) && !(orders[i].getOrders()[j][key].length < 30 )) {
                console.log(orders[i].getOrders()[j][key]); // выводим title если он больше 5 и меньше 30 символов
            }
            if ( key === 'count' && !(orders[i].getOrders()[j][key] > 0)) {
                console.log(orders[i].getOrders()[j][key]); // выводим count если он 0 или меньше
            }
            for (let k = 0; k < orderFieldList.length; k++) {
                if (orderFieldList[k] === key) {
                    orderCount++;
                    flag = true;
                }
            }
            if (!flag) {
                console.log('Some field does not exist in fieldList!!!');
            }
        }
    }
}

// создаем функцию формирующую уже завершенные заказы
const orderFinishedParent = document.querySelector('div[class="previous"]');
while (orderFinishedParent.children.length > 0) {
    orderFinishedParent.removeChild(orderFinishedParent.lastChild);
}
const orderFinished = (order) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'previous__item previous-item');
    orderFinishedParent.appendChild(div);
    const divChild_1 = document.createElement('div');
    divChild_1.setAttribute('class', 'previous-item__header');
    divChild_1.insertAdjacentHTML('afterbegin','<div class="badge badge--green">Выполнен</div>');
    divChild_1.insertAdjacentHTML('afterbegin','<h4 class="h4">' + order.getRestaurant() + '</h4>');
    div.appendChild(divChild_1);
    const divChild_2 = document.createElement('div');
    divChild_2.setAttribute('class', 'previous-item-info');
    divChild_2.insertAdjacentHTML('afterbegin','<div class="previous-item-info__time">' + order.getFormattedTime() + '</div>');
    divChild_2.insertAdjacentHTML('afterbegin','<div class="previous-item-info__date">' + order.getFormattedDate() + '</div>');
    div.appendChild(divChild_2);
    const ul = document.createElement('ul');
    ul.setAttribute('class', 'previous-item-dishes');
    div.appendChild(ul);
    for (let i = 0; i < order.getOrders().length; i++) {
        ul.insertAdjacentHTML('beforeend', '<li class="previous-item-dishes__item"><span class="previous-item-dishes__quantity">' + order.getOrders()[i].count + '</span>' + order.getOrders()[i].title + '</li>');
    }
};

// создаем функцию не завершенных заказов
const orderNotFinishedParent =document.querySelector('div[class="coming-up"]');
while (orderNotFinishedParent.children.length > 0) {
    orderNotFinishedParent.removeChild(orderNotFinishedParent.lastChild);
}
const orderNotFinished = (order) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'coming-up__item coming-up-item');
    orderNotFinishedParent.appendChild(div);
    console.log(order.getCheckoutTimePercent());
    div.insertAdjacentHTML('afterbegin', '<div class="progress-bar">\n' +
        '<div class="progress-bar__line" style="width: ' + order.getCheckoutTimePercent() + '"></div>\n' +
        '<div class="progress-bar__overlay">\n' +
            '<div class="progress-bar__item progress-bar__item--first"></div>\n' +
            '<div class="progress-bar__item progress-bar__item--sec"></div>\n' +
            '<div class="progress-bar__item progress-bar__item--third"></div>\n' +
            '</div>\n' +
        '</div>');
    div.insertAdjacentHTML('afterbegin', '<div class="coming-up-info">' +
        '<img src="img/icons/clock.svg" alt="">\n' +
        '<div class="coming-up-info__content">\n' +
            '<div>Заказ будет доставлен через</div>\n' +
            '<div class="coming-up-info__title">' + order.getCheckoutTime() + '</div>\n' +
            '</div>\n' +
        '</div>');
    div.insertAdjacentHTML('afterbegin','<div class="coming-up-item__header">\n' +
        '<h4 class="h4">' + order.getRestaurant() + '</h4>\n' +
            '<div class="badge badge--orange">Доставка</div>\n' +
        '</div>');
};

for (let i = 0; i < orders.length; i++) {
    if (orders[i].getIsOrderFinished()) {
        orderFinished(orders[i]);
    } else {
        orderNotFinished(orders[i]);
    }
}

// выпадающий список для скрытых позиций в заказе
// const showAdditionalOrder = () => {
//     const additionalOrderList = document.querySelectorAll('button[class="previous-item-see-more"]');
//     additionalOrderList.forEach(button => button.addEventListener('click', function () {
//         const btn = event.target;
//         if (btn.classList.contains('active')){
//             btn.classList.remove('active');
//         } else {
//             btn.classList.add('active');
//         }
//     }));
// };


// console.log(JSON.parse(localStorage.getItem('orders')));
