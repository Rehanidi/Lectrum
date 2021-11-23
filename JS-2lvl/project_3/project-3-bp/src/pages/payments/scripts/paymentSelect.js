export const paymentSelect = () => {
  const paymentType = document.querySelectorAll('input[type="radio"]');
  paymentType.forEach(button => button.addEventListener('click', function () {
    const mobile = document.querySelector('div[id="mobile"]');
    const utilityBills = document.querySelector('div[id="utilityBills"]');
    const clientCard = document.querySelector('div[id="clientCard"]');
    const ownCard = document.querySelector('div[id="ownCard"]');
    if (event.target.id === 'mobile') {
      mobile.style.display = 'inline';
      utilityBills.style.display = 'none';
      clientCard.style.display = 'none';
      ownCard.style.display = 'none';
    }
    if (event.target.id === 'communal') {
      mobile.style.display = 'none';
      utilityBills.style.display = 'inline';
      clientCard.style.display = 'none';
      ownCard.style.display = 'none';
    }
    if (event.target.id === 'otherCard') {
      mobile.style.display = 'none';
      utilityBills.style.display = 'none';
      clientCard.style.display = 'inline';
      ownCard.style.display = 'none';
    }
    if (event.target.id === 'ownCard') {
      mobile.style.display = 'none';
      utilityBills.style.display = 'none';
      clientCard.style.display = 'none';
      ownCard.style.display = 'inline';
    }
  }));
};
