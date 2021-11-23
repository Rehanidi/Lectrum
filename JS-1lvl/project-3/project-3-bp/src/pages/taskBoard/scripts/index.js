import '../../../css/style.scss';
import {getActivUser, getCredentuals, getTasks, setTasks, getTaskId, profileInfo, teamPage} from "../../../api";

profileInfo();
teamPage();
const taskStyle = document.querySelector('div[class="form form--task"]');
const desk = document.querySelectorAll('div[class="column task__column"]');
const title = document.getElementById('taskTitle');
document.getElementById('deadline').type = 'date';
const task = {};
const teams = {
    Маркетинг: 'marketing',
    Дизайн: 'design',
    Финансы: 'finance',
    Бекенд: 'development',
    Фронтенд: 'development'
};
task.owner = getActivUser();

const clearDesk = document.querySelector('main[class="flex kanban__block"]');
clearDesk.style.display = 'none';

// очистка формы юзеров в выпадающем списке
const userList = document.querySelector('div[class="dropdown__list"]');
    while (userList.children.length > 0) {
        userList.removeChild(userList.lastChild);
    }
// создание юзеров для выпадающего списка с последующим их добавлением
const createUsers = (userEmail) => {
    let name = getCredentuals().find(item => item.email === userEmail);
    const div = document.createElement('div');
    div.setAttribute('class', 'dropdown__list__item');
    const p = document.createElement('p');
    p.setAttribute('class', 'form__input');
    p.textContent = name.login;
    div.appendChild(p);
    userList.appendChild(div);
};

for (let i = 0; i < getCredentuals().length; i++) {
    if (getActivUser() !== getCredentuals()[i].email) {
        createUsers(getCredentuals()[i].email);
    }
}

desk.forEach(button => button.addEventListener("click", function() {
    task.id = event.currentTarget.id;
}));

const projectsList = document.querySelector('.projects__list');
const project = projectsList.querySelectorAll('a[href="#"]');
for (let i =0; i < project.length; i++){
    project[i].setAttribute('data-projectId', `${i}`);
}
project.forEach(button => button.addEventListener("click", function() {
    clearDesk.style.display = 'flex';
    for (let i=0; i < desk.length; i++){
    desk[i].setAttribute('id', `${i}`);
    while (desk[i].children.length > 1) {
        desk[i].removeChild(desk[i].lastChild);
    }
}
    let text = event.target;
    task.projectId = project[text.dataset.projectid].dataset.projectid;
    for (let i = 0; i < desk.length; i++){
        let addTask = [];
        addTask = getTasks().filter(item => Number(item.id) === i && Number(item.projectId) === Number(text.dataset.projectid));
        for (let i = 0; i < addTask.length; i++){
            newTask(addTask[i]);
        }
    }
}));

const deskButton = document.querySelectorAll('a[class="item__btn"]');
deskButton.forEach(button => button.addEventListener("click", function() {
    taskStyle.style.display = 'block';
}));

// создание и добавление новой задачи на доску
const addNewTask = taskStyle.querySelector('input[type="submit"]');
addNewTask.onclick = (event) => {
    taskStyle.style.display = 'none';
    for (let i = 0; i < desk.length; i++) {
        desk[i].style.display = 'block';
    }
    task.title = title.value;
    let deadline = document.getElementById('deadline').value;
    task.deadline = deadline;
    let description = document.getElementById('taskDescription');
    task.description = description.value;
    let data = new Date();
    let dateCreate = data.getDay() + ':' + data.getMonth();
    let hours = data.getHours();
    let minutes = data.getMinutes();
    if (data.getMinutes() < 10) {
        minutes = `0${data.getMinutes()}`;
    }
    if (data.getHours() < 10) {
        hours = `0${data.getHours()}`;
    }
    let timeCreate = hours + ':' + minutes;
    task.dateCreate = dateCreate;
    task.timeCreate = timeCreate;
    task.taskId = getTaskId();
    newTask(task);
    setTasks(task);
    return false;
};

const newTask = (obj) => {
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'task task__block');
    desk[obj.id].appendChild(a);
    const p = document.createElement('p');
    p.setAttribute('class', 'task__description');
    p.textContent = `${obj.title}`;
    a.appendChild(p);
    const div = document.createElement('div');
    div.setAttribute('class', 'flex');
    a.appendChild(div);
    const img = document.createElement('img');
    img.setAttribute('src', 'img/userpic.jpg');
    img.setAttribute('class', 'task__executor');
    img.setAttribute('alt', '');
    div.appendChild(img);
    const p1 = document.createElement('p');
    p1.textContent = obj.tag;
    p1.setAttribute('class', `task__label ${teams[obj.tag]}`);
    div.appendChild(p1);
    return false;
};


const taskMenu = document.querySelector('ul[class="tab__navigation"]');
taskMenu.onclick = (event) => {
    const activeTask = event.target;

    if (activeTask.textContent === 'Канбан'){
        window.location.href = 'task-description.html';
    }
    if (activeTask.textContent === 'Календарь'){
        window.location.href = 'calendar.html';
    }
};

// раскрываем список доступных исполнителей
const executeUser = document.getElementById('executor');
const dropList = document.querySelector('div[class="dropdown  w-260 gap--bottom"]');
const selectUser = dropList.querySelectorAll('p[class="form__input"]');
executeUser.onclick = (event) => {
    dropList.classList.toggle('dropdown--open');
};
// скрываем выпадающий список при выборе юзера
 for (let i = 0; i < selectUser.length; i++) {
    selectUser[i].onclick = (event) => {
        executeUser.setAttribute('placeholder', `${selectUser[i].textContent}`);
        dropList.setAttribute('class', 'dropdown w-260 gap--bottom');
        task.executor = getCredentuals()[i].email;
    };
}
// раскрываем список доступных тэгов
const teamTag = document.querySelector('div[class="w-200"]').querySelector('div[class="dropdown__toggle"]');
const tagList = document.querySelector('div[class="dropdown tag__dropdown"]');
teamTag.onclick = (event) => {
    tagList.classList.toggle('dropdown--open');
};

// скрываем выпадающий список тэгов
const typeOfTags = tagList.querySelectorAll('div[class="dropdown__list__item"]');
 for (let i = 0; i < typeOfTags.length; i++) {
    typeOfTags[i].onclick = (event) => {
        const tag = tagList.querySelector('p[class="label"]');
        tag.textContent = typeOfTags[i].querySelector('p[class="form__input"]').textContent;
        tagList.setAttribute('class', 'dropdown tag__dropdown');
        task.tag = tag.textContent;
    };
}
const userProfile = document.querySelector('div[class="user user__section flex"]');
userProfile.onclick = (event) => {
    window.location.href = 'profile-settings.html';
};
