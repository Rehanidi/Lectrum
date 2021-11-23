import '../../../css/style.scss';
import {getActivUser, getComments, getCredentuals, getTasks, setComments, profileInfo} from "../../../api";
const obj = {};
const teams = {
    Маркетинг: 'marketing',
    Дизайн: 'design',
    Финансы: 'finance',
    Бекенд: 'development',
    Фронтенд: 'development'
};

const monthsList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
const commentsBlock = document.querySelector('div[class="comment__history"]');
const taskMenu = document.querySelector('ul[class="tab__navigation"]');
taskMenu.onclick = (event) => {
    const activeTask = event.target;

    if (activeTask.textContent === 'Задачи'){
        window.location.href = 'task-board.html';
    }
    if (activeTask.textContent === 'Календарь'){
        window.location.href = 'calendar.html';
    }
};
// определение id проекта
const projectsList = document.querySelector('.projects__list');
const project = projectsList.querySelectorAll('a[href="#"]');
for (let i =0; i < project.length; i++){
    project[i].setAttribute('data-projectId', `${i}`);
}


const taskBlocks = document.querySelector('div[class="tasks__column"]');
taskBlocks.children[0].setAttribute('id', '0');
taskBlocks.children[1].setAttribute('id', '1');
const backlog = taskBlocks.children[0];
const toDo = taskBlocks.children[1];

while (backlog.children.length > 1) {
    backlog.removeChild(backlog.lastChild);
}
while (toDo.children.length > 1) {
    toDo.removeChild(toDo.lastChild);
}
const backlogParent = document.getElementById('0');
const toDoParent = document.getElementById('1');
const addTask = (parent, obj) => {
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'task task__block');
    a.setAttribute('data-taskid', `${obj.taskId}`);
    const span = document.createElement('span');
    span.setAttribute('class', 'checkbox');
    const div = document.createElement('div');
    const p = document.createElement('p');
    p.setAttribute('class', 'task__description');
    p.textContent = obj.title;
    const aDiv = document.createElement('div');
    aDiv.setAttribute('class', 'flex');
    const img = document.createElement('img');
    img.setAttribute('src', 'img/userpic.jpg');
    img.setAttribute('class', 'task__executor');
    img.setAttribute('alt', '');
    const pDiv = document.createElement('p');
    pDiv.setAttribute('class', `task__label ${teams[obj.tag]}`);
    pDiv.textContent = obj.tag;
    parent.appendChild(a);
    a.appendChild(span);
    a.appendChild(div);
    div.appendChild(p);
    div.appendChild(aDiv);
    aDiv.appendChild(img);
    aDiv.appendChild(pDiv);
};

