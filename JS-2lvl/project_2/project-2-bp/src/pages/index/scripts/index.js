import '../../../css/index.css';
import '../../../css/style.css';
import {getProducts} from './getProducts';
import {createProduct} from './createProduct';
import {registration} from './registration';
import {logIn} from './login';
import {checkAuth} from '../../gadget-page/scripts/checkAuth';

const loginBtn = document.getElementById('loginBtn');
const overlay = document.getElementById('overlay');
const loginForm = document.getElementById('loginForm');
const regLink = document.getElementById('regLink');
const loginLink = document.getElementById('loginLink');
const closeImg = loginForm.querySelector('img');

(async () => {
  await checkAuth();
})();

export const resetFormLinks = () => {
  loginForm.querySelectorAll('.tab_pane').forEach((el) => {
    el.classList.remove('show');
  });
};

export const saveTokenToLocaleStorage = (token) => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const closePopUp = () => {
  overlay.classList.remove('visible');
  loginForm.classList.remove('popup-show');
};

loginBtn.onclick = () => {
  overlay.classList.add('visible');
  loginForm.classList.add('popup-show');
};

regLink.onclick = () => {
  resetFormLinks();

  regPane.classList.add('show');
  regLink.classList.add('active');
  loginLink.classList.remove('active');
};

loginLink.onclick = () => {
  resetFormLinks();

  loginPane.classList.add('show');
  loginLink.classList.add('active');
  regLink.classList.remove('active');
};

closeImg.onclick = () => {
  overlay.classList.remove('visible');
  loginForm.classList.remove('popup-show');
};


// регистрируем пользователя
const adminName = document.getElementById('username');
const adminMail = document.getElementById('signUpEmail');
const adminPassword = document.getElementById('signUpPassword');
const registerButton = document.getElementById('regPane').querySelector('input[class="btn-blue"]');
registerButton.onclick = (event) => {
  event.preventDefault();
  const name = adminName.value;
  const email = adminMail.value;
  const password = adminPassword.value;

  const user = {
    name,
    email,
    password,
  };
  registration(user);
};


// логиним юзера
const userMail = document.getElementById('signInEmail');
const userPassword = document.getElementById('signInPassword');
const loginButton = document.getElementById('loginPane').querySelector('input[class="btn-blue"]');
loginButton.onclick = (event) => {
  event.preventDefault();
  const email = userMail.value;
  const password = userPassword.value;

  const user = {
    email,
    password,
  };
  logIn(user);
};

// добавление созданных карточек товара
(async () => {
  const exam = await getProducts();
  const productArray = JSON.parse(exam);
  for ( let i = 0; i < productArray.length; i++) {
    createProduct(productArray[i]);
  }
})();

// console.log(JSON.parse(localStorage.getItem('token')));
// localStorage.clear();

/*{
  "data": {
    "name": "jon",
    "email": "jon11@mail.com"
     pass 123
  }
}
*/
