import { saveToStorage } from './login';

console.log('wizard');

let studList = JSON.parse(localStorage.getItem('student')) || [];
let obj = {
    type: 'student'
};

const form1 = document.getElementById('regBtn'); // из регистр в кто ты
form1.onclick = (event) => {
    document.getElementById('loginBlock').style.display = "none";
    document.getElementById('step1Block').style.display = "flex";
};

const form2 = document.getElementById('toStep2Btn');   // из выбора кто ты в поля регистрации
form2.onclick = (event) => {
    document.getElementById('step1Block').style.display = "none";
    document.getElementById('regBlock').style.display = "flex";
};

const form3 = document.getElementById('toLoginSvg');  // со 2 формы в 1
form3.onclick = (event) => {
    document.getElementById('step1Block').style.display = "none";
    document.getElementById('loginBlock').style.display = "flex";
};

const form4 = document.getElementById('from3to2Svg');
form4.onclick = (event) => {
    document.getElementById('regBlock').style.display = "none";
    document.getElementById('step1Block').style.display = "flex";
};

const but1to2 = document.getElementById('from1to2');
but1to2.onclick = (event) => {
    document.getElementById('step1Block').style.display = "none";
    document.getElementById('regBlock').style.display = "flex";
};

const but2to1 = document.getElementById('from2to1');
but2to1.onclick = (event) => {
    document.getElementById('regBlock').style.display = "none";
    document.getElementById('step1Block').style.display = "flex";
};

const fillData = document.getElementById('createAccount');
fillData.onclick = (event) => {
    const personType = document.querySelector('input[name="user-type"]:checked');
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordNext = document.getElementById('password_next');

    obj.name = name.value;
    obj.email = email.value;
    obj.password = password.value;
    obj.password_next = passwordNext.value;

    let nameString = name.value.split(' ');

    if (nameString.length !== 2) {
        console.error('введите имя и фамилию');
        name.classList.add('error');
        return;
    } else if (nameString[0].length < 3 || nameString[1].length < 3){
        console.error('имя или фамилия содержит меньше 3 символов');
        name.classList.add('error');
        return;
    }

    if (password.value !== passwordNext.value || password.value === '') {
        console.error('пароли не совпадают или не введены');
        password.classList.add('error');
        passwordNext.classList.add('error');
        return;
    }
        if (personType.id === 'user_student'){
            obj.type = 'student';
        } else if (personType.id === 'user_teacher'){
            obj.type = 'teacher';
        } else {
           console.log('unknown type');
           return;
        }

    if (obj.type === 'student'){
        studList.push(obj);
        localStorage.setItem('student', JSON.stringify(studList));
    } else {
        localStorage.setItem('teacher', JSON.stringify(obj));
    }

    name.value = '';
    email.value = '';
    password.value = '';
    passwordNext.value = '';

    saveToStorage(obj);

    if (obj.type === 'student'){
        window.location.href = "student.html";
    } else {
        window.location.href = "teacher.html";
    }
};
// localStorage.removeItem('student');
// localStorage.removeItem('lessons');
