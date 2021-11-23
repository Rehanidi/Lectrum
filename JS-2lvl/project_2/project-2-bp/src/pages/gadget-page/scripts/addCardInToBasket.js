const basket = document.querySelector('div[class="receipt_list"]');
export const cardsArray = JSON.parse(localStorage.getItem('cardsOrders')) || [];
export const fillOrder = () => {
  const totalCost = document.getElementById('total');
  let total = 0;
  let newCards = '';
  totalCost.textContent = cardsArray.reduce(function(a, b) {return a + b.price;}, total);
  for ( let i = 0; i < cardsArray.length; i++){
    newCards += `<div class="cart_item">
    <p class="item_name">${cardsArray[i].name}</p>
    <p class="item_price">$${cardsArray[i].price}</p>
    <input type="text" class="item_count" value="2">
    <div class="control-remove">
        <img src="img/icon/plus.svg" alt="">
    </div>
  </div>`;
  }
  basket.insertAdjacentHTML('afterbegin', newCards);
};

// заполняем корзину
export const addCard = () => {
  while (basket.children.length > 0) {
    basket.removeChild(basket.lastChild);
  }
  fillOrder();
};

// сохраняем текущую карточку товара
export const saveCard = (card) => {
  const name = card.name;
  const price = card.price;
  const order = {
    name,
    price,
  };
  cardsArray.push(order);
  localStorage.setItem('cardsOrders', JSON.stringify(cardsArray));
};
//JSON.parse(localStorage.getItem('orders'));
//localStorage.setItem('orders', JSON.stringify(userOrders));
