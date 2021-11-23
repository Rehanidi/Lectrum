export const createCard = (card) =>{
  const cardList = document.querySelector('article[class="cards__info__layout"]');
  cardList.insertAdjacentHTML('beforeend', `<div class="card__info__item collapsed">
        <div class="card__info__header">
            <img src="img/icon/mastercard-icon.svg" alt="" class="card__info__icon">
                <p class="card__info__data">Личная карта ** ${card.card.slice(-4)}</p>
                <p class="card__info__balance">$${card.balance}</p>
                <img src="img/icon/arr-bottom.svg" class="arr__icon" alt="">
        </div>
        <div class="card__info__main">
            <div class="card__info__card">
                <img src="img/card-back.jpg" class="card__back" alt="">
                    <img src="img/icon/visa-white.svg" class="card__type" alt="">
                        <p class="card__number">${card.card}</p>
                        <p class="card__owner__name">${card.issuer}</p>
                        <p class="card__exp__date">06 / 22</p>
            </div>
            <div class="card__info__settings">
                <div class="data-item">
                    <p class="legend">Класс карты</p>
                    <p class="data">${card.class}</p>
                </div>
                <div class="data-item">
                    <p class="legend">IBAN-номер</p>
                    <p class="data">${card.iban}</p>
                </div>
                <div class="data-item">
                    <p class="legend">Кредитный лимит</p>
                    <p class="data">${card.limit}</p>
                </div>
                <div class="data-item">
                    <p class="legend">Покупки в интернете</p>
                    <div class="switch__block internet__switch__block checked">
                        <div class="switcher "></div>
                        <input type="checkbox" id="internetPayments">
                    </div>
                </div>
                <div class="data-item">
                    <p class="legend">3D Security</p>
                    <div class="switch__block security__switch__block  ">
                        <div class="switcher "></div>
                        <input type="checkbox" id="security3D">
                    </div>
                </div>
                <div class="other__settings">
                    <img class="settings__icon" src="img/icon/dots-icon.svg" alt="">
                        <p class="settings__name">Операции над картой</p>
                </div>
            </div>
        </div>
    </div>`);
};
