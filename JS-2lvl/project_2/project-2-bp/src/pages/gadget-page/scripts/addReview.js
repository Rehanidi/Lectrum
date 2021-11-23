export const addReview  = async (hash) => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  const reviewName = document.querySelector('input[name="name"]');
  const reviewPros = document.querySelector('textarea[name="pros"]');
  const reviewCons = document.querySelector('textarea[name="cons"]');
  const review = {
    'name': reviewName.value,
    'pros': reviewPros.value,
    'cons': reviewCons.value,
  };
  try {
    const responseUser = await fetch(`https://lab.lectrum.io/js2/api/zavidovo/products/${hash}/reviews`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-token': token,
        'hash': hash,
      },
      body: JSON.stringify(review),
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
