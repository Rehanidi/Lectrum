export const displayPeriod = () => {
  const months = {
    'Январь': 1,
    'Февраль': 2,
    'Март': 3,
    'Апрель': 4,
    'Май': 5,
    'Июнь': 6,
    'Июль': 7,
    'Август': 8,
    'Сентябрь': 9,
    'Октябрь': 10,
    'Ноябрь': 11,
    'Декабрь': 12,
  };
  const date = document.querySelector('p[class="date__info__value"]');
  const month = date.textContent.split(' ')[0];
  const year = date.textContent.split(' ')[1];
  return {
    month: months[month],
    year: year,
  };
};
