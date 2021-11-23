export const communalPayment = () => {
  const communalPaymentForm = document.getElementById('utilityBills');
  const address = communalPaymentForm.querySelector('div[class="w-230 gap"]');
  const dropdownAddress = address.querySelector('div[class="dropdown"]');
  const dropdownToggleAddress = address.querySelector('div[class=" form__info dropdown__toggle "]');
  const service = communalPaymentForm.querySelector('div[class="w-230"]');
  const dropdownService = service.querySelector('div[class="dropdown "]');
  const dropdownToggleService = service.querySelector('div[class=" form__info "]');
  const showListAddress = address.querySelector('img[class="info__icon"]');
  const showListService = service.querySelector('img[class="info__icon"]');
  const chooseAddress = address.querySelector('input[class="form__input"]');
  const chooseService = service.querySelector('input[class="form__input"]');
  const listAddress = address.querySelector('div[class="dropdown__list"]');
  const listService = service.querySelector('div[class="dropdown__list"]');
  showListAddress.onclick = (event) => {
    dropdownAddress.classList.toggle('dropdown--open');
    dropdownToggleAddress.classList.toggle('active');
  };
  showListService.onclick = (event) => {
    dropdownService.classList.toggle('dropdown--open');
    dropdownToggleService.classList.toggle('active');
  };
  listAddress.onclick = (event) => {
    chooseAddress.value = event.target.closest('div').innerText;
    dropdownAddress.classList.toggle('dropdown--open');
    dropdownToggleAddress.classList.toggle('active');
  };
  listService.onclick = (event) => {
    chooseService.value = event.target.closest('div').innerText;
    dropdownService.classList.toggle('dropdown--open');
    dropdownToggleService.classList.toggle('active');
  };
};