const taskInfo = document.querySelector('div[class="task__desctiption task__desctiption__card"]');
taskInfo.style.display = 'none';
project.forEach(button => button.addEventListener("click", function() {
    while (backlog.children.length > 1) {
    backlog.removeChild(backlog.lastChild);
}
    while (toDo.children.length > 1) {
        toDo.removeChild(toDo.lastChild);
    }
    let text = event.target;

let backlogTasks = getTasks().filter(item => Number(item.id) === 0 && item.projectId === text.dataset.projectid);
for (let i = 0; i < backlogTasks.length; i++) {
    addTask(backlogParent, backlogTasks[i]);
}

const toDoTasks = getTasks().filter(item => Number(item.id) === 1 && item.projectId === text.dataset.projectid);
for (let i = 0; i < toDoTasks.length; i++) {
    addTask(toDoParent, toDoTasks[i]);
}

let showTask = document.querySelectorAll('a[class="task task__block"]');
showTask.forEach(button => button.addEventListener("click", function() {
    taskInfo.style.display = 'block';
    while (commentsBlock.children.length > 0) {
        commentsBlock.removeChild(commentsBlock.lastChild);
    }
    let id = event.currentTarget;
    taskInfo.setAttribute('data-idTask', `${Number(id.dataset.taskid)}`);
    const taskDescription = taskInfo.querySelector('h2[class="item__title"]');
    const activeTask = getTasks().filter(item => Number(item.taskId) === Number(id.dataset.taskid));
    taskDescription.textContent = activeTask[0].title;
    const authorList = taskInfo.querySelector('p[class="author__list"]');
    const authorName =  getCredentuals().filter(item => item.email === activeTask[0].owner);
    authorList.textContent = `Added by ${authorName[0].login} at ${activeTask[0].timeCreate}`;
    const executor = taskInfo.querySelector('p[class="executor__name"]');
    const executorName =  getCredentuals().filter(item => item.email === activeTask[0].executor);
    executor.textContent = `${executorName[0].login}`;
    const deadline = taskInfo.querySelector('p[class="dueon__date legend"]');
    let newDate = new Date();
    newDate.setTime(Date.parse(activeTask[0].deadline));
    deadline.textContent = `${daysList[newDate.getDay()] + ', ' + monthsList[newDate.getMonth()] + ' ' + newDate.getDate()}`;
    const tagParent = taskInfo.querySelector('div[class="tag__block"]');
    while (tagParent.children.length > 1) {
        tagParent.removeChild(tagParent.lastChild);
    }
    let tag = document.createElement('p');
    tag.setAttribute('class', `task__label ${teams[activeTask[0].tag]}`);
    tagParent.appendChild(tag);
    tag.textContent = activeTask[0].tag;
    const taskText = taskInfo.querySelector('div[class="task__desctiption__textarea"]').querySelector('p');
    taskText.textContent = activeTask[0].description;
    let taskComments = getComments().filter(item => Number(item.taskId) === Number(taskInfo.dataset.idtask));
    for (let i = 0; i < taskComments.length; i++) {
        addComment(taskComments[i]);
    }
}));

const commentButton = document.querySelector('input[class="comment__submit"]');
commentButton.onclick = (event) => {
    const commentInput = taskInfo.querySelector('input[class="comment__input"]');
    let activeTask = getTasks().filter(item => Number(item.taskId) === Number(taskInfo.dataset.idtask));
    obj.comment = commentInput.value;
    obj.owner = getActivUser();
    let ownerTag = getCredentuals().filter(item => item.email === getActivUser());
    obj.ownerTag = ownerTag[0].team;
    const date = new Date();
    obj.dateCreate = daysList[date.getDay()] + ', ' + date.getHours() + ':' + date.getMinutes();
    obj.taskId = activeTask[0].taskId;
    addComment(obj);
    setComments(obj);
};
}));

const addComment = (obj) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'commet comment__block');
    commentsBlock.appendChild(div);
    const div_1 = document.createElement('div');
    const div_2 = document.createElement('div');
    div_1.setAttribute('class', 'commet__icon');
    div_2.setAttribute('class', 'commet__text__wrapp');
    div.appendChild(div_1);
    div.appendChild(div_2);
    const img = document.createElement('img');
    img.setAttribute('src', 'img/userpic-big.jpg');
    img.setAttribute('alt', '');
    div_1.appendChild(img);
    const p = document.createElement('p');
    p.setAttribute('class', 'commet__name');
    let commentAuthor = getCredentuals().filter(item => item.email === obj.owner);
    p.textContent = commentAuthor[0].login + ', ';
    const p_1 = document.createElement('p');
    p_1.setAttribute('class', 'commet__text');
    p_1.textContent = obj.comment;
    const p_2 = document.createElement('p');
    p_2.setAttribute('class', 'commet__date');
    p_2.textContent = obj.dateCreate;
    div_2.appendChild(p);
    div_2.appendChild(p_1);
    div_2.appendChild(p_2);
    const span = document.createElement('span');
    span.setAttribute('class', 'commet__role');
    span.textContent = obj.ownerTag;
    p.appendChild(span);
    const a = document.createElement('a');
    a.setAttribute('href', '#');
    a.setAttribute('class', 'person__tag');
    p_1.appendChild(a);
};

const userProfile = document.querySelector('div[class="user user__section flex"]');
userProfile.onclick = (event) => {
    window.location.href = 'profile-settings.html';
};

const teamsPage = document.querySelectorAll('div[class="team__description flex"]');
teamsPage.forEach(button => button.addEventListener("click", function () {
        window.location.href = 'team.html';
    }));

profileInfo();
