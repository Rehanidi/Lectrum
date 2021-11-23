import '../../../css/style.scss';
import {registration} from './registration';
import {logIn} from './login';

const registrationForm = document.getElementById('registration');
const loginForm = document.getElementById('login');
const registrationButtonRef = loginForm.querySelector('a[class="additional__links--link"]');
const loginButtonRef = registrationForm.querySelector('a[class="additional__links--link"]');

loginButtonRef.onclick = (event) => {
  registrationForm.style.display = 'none';
  loginForm.style.display = 'inherit';
};

registrationButtonRef.onclick = (event) => {
  loginForm.style.display = 'none';
  registrationForm.style.display = 'inherit';
};

// регистрация пользователя
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerTel = document.getElementById('registerTel');
const registerPassword = document.getElementById('registerPassword');
const registrationButton = registrationForm.querySelector('input[class="form__button form__submit"]');
const registerCheckBox = document.getElementById('registerTerms');
registrationButton.onclick = (event) => {
  event.preventDefault();
  const user = {};
  user.name = registerName.value;
  user.email = registerEmail.value;
  user.phone = registerTel.value;
  user.password = registerPassword.value;
  if (registerCheckBox.checked){
    (async () => {
      await registration(user);
    })();
  } else {
    alert('Регистрация не возможна пока не будут приняты положения банка.');
  }
};


// логин пользователя
const loginButton = loginForm.querySelector('input[class="form__button form__submit"]');
const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');
loginButton.onclick = (event) => {
  event.preventDefault();
  const user = {};
  user.email = loginEmail.value;
  user.password = loginPassword.value;
  (async () => {
    await logIn(user);
  })();
};




console.log(JSON.parse(localStorage.getItem('token')));
