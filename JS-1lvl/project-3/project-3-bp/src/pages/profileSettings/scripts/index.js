import '../../../css/style.scss';
import {getActivUser, getCredentuals, updateCredentuals, profileInfo, teamPage} from "../../../api";
const teamsList = ['Дизайнеры', 'Бекенд', 'Фронтенд'];
profileInfo();
const activeUser = getCredentuals().find(item => item.email === getActivUser());
const userProfile = document.querySelector('div[class="user user__section flex"]');
let obj = {};
userProfile.onclick = (event) => {
    window.location.href = 'profile-settings.html';
};

let user = document.getElementById('user');
user.value = activeUser.login;
obj.login = user.value;
user.onchange = (event) => {
    let nameString = user.value.split(' ');
    if (nameString.length !== 2) {
        alert('введите имя и фамилию');
        return false;
    } else if (nameString[0].length < 3 || nameString[1].length < 3){
        alert('имя или фамилия содержит меньше 3 символов');
        return false;
    }
    obj.login = user.value;
};

let role = document.getElementById('role');
role.value = activeUser.role || 'No team role';
obj.role = role.value;
role.onchange = (event) => {
    if (role.value.length > 20){
        alert('Max 20 symbols');
        return false;
    } else {
        obj.role = role.value;
    }
};

let teams = document.querySelector('div[class="team__wrapp gap--bottom"]');
const pasteBefore = document.getElementById('team');
while (teams.children.length > 1) {
    teams.removeChild(teams.firstChild);
}
const createTeam = (text) => {
    const div = document.createElement('div');
    div.setAttribute('class', 'team__name');
    div.textContent = text;
    const img = document.createElement('img');
    img.setAttribute('src', 'img/icon/close.svg');
    img.setAttribute('class', 'close__icon');
    img.setAttribute('alt', '');
    div.appendChild(img);
    teams.insertBefore(div, pasteBefore);
};

for (let i = 0; i < teamsList.length; i++) {
    createTeam(teamsList[i]);
}

const deleteTeam = teams.getElementsByClassName('close__icon');
const teamSelect = () => {
    deleteTeam.forEach(button => button.addEventListener("click", function () {
        const parent = event.target;
        teams.removeChild(parent.parentNode);
    }));
};
teamSelect();

const aboutYourself = document.querySelector('textarea[id="about"]');
aboutYourself.textContent = activeUser.aboutYourself || 'No description';
aboutYourself.onchange = (event) =>{
    if (aboutYourself.value.length > 500){
        alert('Max 500 symbols');
        return false;
    } else {
        obj.aboutYourself = aboutYourself.value;
    }
};

const cancelButton = document.querySelector('input[class="cancel__btn"]');
cancelButton.onclick = (event) => {
    user.value = activeUser.login;
    aboutYourself.value = activeUser.aboutYourself || 'No description';
    role.value = activeUser.role || 'No role.';
    if (activeUser.teamRole === undefined){
        alert('No team!');
        while (teams.children.length > 1) {
            teams.removeChild(teams.firstChild);
        }
        for (let i = 0; i < teamsList.length; i++) {
            createTeam(teamsList[i]);
        }
        teamSelect();
    return false;
    }
    return false;
};

const updateButton = document.querySelector('input[value="Обновить профиль"]');

updateButton.onclick = (event) => {
    let teamName = teams.querySelector('div[class="team__name"]');
    obj.teamRole = teamName.textContent;
    if (teams.childElementCount !== 2){
        alert('Select only one team!');
        while (teams.children.length > 1) {
            teams.removeChild(teams.firstChild);
        }
        for (let i = 0; i < teamsList.length; i++) {
            createTeam(teamsList[i]);
        }
        teamSelect();
        return false;
    }
    updateCredentuals(obj);
    console.log(getCredentuals());
    return false;
};

teamPage();
