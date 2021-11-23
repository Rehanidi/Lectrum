export const getProductByHash  = async (hash) => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  try {
    const responseUser = await fetch(`https://lab.lectrum.io/js2/api/zavidovo/products/${hash}`, {
      method: 'GET',
      headers: {
        'x-token': token,
        'hash': hash,
      },
    });
    const source = await responseUser.json();
    if (!responseUser.ok) {
      throw new Error('неуспешный запрос');
    }
    return JSON.stringify(source.data);
  } catch (error) {
    console.log(error.message);
  }
};
