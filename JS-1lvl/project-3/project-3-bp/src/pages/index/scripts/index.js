import '../../../css/style.scss';
import { getCredentuals, setCredentuals, getActivUser, setActivUser } from '../../../api/index';

const registrationForm = document.querySelector('div[class="form form--registration"]');
const loginForm = document.querySelector('div[class="form form--login"]');
const setupForm = document.querySelector('div[class="form form--setup"]');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const login = document.getElementById('user');
const obj = {};
const enter = registrationForm.querySelector('div[class="additional__info"]');
const singIn = enter.querySelector('a[href="#"]');
const registrationButton = document.querySelector('input[type="submit"]');
registrationButton.onclick = (event) => {
    if (getCredentuals().length !== 0) {
        if (getCredentuals().find(item => item.email === email.value)) {
            alert('User already exist!');
            return false;
        }
    }
    if ((email.value).indexOf('@') === -1) {
        alert('Enter a valid email!');
        return false;
    }
    if (password.value.length < 8) {
        alert('Password to short!');
        return false;
    }

    let nameString = login.value.split(' ');
    if (nameString.length !== 2) {
        alert('введите имя и фамилию');
        return false;
    } else if (nameString[0].length < 3 || nameString[1].length < 3){
        alert('имя или фамилия содержит меньше 3 символов');
        return false;
    }

    registrationForm.style.display = 'none';
    setupForm.style.display = 'block';
    obj.email = email.value;
    obj.password = password.value;
    obj.login = login.value;
    setActivUser(obj.email);
    return false;
};

const forewordButton = setupForm.querySelector('input[type="submit"]');
forewordButton.onclick = (event) => {
    const team = document.querySelector('input[type="radio"]:checked');
        obj.team = team.id;
        setCredentuals(obj);
        window.location.href = 'task-board.html';
        return false;
    };

singIn.onclick = (event) => {
    registrationForm.style.display = 'none';
    loginForm.style.display = 'block';
};

const singInLogin = document.querySelector('div[class="form form--login"]').querySelector('input[type="submit"]');
singInLogin.onclick = (event) => {
    const loginMail = document.querySelector('div[class="form form--login"]').querySelector('input[id="email"]');
    const loginPassword = document.querySelector('div[class="form form--login"]').querySelector('input[id="pass"]');
    const personIndex = getCredentuals().findIndex(item => item.email === loginMail.value);

    if ((loginMail.value).indexOf('@') === -1) {
            alert('Enter a valid email!');
            return false;
        }
    if (personIndex === -1) {
        alert('User not exist!');
        return false;
    }
    if (getCredentuals()[personIndex].password !== loginPassword.value) {
        alert('Passwords do not match!');
        return false;
        }
    setActivUser(getCredentuals()[personIndex].email);
    window.location.href = 'task-board.html';
    return false;
};
