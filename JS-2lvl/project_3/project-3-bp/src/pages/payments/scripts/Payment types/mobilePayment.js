export const mobilePayment = () => {
  const mobilePaymentForm = document.getElementById('mobile');
  const dropdown = mobilePaymentForm.querySelector('div[class="dropdown dropdown--open"]');
  const dropdownToggle = mobilePaymentForm.querySelector('div[class="dropdown__toggle active"]');
  const chooseContact = mobilePaymentForm.querySelector('input[class="form__input"]');
  const showList = mobilePaymentForm.querySelector('img[class="info__icon"]');
  const list = mobilePaymentForm.querySelector('div[class="dropdown__list"]');
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
