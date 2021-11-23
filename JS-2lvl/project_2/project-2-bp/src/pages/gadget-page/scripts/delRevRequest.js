export const deleteReview = async (hash, revHash) => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  try {
    const response = await fetch(`https://lab.lectrum.io/js2/api/zavidovo/products/${hash}/reviews/${revHash}`, {
      method: 'DELETE',
      headers: {
        'x-token': token,
        'hash': hash,
        'reviewHash': revHash,
      },
    });
    if (!response.ok) {
      throw new Error('неуспешный запрос');
    }
  } catch (error) {
    console.log(error.message);
  }
};
