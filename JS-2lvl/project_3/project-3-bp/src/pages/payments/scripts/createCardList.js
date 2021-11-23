export const createCardList = (card, system, elem) => {
  elem.insertAdjacentHTML('beforeend', `<div class="dropdown__list__item">
    <img src="img/icon/${system}-icon.svg" class="paysystem__icon visa__icon" alt="">
    <p class="form__input">${card}</p>
    </div>`);
};
