console.log('lessons form');
const constants = require('./constants');

let obj = {};
let lessonList = JSON.parse(localStorage.getItem('lessons')) || [];
let stud = JSON.parse(localStorage.getItem('student'));
let les = JSON.parse(localStorage.getItem('lessons'));
let log = JSON.parse(localStorage.getItem('login'));
const butt = document.getElementById('formLessons').querySelector('button[type="submit"]');


butt.onclick = (event) => {
    obj.name = log.name;

    const typeRadioBtnTime = document.querySelector('input[name="time"]:checked');
    const typeRadioBtnType = document.querySelector('input[name="type"]:checked');

    obj.time = constants.timeSlots[typeRadioBtnTime.id];
    if (typeRadioBtnTime.id === 'time_01' || typeRadioBtnTime.id === 'time_02' || typeRadioBtnTime.id === 'time_03'){
        obj.tomorrow = false;
    } else {
        obj.tomorrow = true;
    }
    obj.title = constants.lessons[typeRadioBtnType.id].title;
    obj.duration = constants.lessons[typeRadioBtnType.id].duration;

    lessonList.push(obj);
    localStorage.setItem('lessons', JSON.stringify(lessonList));

    return false;
};
console.log(stud);
console.log(les);
console.log(log);
