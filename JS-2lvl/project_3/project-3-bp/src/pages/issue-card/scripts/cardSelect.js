export const cardSelect = () => {
  const arrowPaySystem = document.querySelector('div[class="dropdown__toggle"]');
  const paySystem = document.querySelector('div[class="paysystem__block"]');
  const cardSelect = paySystem.querySelectorAll('div[class="dropdown__list__item"]');
  cardSelect.forEach(button => button.addEventListener('click', function (){
    const card = document.getElementById('paySystem');
    card.value = event.currentTarget.querySelector('p[class="form__input"]').textContent;
    document.querySelector('div[class="dropdown__toggle active"]').querySelector('img').src = event.currentTarget.querySelector('img').getAttribute('src');
    arrowPaySystem.classList.toggle('active');
    const visaMediumCard = document.querySelector('label[for="medium"]');
    const mastercardCard = document.querySelectorAll('label[data-type="mastercard"]');
    if (card.value === 'Mastercard') {
      visaMediumCard.style.display = 'none';
      mastercardCard[0].style.display = 'flex';
    } else {
      visaMediumCard.style.display = 'flex';
      mastercardCard[0].style.display = 'none';
    }
    const visaHighCard = document.querySelector('label[for="high"]');
    if (card.value === 'Mastercard') {
      visaHighCard.style.display = 'none';
      mastercardCard[1].style.display = 'flex';
    } else {
      visaHighCard.style.display = 'flex';
      mastercardCard[1].style.display = 'none';
    }

  }));
};
