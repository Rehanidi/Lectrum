console.log('planed lessons');

const log = JSON.parse(localStorage.getItem('lessons'));
const child = document.getElementsByClassName('card-box')[0];
const parent = document.querySelector('div[class="block__scheduled-lessons"]');
let day;
// удаляем наследников
while (parent.children.length > 1) {
    parent.removeChild(parent.lastChild);
}
// динамически добавляем наследников согласвно списка
for (let i = 0; i < log.length; i++){
    let div = document.createElement('div');
    div = child.cloneNode(true);
    let title = div.querySelector('p[class="sub-title"]');
    let namePerson = div.querySelector('p[class="info-title"]');
    let nameLesson = div.querySelector('p[class="info-desc"]');

    if (log[i].tomorrow === false){
        day = 'Сегодня';
    } else {
        day = 'Завтра';
    }
    // расчет времени урока
    let time = new Date();
    time.setMinutes(log[i].duration);
    let minutes = time.getMinutes();
    // время начала урока
    time.setHours(log[i].time);
    let beginTime = time.getHours(log[i].time) + '.' + '00' + '-'  ;
    // время окончания урока
    let durationLesson = log[i].duration;
    let endTime = time.getHours(log[i].time);
    if (minutes > 0){
        let endMinutes = endTime + (durationLesson - minutes) / 60 ;
        endTime = endMinutes + '.' + minutes;
    } else {
        endTime = endTime + durationLesson / 60 + '.' + '00';
    }
    // обновление параметров и добавление ученика
    title.textContent = day + ' ' + beginTime + endTime;
    namePerson.textContent = log[i].name;
    nameLesson.textContent = log[i].title;
    parent.appendChild(div);
}

// console.log(log);
