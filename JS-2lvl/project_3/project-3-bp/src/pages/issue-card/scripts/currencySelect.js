export const currencySelect = () => {
  const arrowCurrency = document.querySelector('div[class="dropdown__toggle "]');
  const currency = document.querySelector('div[class="currency__block"]');
  const currencySelect = currency.querySelectorAll('div[class="dropdown__list__item"]');
  currencySelect.forEach(button => button.addEventListener('click', function (){
    const currencyValue = document.getElementById('currency');
    currencyValue.value = event.currentTarget.querySelector('p[class="form__input"]').textContent;
    arrowCurrency.classList.toggle('active');
  }));
};
