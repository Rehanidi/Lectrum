import {url} from '../../index/scripts/login';

export const createCard  = async (user) => {
  const token = JSON.parse(localStorage.getItem('token')).data || null;
  const responseUser = await fetch(`${url}/ironbank/cards`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-token': token,
    },
    body: JSON.stringify(user),
  });
  try {
    if (!responseUser.ok) {
      throw new Error('неуспешный запрос');
    }
    window.location.href='cards.html';
  } catch (error) {
    console.log(error.message);
  }
};
