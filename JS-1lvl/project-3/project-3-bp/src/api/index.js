// логика работы с локальным хранилищем

export const getCredentuals = () => {
    const credentuals = JSON.parse(localStorage.getItem('credentuals')) || [];
    return credentuals;
};

export const setCredentuals = (obj) => {
    const array = getCredentuals();
    array.push(obj);
    localStorage.setItem('credentuals', JSON.stringify(array));
};

export const updateCredentuals = (obj) => {
    const array = getCredentuals();
    let activeUserCount = 0;
    for (let i = 0; i < array.length; i++){
        if (array[i].email === getActivUser()){
            activeUserCount = i;
        }
    }
    array[activeUserCount].login = obj.login;
    array[activeUserCount].role = obj.role;
    array[activeUserCount].teamRole = obj.teamRole;
    array[activeUserCount].aboutYourself = obj.aboutYourself;
    localStorage.setItem('credentuals', JSON.stringify(array));
};

export const getTasks = () => {
    const task = JSON.parse(localStorage.getItem('tasks')) || [];
    return task;
};

export const setTasks = (obj) => {
    const array = getTasks();
    array.push(obj);
    localStorage.setItem('tasks', JSON.stringify(array));
};

export const getActivUser = () => {
    const activUser = JSON.parse(localStorage.getItem('activUser'));
    return activUser;
};

export const setActivUser = (obj) => {
    localStorage.removeItem('activUser');
    localStorage.setItem('activUser', JSON.stringify(obj));
};

export const getTaskId = () => {
    const taskId = JSON.parse(localStorage.getItem('taskId')) || 1;
    setTaskId(taskId);
    return taskId;
};

const setTaskId = (id) => {
    id++;
    localStorage.setItem('taskId', JSON.stringify(id));
};

export const getComments = () => {
    const comment = JSON.parse(localStorage.getItem('comments')) || [];
    return comment;
};

export const setComments = (obj) => {
    const array = getComments();
    array.push(obj);
    localStorage.setItem('comments', JSON.stringify(array));
};

export const profileInfo = () => {
    const profileName = document.querySelector('p[class="user__name"]');
    const profileRole = document.querySelector('p[class="user__role"]');
    const name = getCredentuals().find(item => item.email === getActivUser());
    profileName.textContent = name.login;
    profileRole.textContent = name.teamRole || 'No team role';
};

export const teamPage = () => {
const teamsPage = document.querySelectorAll('div[class="team__description flex"]');
teamsPage.forEach(button => button.addEventListener("click", function () {
    const teamTitle = document.querySelector('div[class="prj__title__block flex"]').querySelector('h1');
    const target = event.target;
    teamTitle.textContent = target.textContent;
    window.location.href = 'team.html';
}));
};
