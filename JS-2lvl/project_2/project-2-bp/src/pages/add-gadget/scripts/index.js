import '../../../css/style.css';
import '../../../css/add-gadget.css';
import {addGadget} from './addGadget';
import {checkAuth} from '../../gadget-page/scripts/checkAuth';

(async () => {
  await checkAuth();
})();

// сохранить новый гаджет
const saveButton = document.querySelector('input[class="btn-blue"]');
saveButton.onclick = (event) => {
  event.preventDefault();
  const gadget = {};
  const colors = [];
  const characteristics = {};
  const name = document.getElementById('naming').value;
  const price = document.getElementById('price').value;
  const memory = document.querySelector('input[name="memory"]').value;
  const color = document.querySelector('input[name="color"]').value;
  const processor = document.querySelector('input[name="processor"]').value;
  const graphics = document.querySelector('input[name="graphics"]').value;
  const brightness = document.querySelector('input[name="brightness"]').value;
  const contrast = document.querySelector('input[name="contrast"]').value;
  const matrix = document.querySelector('input[name="matrix"]').value;
  const cameras = document.querySelector('input[name="cameras"]').value;

  colors.push(color);
  gadget.name = name;
  gadget.category = 'phones';
  gadget.price = price;
  gadget.reviews = [];
  gadget.characteristics = characteristics;
  characteristics.memory = memory;
  characteristics.colors = colors;
  characteristics.processor = processor;
  characteristics.graphics = graphics;
  characteristics.brightness = brightness;
  characteristics.contrast = contrast;
  characteristics.matrix = matrix;
  characteristics.cameras = cameras;
  (async () => {
    await addGadget(gadget);
  })();
};

// закрыть форму
const closeButton = document.querySelector('input[class="btn-red"]');
closeButton.onclick = (event) => {
  event.preventDefault();
  window.location.href = 'index.html';
};
