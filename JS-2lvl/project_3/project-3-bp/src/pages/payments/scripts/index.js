import '../../../css/style.scss';
import {paymentSelect} from './paymentSelect';
import {ownCardPayment} from './Payment types/ownCardPayment';
import {getCards} from '../../cards/scripts/getCards';
import {createCardList} from './createCardList';
import {createOrder} from './Requests/createOrder';
import {balance} from './showCardBalance';
import {lastTransactions, transactions} from './lastTransactions';
import {otherCardPayment} from './Payment types/otherCardPayment';
import {communalPayment} from './Payment types/communalPayment';
import io from 'socket.io-client';
import toastr from 'toastr';
import {getLogin} from '../../dashboard/scripts/socketGetLogin';

export let cardsArray;

(async () => {
  const cards = await getCards();
  cardsArray = JSON.parse(cards);
})();

const socket = io('https://lab.lectrum.io', {
  path: '/ws',
});
socket.on('connect', () => {
  console.log('connected');
});
socket.on('disconnect', () => {
  console.log('disconnect');
});

(async () => {
  const login = JSON.parse(await getLogin());
  socket.emit('login', `ironbank:${login.email}`);
  socket.on('login', (data) => {
    console.log(data);
  });
})();

socket.on('notification', (source) => {
  const data = JSON.parse(source);
  toastr.info(data);
});

socket.on('order', (data) => {
  console.log(JSON.parse(data));
});

(async () => {
  await balance(); // отображаем карты и их баланс
  const transactionsArray = await transactions();
  await lastTransactions(transactionsArray); // заполняем данные о последний транзакциях
})();


// выбираем картку с которой будут проводить операции
const cardSelectFrom = document.querySelector('div[class="form__paysystem paysystem__visa w-260"]');
const dropdown = cardSelectFrom.querySelector('div[class="dropdown"]');
const dropdownToggle = cardSelectFrom.querySelector('div[class="dropdown__toggle"]');
const list = document.querySelector('div[class="dropdown__list"]');
const chooseCard = document.getElementById('paySystem');
cardSelectFrom.querySelector('img[class="info__icon"]').onclick = (event) => {
  list.innerHTML = null;
  dropdown.classList.toggle('dropdown--open');
  dropdownToggle.classList.toggle('active');
  for (let i = 0; i < cardsArray.length; i++){
    createCardList(cardsArray[i].card, cardsArray[i].system, list);
  }
  list.onclick = (event) => {
    chooseCard.value = event.target.closest('div').innerText;
    dropdownToggle.querySelector('img').src = event.target.closest('div').querySelector('img').src;
    dropdown.classList.toggle('dropdown--open');
    dropdownToggle.classList.toggle('active');
  };
};
paymentSelect(); // вибираем тип платежа
ownCardPayment(); // реализация меню "перевода на свою карту"
otherCardPayment(); // реализация меню "перевода на чужую карту"
communalPayment(); // реализация меню "оплата комуналки"


// реализация перевовда между своими картами
const ownCardForm = document.querySelector('div[id="ownCard"]');
const transferMoneyButton = ownCardForm.querySelector('input[class="form__button form__submit form__submit__light w-230"]');
const chooseCardIn = ownCardForm.querySelector('input[class="form__input"]');
transferMoneyButton.onclick = (event) => {
  event.preventDefault();
  const transferSum = ownCardForm.querySelector('input[class="form__input w-125"]');
  const transferIn = {
    'title': 'Пополнение карты',
    'description': 'ATM',
    'operation': 'credit',
    'amount': Number(transferSum.value),
    'card': chooseCardIn.value,
  };
  const transferOut = {
    'title': 'Списание с карты',
    'description': 'ATM',
    'operation': 'debet',
    'amount': Number(transferSum.value),
    'card': chooseCard.value,
  };
  if (transferIn.card === transferOut.card){
    toastr.error('Wrong card!');
  } else {
    (async () => {
      await createOrder(transferIn);
      await createOrder(transferOut);
      await balance();
      const transactionsArray = await transactions();
      await lastTransactions(transactionsArray);
    })();
  }
};

// реализация перевовда со своей карты на чужую
const otherCardForm = document.querySelector('div[id="clientCard"]');
const transferMoneyToOtherCardButton = otherCardForm.querySelector('input[class="form__button form__submit form__submit__light w-230"]');
transferMoneyToOtherCardButton.onclick = (event) => {
  event.preventDefault();
  const transferSum = otherCardForm.querySelector('input[class="form__input w-125"]');
  const otherCardNumber = otherCardForm.querySelector('div[class="w-220"]').querySelector('input[class="form__input"]');
  const otherCardName = otherCardForm.querySelector('div[class="w-220 form__info"]').querySelector('input[class="form__input"]');
  const transferOut = {
    'title': 'Перевод на карту',
    'operation': 'debet',
    'amount': Number(transferSum.value),
    'card': chooseCard.value,
  };
  if (otherCardNumber.value !== ''){
    transferOut.description = otherCardNumber.value;
  } else if (otherCardName.value !== '') {
    transferOut.description = otherCardName.value;
  } else {
    toastr.error('Enter valid card number or name!');
  }
  (async () => {
    await createOrder(transferOut);
    await balance();
    const transactionsArray = await transactions();
    await lastTransactions(transactionsArray);
  })();
};

// реализация оплаты коммуналки
const communalForm = document.querySelector('div[id="utilityBills"]');
const communalPaymentButton = communalForm.querySelector('input[class="form__button form__submit form__submit__light w-230"]');
communalPaymentButton.onclick = (event) => {
  event.preventDefault();
  const transferSum = communalForm.querySelector('input[class="form__input w-125"]');
  const service = document.getElementById('services');
  const transferOut = {
    'title': 'Оплата коммуналки',
    'operation': 'debet',
    'description': service.value,
    'amount': Number(transferSum.value),
    'card': chooseCard.value,
  };
  (async () => {
    await createOrder(transferOut);
    await balance();
    const transactionsArray = await transactions();
    await lastTransactions(transactionsArray);
  })();
};

// реализация пополнения мобильного телефона
const mobileForm = document.querySelector('div[id="mobile"]');
const mobileName = mobileForm.querySelector('div[class="w-220"]').querySelector('input[class="form__input"]');
const mobileNumber = document.getElementById('contactTelNumber');
const mobilePaymentButton = mobileForm.querySelector('input[class="form__button form__submit form__submit__light w-230"]');
mobilePaymentButton.onclick = (event) => {
  event.preventDefault();
  const transferSum = mobileForm.querySelector('input[class="form__input w-125"]');
  const transferOut = {
    'title': 'Пополнение мобильного',
    'operation': 'debet',
    'amount': Number(transferSum.value),
    'card': chooseCard.value,
  };
  if (mobileName.value !== ''){
    transferOut.description = mobileName.value;
  } else if (mobileNumber.value !== '') {
    transferOut.description = mobileNumber.value;
  } else {
    toastr.error('Enter name or phone number!');
    return false;
  }
  (async () => {
    await createOrder(transferOut);
    await balance();
    const transactionsArray = await transactions();
    await lastTransactions(transactionsArray);
  })();
};


