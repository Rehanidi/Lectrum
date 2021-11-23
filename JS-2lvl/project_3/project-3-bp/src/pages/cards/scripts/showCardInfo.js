import {showTransactions} from './showTransactions';

export const showInfo = async () => {
  const showCardInfo = document.querySelectorAll('img[class="arr__icon"]');
  showCardInfo.forEach(button => button.addEventListener('click', function () {
    const showActiveCard = event.currentTarget.parentNode.parentNode;
    showActiveCard.classList.toggle('collapsed');
    if (showActiveCard.classList.contains('collapsed')){
      const preloadPage = document.querySelector('article[data-status="download"]');
      const completed = document.querySelector('article[data-status="completed"]');
      preloadPage.style.display = 'inline';
      completed.style.display = 'none';
    } else {
      const cardNumber = event.currentTarget.parentNode.parentNode.querySelector('p[class="card__number"]');
      showTransactions(cardNumber.textContent);
    }
  }));
  const cardInternet = document.querySelectorAll('div[class="switch__block internet__switch__block checked"]');
  cardInternet.forEach(button => button.addEventListener('click', function () {
    event.currentTarget.classList.toggle('checked');
  }));
  const cardSecurity = document.querySelectorAll('div[class="switch__block security__switch__block  "]');
  cardSecurity.forEach(button => button.addEventListener('click', function () {
    event.currentTarget.classList.toggle('checked');
  }));
};
