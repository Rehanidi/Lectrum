import { tarifs } from "./constants";
export const parent = document.querySelector('ul[class="form__summary-list"]');
const child1 = document.querySelector('li[class="list__item list__total"]');
export const totalPrice = document.querySelector('li[class="list__item list__total"]').querySelector('b');
let total;
export let arr = JSON.parse(localStorage.getItem('transactions')) || [];
totalPrice.textContent = 0;

export const calculations = (array) => {
    const obj = {};
        let cost = (array.current - array.previous) * tarifs[array.id];
        if (obj[array.meterId] > 0){
            obj[array.meterId] += cost;
        } else {
            obj[array.meterId] = cost;
        }
        array.bill = cost;
};
while (parent.children.length > 1) {
        parent.removeChild(parent.firstChild);
    }
export const addBill = (array) => {

    while (parent.children.length > 1) {
        parent.removeChild(parent.firstChild);
    }
    for (let i = 0; i < array.length; i++) {
        const li = document.createElement('li');
        li.setAttribute('class', 'list__item');
        const p = document.createElement('p');
        li.appendChild(p);
        const span = document.createElement('span');
        span.setAttribute('class', 'list__item-label');
        span.textContent = array[i].meterId;
        p.appendChild(span);
        const span_1 = document.createElement('span');
        span_1.setAttribute('class', 'price');
        span_1.textContent = "$ ";
        span_1.innerHTML =`$ <b>`+ array[i].bill.toFixed(1) +`</b>`;
        p.appendChild(span_1);
        parent.insertBefore(li, child1);
        arr[i] = array[i].bill;
    }
    total = arr.reduce(function (previous, current) {
        return previous + current;
    });
    totalPrice.textContent = total.toFixed(1);
    localStorage.setItem('transactions', JSON.stringify(arr));
};
const clear = document.querySelector('button[type="reset"]');
clear.onclick = (event) => {
    localStorage.clear();
    while (parent.children.length > 1) {
        parent.removeChild(parent.firstChild);
    }
    totalPrice.textContent = 0;
};
