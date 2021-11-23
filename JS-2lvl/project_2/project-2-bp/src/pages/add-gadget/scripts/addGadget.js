export const addGadget  = async (gadget) => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  try {
    const responseUser = await fetch('https://lab.lectrum.io/js2/api/zavidovo/products', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-token': token,
      },
      body: JSON.stringify(gadget),
    });
    if (!responseUser.ok) {
      throw new Error('неуспешный запрос');
    }
    setTimeout(function(){
      window.location.href = 'index.html';
    }, 5000);
  } catch (error) {
    console.log(error.message);
  }
};
