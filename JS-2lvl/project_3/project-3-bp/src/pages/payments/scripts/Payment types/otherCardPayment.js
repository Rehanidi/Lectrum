export const otherCardPayment = () => {
  const otherCardForm = document.querySelector('div[class="w-220 form__info"]');
  const dropdown = otherCardForm.querySelector('div[class="dropdown dropdown--open"]');
  const dropdownToggle = otherCardForm.querySelector('div[class="dropdown__toggle active"]');
  const chooseContact = otherCardForm.querySelector('input[class="form__input"]');
  const showList = otherCardForm.querySelector('img[class="info__icon"]');
  const list = otherCardForm.querySelector('div[class="dropdown__list"]');
  dropdown.classList.toggle('dropdown--open');
  dropdownToggle.classList.toggle('active');
  showList.onclick = (event) => {
    dropdown.classList.toggle('dropdown--open');
    dropdownToggle.classList.toggle('active');
  };
  list.onclick = (event) => {
    chooseContact.value = event.target.closest('div').innerText;
    dropdown.classList.toggle('dropdown--open');
    dropdownToggle.classList.toggle('active');
  };
};
