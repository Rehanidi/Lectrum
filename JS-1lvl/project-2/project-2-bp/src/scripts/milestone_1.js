import { calculations, addBill } from "./milestone_2";
import { ifChecked, ul } from "./milestone_3";
export const selectCheck = document.getElementsByClassName('left__company');
const previousData = document.getElementById('previous');
const currentData = document.getElementById('current');
const meters = document.getElementById('meters');
const payment = {};
const payments = JSON.parse(localStorage.getItem('payments')) || [];
const paymentDescription = [
    'Оплата налогов',
    'Оплата холодного водоснабжения',
    'Оплата интерент услуг',
    'Оплата услуг охраны',
    'Совершить обмен валюты'
];

for (let i = 0; i < selectCheck.length; i++) {
    selectCheck[i].onclick = (event) => {

        const serviceType = document.getElementsByClassName('left__company-desc')[i];
        const title = document.querySelector('h2[class="center__title"]');
        const titleDescription = document.querySelector('p[class="center__desc"]');
        titleDescription.textContent = paymentDescription[i];
        title.textContent = serviceType.textContent;
        payment.id = serviceType.dataset.id;


        selectCheck[i].classList.add('selected');
        for (let j = 0; j < selectCheck.length; j++){
            if (j !== i) {
                    selectCheck[j].classList.remove('selected');
            }
        }
    };
}
meters.onchange = (event) => {
    payment.meterId = meters[meters.selectedIndex].textContent;
};

const save = document.querySelector('button[class="btn"]');
save.onclick = (event) => {
    if (parseFloat(previousData.value) < 0
            || previousData.value === ''
                || !(Number.isInteger(parseFloat(previousData.value)))
                    || typeof previousData.value == null){
        alert('Enter valid value');
        previousData.value = '';
        return false;
    }
    payment.previous = parseFloat(previousData.value);

    if (typeof payment.previous === 'undefined'){
        alert('Enter previous value');
        currentData.value = '';
        return false;
    }
    if (parseFloat(currentData.value) < 0 || !(Number.isInteger(parseFloat(currentData.value))) || typeof currentData.value == null){
        alert('Enter valid value');
        currentData.value = '';
        return false;
    }
    if (parseFloat(currentData.value) <= parseFloat(previousData.value)){
        alert('Current value less then previous!');
        currentData.value = '';
        return false;
    } else {
        payment.current = parseFloat(currentData.value);
        let tmpObj = Object.assign({}, payment);
        payments.push(tmpObj);
        calculations(tmpObj);
        ifChecked(tmpObj);
        localStorage.setItem('payments', JSON.stringify(payments));
        delete payment.meterId;
        delete payment.id;
        delete payment.current;
        delete payment.previous;
        addBill(payments);
        payment.meterId = meters[0].textContent;
    }
    return false;
};

if (payments.length !== 0) {
    addBill(payments);
}
while (ul.children.length > 0) {
    ul.removeChild(ul.lastChild);
}
payment.meterId = meters[0].textContent;
