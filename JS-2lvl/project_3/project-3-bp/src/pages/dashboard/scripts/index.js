import '../../../css/style.scss';
import io from 'socket.io-client';
import {diagram} from './diagram';
import {dataDiagram} from './getDataDiagram';
import {showCardInfo} from './showCardInfo';
import {arrayParse, dataDiagramForCard, diagramForCard} from './diagramForCards';
import {getLogin} from './socketGetLogin';
import toastr from 'toastr';

const socket = io('https://lab.lectrum.io', {
  path: '/ws',
});
socket.on('connect', () => {
  console.log('connected');
});
socket.on('disconnect', () => {
  console.log('disconnect');
});

(async () => {
  const login = JSON.parse(await getLogin());
  socket.emit('login', `ironbank:${login.email}`);
  socket.on('login', (data) => {
    console.log(data);
  });
})();

socket.on('notification', (source) => {
  const data = JSON.parse(source);
  toastr.info(data);
});

const cardListParentReview = document.querySelector('div[data-status="all"]').querySelector('div[class="balance__block__main"]');
const cardListParentCardBalance = document.querySelector('div[data-status="card-balance"]').querySelector('div[class="balance__block__main"]');
(async () => {
  await showCardInfo(cardListParentReview);
  await showCardInfo(cardListParentCardBalance);
  const data = await dataDiagram();
  const download = document.querySelector('div[data-status="download"]');
  download.style.display = 'none';
  const all = document.querySelector('div[data-status="all"]');
  all.style.display = 'inline';
  const graph = document.querySelector('div[class="chart__wrap"]');
  graph.innerHTML = null;
  graph.insertAdjacentHTML('afterbegin', '<canvas id="myChart" width="400" height="60"></canvas>');
  diagram(data);
})();

// выбираем тип графика
const review = document.querySelector('div[data-status="all"]');
const reviewTab = review.querySelectorAll('li');
const cardBalance = document.querySelector('div[data-status="card-balance"]');
const cardBalanceTab = cardBalance.querySelectorAll('li');
reviewTab.forEach(button => button.addEventListener('click', function () {
  for (let i = 0; i < reviewTab.length;i++){
    reviewTab[i].classList.remove('active');
  }
  event.target.classList.toggle('active');
  if (event.target.textContent === 'По картам'){
    review.style.display = 'none';
    cardBalance.style.display = 'inline';const graph = document.querySelector('div[data-status="card-balance"]').querySelector('div[class="chart__wrap"]');
    graph.innerHTML = null;
    graph.insertAdjacentHTML('afterbegin', '<canvas id="myChartForCard" width="400" height="60"></canvas>');
    (async () => {
      const cardArray =  await dataDiagramForCard();
      const parseArray = [];
      for (let i = 0; i < cardArray.length; i++){
        let tmpData;
        tmpData = arrayParse(cardArray[i]);
        parseArray.push(tmpData[0]);
        parseArray.push(tmpData[1]);
      }
      diagramForCard(parseArray);
    })();
  }
}));
cardBalanceTab.forEach(button => button.addEventListener('click', function async () {
  for (let i = 0; i < cardBalanceTab.length;i++){
    cardBalanceTab[i].classList.remove('active');
  }
  event.target.classList.toggle('active');
  if (event.target.textContent === 'Обзор'){
    cardBalance.style.display = 'none';
    review.style.display = 'inline';
  }
}));

