const productArray = [];
export const getProducts  = async () => {
  try {
    const token = JSON.parse(localStorage.getItem('token')).data || null;
    const responseUser = await fetch('https://lab.lectrum.io/js2/api/zavidovo/products', {
      method: 'GET',
      headers: {
        'x-token': token,
      },
    });
    const source = await responseUser.json();
    if (!responseUser.ok) {
      throw new Error('неуспешный запрос');
    }
    for (let i = 0; i < source.data.length; i++) {
      productArray.push(source.data[i]);
    }
    return JSON.stringify(productArray);
  } catch (error) {
    console.log(error.message);
  }
};

