import '../styles/index.scss';
import './milestone_1';
import './milestone_2';
import './milestone_3';

import { tarifs } from './constants';

let balance = 100;
localStorage.setItem('balance', JSON.stringify(balance));
console.log(tarifs);
