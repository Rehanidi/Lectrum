export const createProduct = (product) => {
  const cards = document.getElementById('cards');
  cards.insertAdjacentHTML('beforeend', `<a href="gadget-page.html?hash=${product.hash}" class="item_card">
    <img src="img/item-image-05.jpg" class="card_cover" alt="Item image">
    <p class="item_category">Умная колонка</p>
    <p class="item_name">${product.name}</p>
    <p class="item_price">${product.price}$</p>
    <p class="item_comments"><span>${product.reviews.length}</span>отзывов</p>
    </a>`);
};
