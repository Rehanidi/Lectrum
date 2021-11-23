import { selectCheck } from "./milestone_1";
import { arr, parent, totalPrice } from "./milestone_2";
const chek = document.querySelectorAll('input[type="checkbox"]');
export const ul = document.querySelector('ul[class="transactions__list"]');
const checkPayment = document.querySelector('div[class="right__payments-footer"]').querySelector('button');
let transactionText;
let paymentId;
let index = JSON.parse(localStorage.getItem('index')) || [];

for (let i = 0; i < chek.length; i++) {
    chek[i].checked = false;
}

checkPayment.onclick = (event) => {
    let balance = JSON.parse(localStorage.getItem('balance'));

    while (ul.children.length > 0) {
        ul.removeChild(ul.lastChild);
    }
    for (let i = 0; i < arr.length; i++) {
        balance -= arr[i];
        transactionText = selectCheck[index[i]].querySelector('p').textContent;
        if (balance >= 0) {
            transactionsAccept();
        } else {
            transactionsDenied();
        }
        console.log(selectCheck[index[i]].dataset.id);
        localStorage.setItem('balance', JSON.stringify(balance));
    }
    for (let i = 0; i < chek.length; i++) {
        chek[i].checked = false;
    }
    while (parent.children.length > 1) {
        parent.removeChild(parent.firstChild);
    }
    totalPrice.textContent = 0;

    return false;
};

export const ifChecked = (obj) => {
    for (let i = 0; i < chek.length; i++) {
        if (selectCheck[i].className === 'left__company selected') {
            chek[i].checked = true;
            index.push(i);
            paymentId = obj.id;
            localStorage.setItem('index', JSON.stringify(index));
        }
    }
};
export const transactionsAccept = () => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list__item');
    li.textContent = `${transactionText} :успешно оплачено`;
    ul.appendChild(li);
};

export const transactionsDenied = () => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list__item list__item-error');
    li.textContent = `${transactionText} :ошибка транзакции`;
    ul.appendChild(li);
    return false;
};

if (index.length !== 0 ) {
    for (let i = 0; i < index.length; i++) {
        chek[index[i]].checked = true;
    }
}

