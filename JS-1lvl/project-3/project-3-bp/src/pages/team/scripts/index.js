import '../../../css/style.scss';
import {getCredentuals, getTasks, profileInfo} from "../../../api";
profileInfo();
const userProfile = document.querySelector('div[class="user user__section flex"]');
const teams = {
    Маркетинг: 'marketing',
    Дизайн: 'design',
    Финансы: 'finance',
    Бекенд: 'development',
    Фронтенд: 'development'
};

userProfile.onclick = (event) => {
    window.location.href = 'profile-settings.html';
};

const membersList = document.querySelector('div[class="members members__list"]');
while (membersList.children.length > 1) {
    membersList.removeChild(membersList.lastChild);
}

const addToUserList = (obj) => {
    const tasks = getTasks().filter(item => item.owner === obj.email);
    const taskCounter = tasks.length || 0;
    const div = document.createElement('div');
    div.setAttribute('class', 'members__card flex');
    const img = document.createElement('img');
    img.setAttribute('src', 'img/userpic-big.jpg');
    img.setAttribute('class', 'members__icon');
    img.setAttribute('alt', '');
    div.appendChild(img);
    membersList.appendChild(div);
    const div_1 = document.createElement('div');
    div.appendChild(div_1);
    const p_1Div_1 = document.createElement('p');
    p_1Div_1.setAttribute('class', 'members__name');
    p_1Div_1.textContent = obj.login;
    const p_2Div_1 = document.createElement('p');
    p_2Div_1.setAttribute('class', 'members__role');
    p_2Div_1.textContent = obj.teamRole;
    div_1.appendChild(p_1Div_1);
    div_1.appendChild(p_2Div_1);
    const div_2 = document.createElement('div');
    div_2.setAttribute('class', 'members__tasks');
    div.appendChild(div_2);
    const p_1Div_2 = document.createElement('p');
    p_1Div_2.setAttribute('class', 'tasks__count');
    p_1Div_2.textContent = taskCounter;
    const p_2Div_2 = document.createElement('p');
    p_2Div_2.setAttribute('class', 'plain__text');
    p_2Div_2.textContent = 'Задач';
    div_2.appendChild(p_1Div_2);
    div_2.appendChild(p_2Div_2);
};

const membersCount = document.querySelector('p[class="members__count"]');
membersCount.textContent = 0;
let activeTeam;
const teamTitle = document.querySelector('div[class="prj__title__block flex"]').querySelector('h1');
teamTitle.textContent = 'Комманды';
const infoUserWindow = document.querySelector('div[class="profile member__profile"]');
infoUserWindow.style.display = 'none';
const showTeamsList = document.querySelectorAll('div[class="team__description flex"]');
showTeamsList.forEach(button => button.addEventListener("click", function () {
    infoUserWindow.style.display = 'none';
    const target = event.target;
    teamTitle.textContent = target.textContent;
    while (membersList.children.length > 1) {
        membersList.removeChild(membersList.lastChild);
    }
    activeTeam = getCredentuals().filter(item => item.teamRole === teamTitle.textContent);
    for (let i = 0; i < activeTeam.length; i++) {
        addToUserList(activeTeam[i]);
        const dataId = document.querySelectorAll('div[class="members__card flex"]')[i];
        dataId.setAttribute('data-id', `${i}`);
    }
    membersCount.textContent = document.querySelectorAll('div[class="members__card flex"]').length;
    selectUserInfo();
}));

const goToTaskBoard = document.querySelector('ul[class="projects__list"]').querySelectorAll('li');
goToTaskBoard.forEach(button => button.addEventListener("click", function () {
    window.location.href = 'task-board.html';
    return false;
}));

const parent = document.querySelector('div[class="max__container"]');
const selectUserInfo = () => {
    let memberInfo = document.querySelectorAll('div[class="members__card flex"]');
    memberInfo.forEach(button => button.addEventListener('click', function () {
        infoUserWindow.style.display = 'block';
        const target = event.currentTarget;
        const activeTaskUser = activeTeam[target.dataset.id];
        document.querySelector('p[class="profile__name"]').textContent = activeTaskUser.login;
        document.querySelector('p[class="profile__role"]').textContent = activeTaskUser.teamRole;
        const backlog = getTasks().filter(item => item.owner === activeTeam[target.dataset.id].email && item.id === '0').length;
        const toDo = getTasks().filter(item => item.owner === activeTeam[target.dataset.id].email && item.id === '1');
        const done = getTasks().filter(item => item.owner === activeTeam[target.dataset.id].email && item.id === '2').length;
        document.querySelectorAll('div[class="task__review__block flex"]')[1].querySelector('p[class="count"]').textContent = backlog;
        document.querySelector('span[class="count"]').textContent = toDo.length;
        document.querySelectorAll('div[class="task__review__block flex"]')[0].querySelector('p[class="count"]').textContent = done;
        while (parent.children.length > 0) {
            parent.removeChild(parent.lastChild);
        }
        for (let i = 0; i < toDo.length; i++) {
            createTasks(toDo[i]);
        }
    }));
};

const createTasks = (obj) => {
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'task task__block');
    parent.appendChild(a);
    const span = document.createElement('span');
    span.setAttribute('class', 'checkbox');
    a.appendChild(span);
    const img = document.createElement('img');
    img.setAttribute('src', 'img/check-icon.svg');
    img.setAttribute('alt', '');
    span.appendChild(img);
    const div = document.createElement('div');
    a.appendChild(div);
    const p = document.createElement('p');
    p.setAttribute('class', 'task__description');
    p.textContent = obj.description;
    div.appendChild(p);
    const div_1 = document.createElement('div');
    div_1.setAttribute('class', 'flex');
    div.appendChild(div_1);
    const pDiv_1 = document.createElement('p');
    pDiv_1.setAttribute('class', `task__label ${teams[obj.tag]}`);
    pDiv_1.textContent = `${teams[obj.tag]}`;
    div_1.appendChild(pDiv_1);
};

